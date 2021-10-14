import { Handler } from '@netlify/functions'

import path from 'path'
import chromium from 'chrome-aws-lambda'
import { demoParamValues, FacebookOpenGraph, ParamValue, ParamValues } from '@resoc/core'
import { loadLocalTemplate, renderLocalTemplate, convertUrlToImage } from '@resoc/create-img-core'
import { ScreenshotOptions } from 'puppeteer-core'
import Route from 'route-parser'

import { parseRawQuery, queryParamsToParamValues, parseImageFormat, parseDimensions, parseRequestType } from '../src/utils'

export const handler: Handler = async (event, context) => {
  try {
    const route = new Route('/templates/:template/:requestType/:dimensions.:format');
    const routeParams = route.match(event.path);
    if (!routeParams) {
      throw "Internal error: no route parameters";
    }

    const templateName = routeParams['template'];
    const templateDir = `resoc-templates/${templateName}`;
    const template = await loadLocalTemplate(`${templateDir}/resoc.manifest.json`);
    const imageDimensions = parseDimensions(routeParams['dimensions']);

    const requestType = parseRequestType(routeParams['requestType']);
    let paramValues: ParamValues;
    if (requestType === 'image') {
      const rawParams = event.body ? JSON.parse(event.body) : parseRawQuery(event.rawQuery);
      paramValues = queryParamsToParamValues(template.parameters, rawParams);
    } else {
      paramValues = demoParamValues(template.parameters);
    }

    const htmlPath = await renderLocalTemplate(
      template,
      paramValues,
      imageDimensions,
      templateDir
    );

    const format = parseImageFormat(routeParams['format']);
    const imageFormat: ScreenshotOptions = {
      type: format
    };
    if (format === 'jpeg') {
      imageFormat.quality = 80;
    }

    const browser = await chromium.puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      headless: chromium.headless
    });

    const image = await convertUrlToImage(
      `file:///${htmlPath}`, {
        ...imageFormat,
        encoding: "base64",
        fullPage: true
      },
      browser
    );

    if (!image) {
      throw 'Image is null or void';
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpg'
      },
      body: image.toString(),
      isBase64Encoded: true
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An internal error occured' }),
    };
  }
};

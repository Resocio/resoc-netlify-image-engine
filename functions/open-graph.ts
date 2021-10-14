import { Handler } from '@netlify/functions'

import path from 'path'
import chromium from 'chrome-aws-lambda'
import { FacebookOpenGraph } from '@resoc/core'
import { loadLocalTemplate, renderLocalTemplate, convertUrlToImage } from '@resoc/create-img-core'
import { ScreenshotOptions } from 'puppeteer-core'
import Route from 'route-parser'

import { parseRawQuery, queryParamsToParamValues, routeParamsToImageFormat } from '../src/utils'

export const handler: Handler = async (event, context) => {
  try {
    const route = new Route('/templates/:template/images/open-graph.:format');
    const routeParams = route.match(event.path);
    if (!routeParams) {
      throw "Internal error: no route parameters";
    }

    const templateName = routeParams['template'];

    const templateDir = `resoc-templates/${templateName}`;
    const template = await loadLocalTemplate(`${templateDir}/resoc.manifest.json`);
    const paramValues = queryParamsToParamValues(template.parameters, parseRawQuery(event.rawQuery));

    const htmlPath = await renderLocalTemplate(
      template,
      paramValues,
      FacebookOpenGraph,
      templateDir
    );

    const format = routeParamsToImageFormat(routeParams['format']);
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

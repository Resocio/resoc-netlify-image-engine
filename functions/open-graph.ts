import { Handler, builder } from '@netlify/functions'

import path from 'path'
import chromium from 'chrome-aws-lambda'
import { FacebookOpenGraph } from '@resoc/core'
import { loadLocalTemplate, renderLocalTemplate, convertUrlToImage } from '@resoc/create-img-core'
import { ScreenshotOptions } from 'puppeteer-core'

const handler: Handler = async (event, context) => {
  try {
    const browser = await chromium.puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      headless: chromium.headless
    });

    const templateDir = 'resoc-templates/title-description';
    const template = await loadLocalTemplate(`${templateDir}/resoc.manifest.json`);
    const htmlPath = await renderLocalTemplate(
      template, { title: 'Hello', description: 'From Netlify' },
      FacebookOpenGraph,
      templateDir
    );

    const format = 'jpeg';
    const imageFormat: ScreenshotOptions = {
      type: format
    };
    if (format === 'jpeg') {
      imageFormat.quality = 80;
    }

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

exports.handler = builder(handler);

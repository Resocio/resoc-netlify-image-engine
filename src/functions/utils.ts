import { FacebookOpenGraph, ImageResolution, ImageTemplate, ParamValue, ParamValues, TemplateParam, TwitterCard } from '@resoc/core'

interface EventQueryStringParameters {
  [name: string]: string | undefined
}

type ParsedQuery = { [name: string]: string };

export const parseRawQuery = (rawQuery: string): ParsedQuery => {
  const parsed: ParsedQuery = {};
  rawQuery.split('&').forEach(p => {
    const [ name, value ] = p.split('=');
    if (name && value) {
      parsed[name] = decodeURIComponent(value);
    }
  });
  return parsed;
};

export const queryParamsToParamValues = (
  templateParams: TemplateParam[], queryParams: ParsedQuery
): ParamValues => {
  const values: ParamValues = {};

  templateParams.forEach(p => {
    const v = queryParams ? queryParams[p.name] : null;
    if (v) {
      values[p.name] = v;
    }
  });

  return values;
}

export type ImageFormat = 'png' | 'jpeg';

export const parseImageFormat = (formatParam: string | undefined | null): ImageFormat => {
  switch(formatParam) {
    case('jpg'):
    case('jpeg'):
      return 'jpeg';
    case('png'):
      return formatParam;
    case(null):
    case(undefined):
      return 'jpeg';
    default:
      throw `Unsupported output image format '${formatParam}'`;
  }
}

export const parseDimensions = (dimsParam: string | undefined | null): ImageResolution => {
  switch(dimsParam) {
    case('open-graph'):
      return FacebookOpenGraph;
    case('twitter-card'):
      return TwitterCard;
    case(null):
    case(undefined):
      throw "No dimensions";
  }

  const matcher = dimsParam.match(/(\d+)x(\d+)/);
  if (!matcher) {
    throw `Invalid image dimensions: ${dimsParam}`;
  }

  return {
    width: parseInt(matcher[1]),
    height: parseInt(matcher[2])
  }
}

export type RequestType = 'image' | 'demo';

export const parseRequestType = (requestTypeParam: string | undefined | null): RequestType => {
  switch(requestTypeParam) {
    case('images'):
      return 'image';
    case('demos'):
      return 'demo';
    default:
      throw `Invalid request type: ${requestTypeParam}`;
  }
}

export type ImageRequest = {
  template: string;
  format: ImageFormat;
  resolution: ImageResolution;
  type: 'image' | 'demo';
};

export const parseImageRequest = (request: string): ImageRequest | null => {
  const match = request.match(/\/templates\/([\w-]+)\/(\w+)\/([\w-]+)\.(\w+)/);
  if (!match) {
    return null;
  }

  return {
    template: match[1],
    type: parseRequestType(match[2]),
    resolution: parseDimensions(match[3]),
    format: parseImageFormat(match[4])
  }
};

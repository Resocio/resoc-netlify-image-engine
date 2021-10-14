import { FacebookOpenGraph, ImageResolution, ImageTemplate, ParamValue, ParamValues, TemplateParam, TwitterCard } from '@resoc/core'
import queryString, { ParsedQuery } from 'query-string'

interface EventQueryStringParameters {
  [name: string]: string | undefined
}

export const parseRawQuery = (rawQuery: string): ParsedQuery => (
  queryString.parse(rawQuery)
)

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

export const parseImageFormat = (formatParam: string | undefined | null): 'png' | 'jpeg' | 'webp' => {
  switch(formatParam) {
    case('jpg'):
    case('jpeg'):
      return 'jpeg';
    case('png'):
    case('webp'):
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

export const parseRequestType = (requestTypeParam: string | undefined | null): 'image' | 'demo' => {
  switch(requestTypeParam) {
    case('images'):
      return 'image';
    case('demos'):
      return 'demo';
    default:
      throw `Invalid request type: ${requestTypeParam}`;
  }
}

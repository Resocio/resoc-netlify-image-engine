import { FacebookOpenGraph, ImageResolution, ImageTemplate, paramLabel, ParamType, ParamValues, paramValueToString, TemplateParam, TwitterCard } from "@resoc/core";

export const imageResolutionToString = (
  resolution: ImageResolution
) => {
  switch(resolution) {
    case(FacebookOpenGraph):
      return 'open-graph';
    case(TwitterCard):
      return 'twitter-card';
    default:
      return `${resolution.width}x${resolution.height}`;
  }
}

export const imageUrl = (
  templateName: string,
  resolution: ImageResolution,
  format: 'png' | 'jpg'
) => (
  `/templates/${templateName}/images/${imageResolutionToString(resolution)}.${format}`
);

export const imageGetUrl = (
  templateName: string,
  resolution: ImageResolution,
  format: 'png' | 'jpg',
  parameters: TemplateParam[],
  values: ParamValues
) => {
  const defaultParam: TemplateParam = { name: 'dummy', type: ParamType.String, demoValue: 'dummy' };
  let params = Object.keys(values).map(k => `${k}=${encodeURIComponent(
    paramValueToString(parameters.find(p => p.name === k) || defaultParam, values[k])
  )}`).join('&');
  params = params.length > 0 ? `?${params}` : '';
  return `${imageUrl(templateName, resolution, format)}${params}`
}

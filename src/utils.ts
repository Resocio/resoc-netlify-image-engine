import { ImageTemplate, ParamValue, ParamValues, TemplateParam } from '@resoc/core'

interface EventQueryStringParameters {
  [name: string]: string | undefined
}

export const paramValuesFromQueryParams = (
  templateParams: TemplateParam[], queryParams: EventQueryStringParameters | null
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

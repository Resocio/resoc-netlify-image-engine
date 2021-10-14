import { ImageTemplate, ParamValue, ParamValues, TemplateParam } from '@resoc/core'
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

import { ParamType } from '@resoc/core';
import { parseRawQuery, queryParamsToParamValues, routeParamsToImageFormat } from './utils'

test('parseRawQuery', () => {
  expect(parseRawQuery('')).toEqual({});
  expect(parseRawQuery('title=Hello')).toEqual({ title: 'Hello'});
  expect(parseRawQuery('title=Hello&description=World')).toEqual({ title: 'Hello', description: 'World' });
});

test('queryParamsToParamValues', () => {
  expect(queryParamsToParamValues([
    { name: 'title', type: ParamType.String, demoValue: 'Demo' }
  ], {
    title: 'Hello!!', dummy: 'stuff'
  })).toEqual({
    title: 'Hello!!'
  });

  expect(queryParamsToParamValues([
    { name: 'title', type: ParamType.String, demoValue: 'Demo title' },
    { name: 'description', type: ParamType.String, demoValue: 'Demo description' },
  ], {
    title: 'Hello!!', dummy: 'stuff'
  })).toEqual({
    title: 'Hello!!'
  });

  expect(queryParamsToParamValues([
    { name: 'title', type: ParamType.String, demoValue: 'Demo title' },
    { name: 'description', type: ParamType.String, demoValue: 'Demo description' },
  ], null)).toEqual({});
});

test('routeParamsToImageFormat', () => {
  expect(routeParamsToImageFormat('jpg')).toEqual('jpeg');
  expect(routeParamsToImageFormat('jpeg')).toEqual('jpeg');
  expect(routeParamsToImageFormat('png')).toEqual('png');
  expect(routeParamsToImageFormat('webp')).toEqual('webp');
  expect(routeParamsToImageFormat(null)).toEqual('jpeg');
  expect(() => routeParamsToImageFormat('doc')).toThrow();
});

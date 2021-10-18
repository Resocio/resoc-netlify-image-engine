import { ParamType } from '@resoc/core';
import { parseDimensions, parseRawQuery, queryParamsToParamValues, parseImageFormat, parseRequestType } from './utils'

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

test('parseImageFormat', () => {
  expect(parseImageFormat('jpg')).toEqual('jpeg');
  expect(parseImageFormat('jpeg')).toEqual('jpeg');
  expect(parseImageFormat('png')).toEqual('png');
  expect(parseImageFormat('webp')).toEqual('webp');
  expect(parseImageFormat(null)).toEqual('jpeg');
  expect(() => parseImageFormat('doc')).toThrow();
});

test('parseDimensions', () => {
  expect(parseDimensions('open-graph')).toEqual({ width: 1200, height: 630 });
  expect(parseDimensions('twitter-card')).toEqual({ width: 1500, height: 750 });
  expect(parseDimensions('456x987')).toEqual({ width: 456, height: 987 });
  expect(() => parseDimensions('NOPE')).toThrow();
  expect(() => parseDimensions(null)).toThrow();
  expect(() => parseDimensions(undefined)).toThrow();
});

test('parseRequestType', () => {
  expect(parseRequestType('images')).toEqual('image');
  expect(parseRequestType('demos')).toEqual('demo');
  expect(() => parseRequestType('WHAT')).toThrow();
  expect(() => parseRequestType(null)).toThrow();
  expect(() => parseRequestType(undefined)).toThrow();
});

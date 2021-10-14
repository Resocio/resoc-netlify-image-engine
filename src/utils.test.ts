import { ParamType } from '@resoc/core';
import { paramValuesFromQueryParams } from './utils'

test('paramValuesFromQueryParams', () => {
  expect(paramValuesFromQueryParams([
    { name: 'title', type: ParamType.String, demoValue: 'Demo' }
  ], {
    title: 'Hello!!', dummy: 'stuff'
  })).toEqual({
    title: 'Hello!!'
  });

  expect(paramValuesFromQueryParams([
    { name: 'title', type: ParamType.String, demoValue: 'Demo title' },
    { name: 'description', type: ParamType.String, demoValue: 'Demo description' },
  ], {
    title: 'Hello!!', dummy: 'stuff'
  })).toEqual({
    title: 'Hello!!'
  });

  expect(paramValuesFromQueryParams([
    { name: 'title', type: ParamType.String, demoValue: 'Demo title' },
    { name: 'description', type: ParamType.String, demoValue: 'Demo description' },
  ], null)).toEqual({});
});

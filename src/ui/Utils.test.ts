import { FacebookOpenGraph, ParamType, TwitterCard } from '@resoc/core';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { imageGetUrl, imageResolutionToString, imageUrl } from './Utils'

test('imageResolutionToString', () => {
  expect(imageResolutionToString(FacebookOpenGraph)).toEqual('open-graph');
  expect(imageResolutionToString(TwitterCard)).toEqual('twitter-card');
  expect(imageResolutionToString({ width: 456, height: 789})).toEqual('456x789');
});

test('imageUrl', () => {
  expect(imageUrl(
    'my-template',
    FacebookOpenGraph,
    'jpg',
  )).toEqual(
    '/templates/my-template/images/open-graph.jpg'
  );
});

test('imageGetUrl', () => {
  expect(imageGetUrl(
    'my-template',
    FacebookOpenGraph,
    'jpg',
    [{ name: 'title', type: ParamType.String, demoValue: 'none' }],
    { title: "Hello world" }
  )).toEqual(
    '/templates/my-template/images/open-graph.jpg?title=Hello%20world'
  );
});

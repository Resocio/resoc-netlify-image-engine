import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CreateImage from './CreateImage';
import { FacebookOpenGraph, ParamType } from '@resoc/core';

export default {
  title: 'CreateImage',
  component: CreateImage,
} as ComponentMeta<typeof CreateImage>;

const Template: ComponentStory<typeof CreateImage> = (args) => <CreateImage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'basic01',
  template: {
    parameters: [ { name: 'title', type: ParamType.String, demoValue: 'Hello!' }]
  },
  resolution: FacebookOpenGraph,
  format: 'jpg',
  values: {
    title: "HELLO WORLD!"
  }
};

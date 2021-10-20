import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TemplateCard, { TemplateCardProps } from './TemplateCard';
import { Row, Col } from 'react-bootstrap'
import { loadRemoteTemplate, DefaultManifestName } from '@resoc/core';

export default {
  title: 'TemplateCard',
  component: TemplateCard,
  argTypes: {
    argTypes: { onSelect: { action: 'selected' } }
  },
} as ComponentMeta<typeof TemplateCard>;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & ComponentStory<typeof TemplateCard>;

const Template: TemplateStory = (args: TemplateCardProps, { loaded: { template } }) => (
  <Row>
    <Col md={6}>
      <TemplateCard {...args} template={template} />
    </Col>
  </Row>
);

export const Default = Template.bind({});
Default.loaders = [
  async () => ({
    template: await loadRemoteTemplate(`/title-description/${DefaultManifestName}`)
  }),
];
Default.args = {
  name: 'title-description',
  baseUrl: `/title-description/${DefaultManifestName}`,
  width: 1200,
  height: 630
};

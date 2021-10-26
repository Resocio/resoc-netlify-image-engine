import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TemplateEditor, { TemplateEditorProps } from './TemplateEditor';
import { Row, Col } from 'react-bootstrap'
import { loadRemoteTemplate, DefaultManifestName } from '@resoc/core';

export default {
  title: 'TemplateEditor',
  component: TemplateEditor,
  argTypes: {
    argTypes: { onSelect: { action: 'selected' } }
  },
} as ComponentMeta<typeof TemplateEditor>;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & ComponentStory<typeof TemplateEditor>;

const Template: TemplateStory = (args: TemplateEditorProps, { loaded: { template } }) => (
  <Row>
    <Col md={6}>
      <TemplateEditor {...args} template={template} />
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
  baseUrl: `/title-description/${DefaultManifestName}`
};

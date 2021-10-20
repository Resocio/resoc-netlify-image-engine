import { demoParamValues, FacebookOpenGraph } from '@resoc/core';
import { ScaledElement, TemplatePreview } from '@resoc/ui';
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Template } from './Types';

export type TemplateEditorProps = {
  template: Template;
};

const TemplateEditor = (props: TemplateEditorProps) => (
  <Row>
    <Col md={6}>
      <ScaledElement className="border">
        <TemplatePreview
          template={props.template.template}
          width={FacebookOpenGraph.width}
          height={FacebookOpenGraph.height}
          parameters={demoParamValues(props.template.template.parameters)}
          baseUrl={props.template.baseUrl}
        />
      </ScaledElement>
    </Col>
    <Col md={6}>
      TODO
    </Col>
  </Row>
);

export default TemplateEditor;

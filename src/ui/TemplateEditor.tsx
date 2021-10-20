import { demoParamValues, FacebookOpenGraph, ParamValues } from '@resoc/core';
import { ScaledElement, TemplatePreview } from '@resoc/ui';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import TemplateParameters from './TemplateParameters';
import { Template } from './Types';

export type TemplateEditorProps = {
  template: Template;
};

const TemplateEditor = (props: TemplateEditorProps) => {
  const [values, setValues] = useState<ParamValues>(
    demoParamValues(props.template.template.parameters)
  );

  return (
    <Row>
      <Col md={6}>
        <ScaledElement className="border">
          <TemplatePreview
            template={props.template.template}
            width={FacebookOpenGraph.width}
            height={FacebookOpenGraph.height}
            parameters={values}
            baseUrl={props.template.baseUrl}
          />
        </ScaledElement>
      </Col>
      <Col md={6}>
        <TemplateParameters
          parameters={props.template.template.parameters}
          values={values}
          onChange={(newValues) => {
            setValues(newValues);
          }}
        />
      </Col>
    </Row>
  );
}

export default TemplateEditor;

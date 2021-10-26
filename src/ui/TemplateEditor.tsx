import { demoParamValues, FacebookOpenGraph, ParamValues } from '@resoc/core';
import { ScaledElement, TemplatePreview } from '@resoc/ui';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import CreateImage from './CreateImage';
import TemplateParameters from './TemplateParameters';
import { Template } from './Types';
import { imageGetUrl } from './Utils';

export type TemplateEditorProps = {} & Template;

const TemplateEditor = (props: TemplateEditorProps) => {
  const [values, setValues] = useState<ParamValues>(
    demoParamValues(props.template.parameters)
  );

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <div className="border">
            <ScaledElement>
              <TemplatePreview
                template={props.template}
                width={FacebookOpenGraph.width}
                height={FacebookOpenGraph.height}
                parameters={values}
                baseUrl={props.baseUrl}
              />
            </ScaledElement>
          </div>
        </Col>
        <Col md={6}>
          <TemplateParameters
            parameters={props.template.parameters}
            values={values}
            onChange={(newValues) => {
              setValues(newValues);
            }}
          />
        </Col>
      </Row>

      <CreateImage
        format="jpg"
        resolution={FacebookOpenGraph}
        values={values}
        {...props}
      />
    </>
  );
}

export default TemplateEditor;

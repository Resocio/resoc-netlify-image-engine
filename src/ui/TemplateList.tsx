import { FacebookOpenGraph, demoParamValues } from '@resoc/core';
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import TemplateCard from './TemplateCard';
import { Template } from './Types';

export type TemplateListProps = {
  templates: Template[];
  onTemplateSelected: (t: Template) => void;
};

const TemplateList = (props: TemplateListProps) => (
  <Row>
    {props.templates.map(t => (
      <Col md={4} className="mb-4">
        <TemplateCard
          name={t.name}
          onSelect={() => props.onTemplateSelected(t) }
          baseUrl={t.baseUrl}
          key={t.name}
          template={t.template}
          width={FacebookOpenGraph.width}
          height={FacebookOpenGraph.height}
          parameters={demoParamValues(t.template.parameters)}
        />
      </Col>
    ))}
  </Row>
);

export default TemplateList;

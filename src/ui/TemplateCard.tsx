import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { TemplatePreview, ScaledElement } from '@resoc/ui'
import type { TemplatePreviewProps } from '@resoc/ui'
import { demoParamValues } from '@resoc/core'

export type TemplateCardProps = {
  name: string;
  onSelect: () => void;
} & TemplatePreviewProps;

const TemplateCard = (props: TemplateCardProps) => {
  const values = props.parameters || demoParamValues(props.template.parameters);

  return (
    <Card>
      <div className="card-img-top overflow-hidden">
        <ScaledElement>
          <TemplatePreview {...props} parameters={values} />
        </ScaledElement>
      </div>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Button variant="primary" onClick={props.onSelect}>Select</Button>
      </Card.Body>
    </Card>
  )
};

export default TemplateCard;

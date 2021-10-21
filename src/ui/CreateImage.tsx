import { ImageResolution, ParamValues } from '@resoc/core';
import React, { useEffect, useState } from 'react'
import CodeBlock from './CodeBlock';
import { Template } from './Types';
import { imageGetUrl, imageUrl } from './Utils';

export type CreateImageProps = {
  template: Template;
  resolution: ImageResolution;
  format: 'png' | 'jpg';
  values: ParamValues;
};

const CreateImage = (props: CreateImageProps) => {
  const [ baseUrl, setBaseUrl ] = useState<string | null>(null);

  useEffect(() => {
    if (!baseUrl) {
      setBaseUrl(`${window.location.protocol}//${window.location.hostname}`);
    }
  });

  const imageGetPath = imageGetUrl(
    props.template.name,
    props.resolution,
    props.format,
    props.template.template.parameters,
    props.values
  );
  const cmdGet = `curl -o my-image.${props.format} ${baseUrl}${imageGetPath}`;

  const imagePostPath = imageUrl(
    props.template.name,
    props.resolution,
    props.format,
  );
  const cmdPost =
    `curl -X POST -o my-image.${props.format} ${baseUrl}${imagePostPath} -H 'Content-Type: application/json' -d '${JSON.stringify(props.values)}'`;

  return (
    <div>
      <h2>Direct download</h2>

      <p>
        <a
          href={`${baseUrl}${imageGetPath}`}
          download
          className="btn btn-primary"
        >
          Download as an image
        </a>
      </p>

      <h2>API</h2>

      <h3>GET request</h3>
      <CodeBlock
        commandLine
        code={cmdGet}
      />

      <h3>POST request</h3>
      <CodeBlock
        commandLine
        code={cmdPost}
      />
    </div>
  );
};

export default CreateImage;

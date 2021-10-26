import { ImageResolution, ParamValues } from '@resoc/core';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import CodeBlock from './CodeBlock';
import { Template } from './Types';
import { imageGetUrl, imageUrl } from './Utils';

export type CreateImageProps = {
  resolution: ImageResolution;
  format: 'png' | 'jpg';
  values: ParamValues;
} & Template;

const CreateImage = (props: CreateImageProps) => {
  const [ baseUrl, setBaseUrl ] = useState<string | null>(null);
  const [ downloadIndicator, setDownloadIndicator ] = useState<boolean>(false);

  useEffect(() => {
    if (!baseUrl) {
      setBaseUrl(`${window.location.protocol}//${window.location.hostname}`);
    }
  });

  const imageGetPath = imageGetUrl(
    props.name,
    props.resolution,
    props.format,
    props.template.parameters,
    props.values
  );
  const cmdGet = `curl -o my-image.${props.format} ${baseUrl}${imageGetPath}`;

  const imagePostPath = imageUrl(
    props.name,
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
          onClick={() => {
            setDownloadIndicator(true);
            setTimeout(() => {
              setDownloadIndicator(false);
            }, 2000);
          }}
        >
          {downloadIndicator ? (
            <>
              <Spinner animation="border" role="status" size="sm" className="me-2">
                <span className="visually-hidden">Generating your image...</span>
              </Spinner>
              Generating your image...
            </>
          ) : (
            <>Download as an image</>
          )}
        </a>
      </p>

      <h2>GET request</h2>
      <CodeBlock
        commandLine
        code={cmdGet}
      />

      <h2>POST request</h2>
      <CodeBlock
        commandLine
        code={cmdPost}
      />
    </div>
  );
};

export default CreateImage;

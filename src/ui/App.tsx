import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import { demoParamValues, FacebookOpenGraph, ImageTemplate, loadRemoteTemplate } from '@resoc/core'
import TemplateCard from './TemplateCard';
import { Col, Row } from 'react-bootstrap';
import { ScaledElement, TemplatePreview } from '@resoc/ui';
import { Template } from './Types';
import TemplateList from './TemplateList';
import TemplateEditor from './TemplateEditor';

const App = () => {
  const [ templates, setTemplates ] = useState<Template[] | null>(null);
  const [ selectedTemplate, setSelectedTemplate ] = useState<Template | null>(null);

  useEffect(() => {
    if (templates) {
      return;
    }

    (async () => {
      const response = await axios.get('/templates');
      const templateNames: any = response.data;
      let tmpt: Template[] = [];
      for await (let name of templateNames.map((tn: { [name: string ]: string}) => tn.name)) {
        const baseUrl = `/templates/${name}/content/resoc.manifest.json`;
        tmpt.push({
          name,
          baseUrl,
          template: await loadRemoteTemplate(baseUrl)
        })
      }
      setTemplates(tmpt);
      console.log(templates);
    })();
  }, [ templates ]);

  if (!templates) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  if (selectedTemplate) {
    return (
      <>
        <h2>
          <a href="#" onClick={ () => setSelectedTemplate(null) }>
            Templates
          </a> / {selectedTemplate.name}
        </h2>

        <TemplateEditor {...selectedTemplate} />
      </>
    );
  } else {
    return (
      <>
        <h2>Templates</h2>

        <TemplateList
          templates={templates}
          onTemplateSelected={(template) => setSelectedTemplate(template)}
        />
      </>
    );
  }
};

export default App;

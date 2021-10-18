import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'

type Template = {
  name: string;
};

const App = () => {
  const [ templates, setTemplates ] = useState<Template[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/templates');
      const templates: any = response.data;
      setTemplates(templates);
    })();
  });

  if (!templates) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <ListGroup>
      {templates.map(t => (
        <ListGroup.Item action>
          {t.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default App;

# Resoc Netlify Image Engine

## Routes

- Template content (manifest, etc.):
`/templates/[template-name]/content/[file-name]`,
eg. `/templates/title-description/content/resoc.manifest.json`
- Image generation:
  - GET: `/templates/[template-name]/images/[dimensions].[format]?[parameters]`,
eg. `/templates/title-description/images/open-graph.jpg?title=Hello`
  - POST: `/templates/[template-name]/images/[dimensions].[format]`,
eg. `/templates/title-description/images/open-graph.jpg`.
The body is expected to be a JSON containing parameter values, eg. `{ "title": "Hello" }`

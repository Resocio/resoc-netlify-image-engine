# Resoc Netlify Image Engine

The Resoc Netlify Image Engine turns [Resoc image templates](https://www.npmjs.com/package/itdk) into images
via a simple HTTP API. As the name suggests, it should be deployed to Netlify.

## How to use the engine

### In a nutshell

- Use this repository as a template to create your own engine.
- Copy your Resoc templates to your engine.
- Deploy your engine to Netlify.

### Full procedure

Create your own image engine:
- Go to the [GitHub project page](https://github.com/Resocio/resoc-netlify-image-engine), which is probably where you already are.
- Click the "Use this template" button and follow the wizard to create your own repository.

Add your own Resoc image templates:
- Clone your fresh engine repository locally.
- Remove the demo template in `resoc-templates`. In other words, remove `resoc-templates/title-description`.
- Copy your existing image templates to `resoc-templates`.
For example, if you have two templates named `t01` and `t02`,
the template manifests will be in `resoc-templates/t01/resoc.manifest.json` and
`resoc-templates/t02/resoc.manifest.json`.
- Commit and push your changes.

Deploy your engine to Netlify:
- Login or sign up to [Netlify](https://www.netlify.com/).
- Create a new Netlify site and associate it with your engine GitHub repository.

Test your engine:
- Get your engine URL from the Netlify dashboard, eg `https://my-own-resoc-netlify-image-engine.netlify.app`.
- Visit `[your engine URL]/templates`. You should get a JSON document listing your templates.
- Visit `[your engine URL]/templates/[your template name]/demos/open-graph.jpg`.
For example, if you have a template named `t01`, visit `[your engine URL]/templates/t01/demos/open-graph.jpg`.
You should get an image.

## Routes

- Template content (manifest, etc.):
`/templates/[template-name]/content/[file-name]`,
for example `/templates/title-description/content/resoc.manifest.json`
- Image generation:
  - GET: `/templates/[template-name]/images/[dimensions].[format]?[parameters]`,
for example `/templates/title-description/images/open-graph.jpg?title=Hello`
  - POST: `/templates/[template-name]/images/[dimensions].[format]`,
for example `/templates/title-description/images/open-graph.jpg`
The body is expected to be a JSON containing parameter values, eg. `{ "title": "Hello" }`
- Demo image: `/templates/[template-name]/demos/[dimensions].[format]`,
for example `/templates/title-description/demos/twitter-card.jpg`

# Serverless Software License Example

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/niksauer/serverless-software-license/blob/master/LICENSE)

Read the [seminar paper](https://github.com/niksauer/serverless-software-license-paper/blob/master/paper.pdf) covering the motivation and design rationale for this project.

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

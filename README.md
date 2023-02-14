# PlanX Document Templates

Source for auto-generated subission templates integrated into PlanX.

This module uses `vite` for development.

## Running locally

- Install [pnpm](https://pnpm.io) globally if you don't have it already `npm i pnpm -g`
- Install dependencies `pnpm i`
- Start development server `pnpm dev`

Other useful package scripts:

  * `pnpm test`: run the test suite
  * `pnpm check`: check and fix type and linting errors
  * `pnpm ci`: run continuous integration checks
  * `pnpm build`: build the package

## Publishing

This node package is published via Github. Run `pnpm build` before checking in changes (including the `/dist` folder).

The main branch can be referenced in a `package.json` as the published version of this package, like so:

    "dependencies": {
      "@opensystemslab/planx-document-templates": "git://github.com/theopensystemslab/planx-document-templates.git#main",
      ...
    }

## License

This repository is licensed under the [Open Government License v3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

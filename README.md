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

This node package is published via Github.

To release a new version, increment the version number in `package.json` and run `pnpm build` before checking in changes (including the `/dist` folder).

Pushing a tag to the release commit with the same version number (i.e. `git tag v1.0.0`) also allows consumers to reference a specific version in their `package.json`, like so:

    "dependencies": {
      "@opensystemslab/planx-document-templates": "git://github.com/theopensystemslab/planx-document-templates.git#v1.0.0",
      ...
    }

## License

This repository is licensed under the [Open Government License v3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

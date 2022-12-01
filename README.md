# PlanX Document Review

This simple component is to provide a simple visual representation of data from a PlanX submission.

This module uses `vite` for development and exports a simple React component.

## Dependencies

This package includes a reference to the `<my-map />` Web Component as defined in a the [OSL map component](https://github.com/theopensystemslab/map). This Web Component is not directly included in this repository and so the caller must ensure that the appropriate scripts are loaded before rendering the component. 

For example, in the `head` of the page, you may want this:

    <script src="https://cdn.jsdelivr.net/npm/@opensystemslab/map"></script>

Alternatively, if server-side rendering, you may want to do something like this:

    renderToPipeableStream(
      <DocumentReview csv={csv} geojson={geojson} />,
      { bootstrapScripts: ["https://cdn.jsdelivr.net/npm/@opensystemslab/map"] }
    );

## Running locally

- Install [pnpm](https://pnpm.io) globally if you don't have it already `npm i pnpm -g`
- Install dependencies `pnpm i`
- Start development server `pnpm dev`

Other useful package scripts:

  * `pnpm test`: run the test suite
  * `pnpm lint`: check and fix linting errors
  * `pnpm ci`: run continuous integration checks
  * `pnpm build`: build the package

## License

This repository is licensed under the [Open Government License v3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

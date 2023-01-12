import * as React from "react";
import Map from "./Map";
import { Global, css } from "@emotion/react";

export function BoundaryMapDocument(props: { geojson: object }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/npm/@opensystemslab/map"></script>
        <title>PlanX Submission Boundary</title>
      </head>
      <body>
        <Styles />
        <h1>Boundary</h1>
        <Map boundary={props.geojson} />
      </body>
    </html>
  );
}

function Styles() {
  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
        body {
          font-family: "Inter", arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 18px;
          font-size: 1.125rem;
        }
      `}
    />
  );
}

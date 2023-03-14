import React from "react";
import ReactDOM from "react-dom/client";
import { SubmissionOverviewDocument } from "./overview/SubmissionOverview";
import { BoundaryMapDocument } from "./map/BoundaryMapDocument";
// import example from "../data/example.json";
import example from "../data/exampleWithSections.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BoundaryMapDocument geojson={example.geojson} />
    <hr />
    <SubmissionOverviewDocument data={example.data} />
  </React.StrictMode>
);

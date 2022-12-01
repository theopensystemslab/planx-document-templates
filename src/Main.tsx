import React from "react";
import ReactDOM from "react-dom/client";
import DocumentReview from "./DocumentReview";
import example from "./example.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DocumentReview
      csv={example.csv}
      geojson={example.geojson}
    />
  </React.StrictMode>
);

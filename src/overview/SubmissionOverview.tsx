/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from "react";
import DataItem from "./DataItem";
import Grid from "@mui/material/Grid";
import { Global, css } from "@emotion/react";
import { validatePlanXExportData } from "./helpers";
import type { PlanXExportData } from "../types";

export function SubmissionOverviewDocument(props: {
  data: PlanXExportData[];
}): JSX.Element {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PlanX Submission Overview</title>
      </head>
      <body>
        <SubmissionOverview data={props.data} />
      </body>
    </html>
  );
}

export function SubmissionOverview(props: {
  data: PlanXExportData[];
}): JSX.Element {
  return (
    <React.Fragment>
      <Styles />
      <Grid
        container
        spacing={2}
        direction="row-reverse"
        sx={{
          justifyContent: "center",
          minWidth: "650px",
          maxWidth: "1400px",
          padding: "0 1em",
          margin: "auto",
        }}
      >
        <Grid item xs={12}>
          <h1 style={{ textAlign: "center" }}>PlanX Submission Overview</h1>
        </Grid>
        <Grid item xs={12} md={6} sx={{ paddingTop: 0 }}>
          <h2>Data</h2>
          <DataList data={props.data} />
        </Grid>
      </Grid>
    </React.Fragment>
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

function DataList(props: { data: PlanXExportData[] }) {
  const hasValidDataStructure = validatePlanXExportData(props.data);
  return (
    <React.Fragment>
      {hasValidDataStructure ? (
        props.data.map((item: PlanXExportData, index: number) => {
          const { question, responses } = item;
          return <DataItem key={index} title={question} details={responses} />;
        })
      ) : (
        <p>Data not available</p>
      )}{" "}
    </React.Fragment>
  );
}

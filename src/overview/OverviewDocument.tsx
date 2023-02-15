import { css, Global } from "@emotion/react";
import Box from "@mui/material/Box";
import prettyTitle from "lodash.startcase";
import * as React from "react";
import { PlanXExportData } from "../types";
import { prettyQuestion } from "./helpers";

function Highlights(props: { data: PlanXExportData[] }): JSX.Element {
  const siteAddress = props.data.find(d => d.question === "site")?.responses;
  return (
    <Box component="dl" sx={{ ...gridStyles, border: "none" }}>
      <React.Fragment key={"address"}>
        <dt>
          Property address
        </dt>
        <dd>
          {[siteAddress?.address_1?.toString(), siteAddress?.town?.toString(), siteAddress?.postcode?.toString()].filter(Boolean).join(" ")}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>
      <React.Fragment key={"sessionId"}>
        <dt>
          Planning application reference
        </dt>
        <dd>
          {"TBD"}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>
      <React.Fragment key={"payReference"}>
        <dt>
          GOV.UK Pay reference
        </dt>
        <dd>
          {"TBD"}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>
      <React.Fragment key={"fee"}>
        <dt>
          Fee paid
        </dt>
        <dd>
          {"TBD"}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>
      <React.Fragment key={"createdDate"}>
        <dt>
          Paid and submitted on
        </dt>
        <dd>
          {"TBD"}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>
    </Box>
  );
}

function Result(props: { data: PlanXExportData[] }): JSX.Element {
  const result = props.data.find(d => d.question === "result")?.responses;
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <h2>It looks like</h2>
      <p style={{ fontWeight: 700 }}>{result?.heading?.toString()}</p>
      <p>{result?.description?.toString()}</p>
      <p>This pre-assessment is based on the information provided by the applicant.</p>
    </Box>
  );
}

function AboutTheProperty(props: { data: PlanXExportData[] }): JSX.Element {
  const siteAddress = props.data.find(d => d.question === "site")?.responses;
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <h2>About the property</h2>
      <Box component="dl" sx={gridStyles}>
        <React.Fragment key={"address"}>
          <dt>
            Address
          </dt>
          <dd>
            {[siteAddress?.address_1?.toString(), siteAddress?.town?.toString(), siteAddress?.postcode?.toString()].filter(Boolean).join(" ")}
          </dd>
          <dd>{""}</dd>
        </React.Fragment>
        <React.Fragment key={"uprn"}>
          <dt>
            UPRN
          </dt>
          <dd>
            {siteAddress?.uprn?.toString()}
          </dd>
          <dd>{""}</dd>
        </React.Fragment>
        <React.Fragment key={"coordinate"}>
          <dt>
            Coordinate (lng, lat)
          </dt>
          <dd>
            {siteAddress?.longitude}, {siteAddress?.latitude}
          </dd>
          <dd>{""}</dd>
        </React.Fragment>
      </Box>
    </Box>
  )
}

function Boundary(props: { data: PlanXExportData[] }): JSX.Element {
  const boundary = props.data.find(d => d.question === "boundary_geojson")?.responses;
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <h2>Boundary</h2>
      <pre style={{ display: "block", whiteSpace: "pre-wrap", padding: ".5em", background: "#f2f2f2", fontSize: ".8em" }}>
        {JSON.stringify(boundary, null, 2)}
      </pre>
    </Box>
  )
}

function ProposalDetails(props: { data: PlanXExportData[] }): JSX.Element {
  return (
    <Box>
      <h2>Proposal details</h2>
      <Box component="dl" sx={gridStyles}>
        {props.data.map((d, i) => (
          <React.Fragment key={i}>
            <dt>
              {prettyQuestion(d.question)}
            </dt>
            <dd>
              {typeof d.responses === "string" ? d.responses : "TBD"}
            </dd>
            <dd style={{ fontStyle: "italic" }}>{Boolean(d.metadata?.auto_answered) ? "Auto-answered" : ""}</dd>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export function OverviewDocument(props: { data: PlanXExportData[] }) {
  // Pluck out some key questions & responses to show in special sections
  const applicationType: string | undefined | unknown = props.data.find(d => d.question === "application_type")?.responses;
  const documentTitle: string = applicationType && typeof applicationType === "string" ? prettyTitle(applicationType) : "PlanX Submission Overview";

  // Identify questions that we want to hide from the full list of "Proposal details"
  const removeableQuestions: string[] = [
    "planning_application_reference",
    "property_address",
    "application_type",
    "result",
    "site",
    "boundary_geojson",
    "payment_amount",
    "payment_reference",
  ];

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/npm/@opensystemslab/map"></script>
        <title>{documentTitle}</title>
      </head>
      <body>
        <Styles />
        <h1>{documentTitle}</h1>
        <Highlights data={props.data} />
        <Result data={props.data} />
        <AboutTheProperty data={props.data} />
        <Boundary data={props.data} />
        <ProposalDetails data={props.data} />
      </body>
    </html>
  );
}

// Inspired by GOV.UK's Summary List, styles borrowed from PlanX's Review page
//   see https://github.com/theopensystemslab/planx-new/blob/main/editor.planx.uk/src/%40planx/components/shared/Preview/SummaryList.tsx
const gridStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 200px",
  gridRowGap: "10px",
  marginTop: "1em",
  marginBottom: "1em",
  "& > *": {
    borderBottom: 1,
    borderColor: "divider",
    paddingBottom: ".5em",
    paddingTop: ".5em",
    verticalAlign: "top",
    margin: 0,
  },
  "& ul": {
    listStylePosition: "inside",
    padding: 0,
    margin: 0,
  },
  "& >:nth-child(3n+1)": {
    // left column
    fontWeight: 700,
  },
  "& >:nth-child(3n+2)": {
    // middle column
    paddingLeft: "10px",
  },
  "& >:nth-child(3n+3)": {
    // right column
    textAlign: "right",
  },
};

function Styles() {
  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
        body {
          font-family: "Inter", arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 16px;
          font-size: 1rem;
        }
      `}
    />
  );
}

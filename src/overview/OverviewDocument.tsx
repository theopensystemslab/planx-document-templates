import { css, Global } from "@emotion/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import prettyTitle from "lodash.startcase";
import * as React from "react";
import { PlanXExportData } from "../types";
import { getToday, prettyQuestion, prettyResponse, validatePlanXExportData } from "./helpers";

function Highlights(props: { data: PlanXExportData[] }): JSX.Element {
  const siteAddress = props.data.find(d => d.question === "site")?.responses;
  const sessionId = props.data.find(d => d.question === "Planning Application Reference")?.responses;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payRef = props.data.find(d => d.question === "application.fee.reference.govPay")?.responses?.["payment_id"];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const fee = props.data.find(d => d.question === "application.fee.reference.govPay")?.responses?.["amount"];
  return (
    <Box component="dl" sx={{ ...gridStyles, border: "none" }}>
      <React.Fragment key={"address"}>
        <dt>
          Property address
        </dt>
        <dd>
          {[siteAddress?.["address_1"], siteAddress?.["town"], siteAddress?.["postcode"]].filter(Boolean).join(" ")}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>
      <React.Fragment key={"sessionId"}>
        <dt>
          Planning application reference
        </dt>
        <dd>
          {typeof sessionId === "string" && sessionId}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>
      {payRef && <React.Fragment key={"payReference"}>
        <dt>
          GOV.UK Pay reference
        </dt>
        <dd>
          {payRef}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>}
      {fee && <React.Fragment key={"fee"}>
        <dt>
          Fee paid
        </dt>
        <dd>
          {typeof fee === "number" && `£${fee}`}
        </dd>
        <dd>{""}</dd>
      </React.Fragment>}
      <React.Fragment key={"createdDate"}>
        <dt>
          Paid and submitted on
        </dt>
        <dd>
          {getToday()}
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
      <span style={{ fontWeight: 700, padding: ".5em", backgroundColor: "#ffdd00" }}>{result?.["heading"]}</span>
      <p>This pre-assessment is based on the information provided by the applicant.</p>
    </Box>
  );
}

function AboutTheProperty(props: { data: PlanXExportData[] }): JSX.Element {
  const siteAddress = props.data.find(d => d.question === "site")?.responses;
  return (
    <Box>
      <h2>About the property</h2>
      <Box component="dl" sx={gridStyles}>
        <React.Fragment key={"address"}>
          <dt>
            Address
          </dt>
          <dd>
            {[siteAddress?.["address_1"], siteAddress?.["town"], siteAddress?.["postcode"]].filter(Boolean).join(" ")}
          </dd>
          <dd>{""}</dd>
        </React.Fragment>
        <React.Fragment key={"uprn"}>
          <dt>
            UPRN
          </dt>
          <dd>
            {siteAddress?.["uprn"]}
          </dd>
          <dd>{""}</dd>
        </React.Fragment>
        <React.Fragment key={"coordinate"}>
          <dt>
            Coordinate (lng, lat)
          </dt>
          <dd>
            {siteAddress?.["longitude"]}, {siteAddress?.["latitude"]}
          </dd>
          <dd>{""}</dd>
        </React.Fragment>
      </Box>
    </Box>
  );
}

function Boundary(props: { data: PlanXExportData[] }): JSX.Element {
  const boundary = props.data.find(d => d.question === "boundary_geojson")?.responses;
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
      <h2>Boundary</h2>
      <pre style={{ display: "block", whiteSpace: "pre-wrap", padding: ".5em", background: "#f2f2f2", fontSize: ".8em" }}>
        {JSON.stringify(boundary, null, 2)}
      </pre>
    </Box>
  );
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
              {prettyResponse(d.responses)?.split("\n")?.length > 1
                ? (
                  <ul style={{ lineHeight: "1.5em" }}>
                    {prettyResponse(d.responses)?.split("\n")?.map((response: string, i: number) => (
                      <li key={i}>{response}</li>
                    ))}
                  </ul>
                )
                : prettyResponse(d.responses)
              }
            </dd>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            <dd style={{ fontStyle: "italic" }}>{typeof d.metadata === "object" && Boolean(d.metadata?.["auto_answered"]) ? "Auto-answered" : ""}</dd>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export function OverviewDocument(props: { data: PlanXExportData[] }) {
  // Pluck out some key questions & responses to show in special sections
  const applicationType: unknown = props.data.find(d => d.question === "application_type")?.responses;
  const workStatus: unknown = props.data.find(d => d.question === "work_status")?.responses;
  const documentTitle: unknown = applicationType && typeof applicationType === "string" && typeof workStatus === "string" ? [prettyTitle(applicationType), prettyTitle(workStatus)].filter(Boolean).join(" - ") : "PlanX Submission Overview";
  const boundary: unknown = props.data.find(d => d.question === "boundary_geojson")?.responses;

  // Identify questions that we want to hide from the full list of "Proposal details" if they exist
  const removeableQuestions: PlanXExportData["question"][] = [
    "Planning Application Reference",
    "Property Address",
    "application.fee.reference.govPay",
    "application_type",
    "site",
    "boundary_geojson",
    "constraints",
    "work_status",
    "payment_amount",
    "payment_reference",
    "result",
  ];
  const filteredProposalDetails = props.data.filter(d => !removeableQuestions.includes(d.question));

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/npm/@opensystemslab/map@0.7.2"></script>
        <title>{typeof documentTitle === "string" && documentTitle}</title>
        <link rel="stylesheet" href="https://cdn.rawgit.com/Viglino/ol-ext/master/dist/ol-ext.min.css" />
      </head>
      <body>
        <Styles />
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "1000px",
            margin: "auto",
          }}
        >
          <h1>{typeof documentTitle === "string" && documentTitle}</h1>
          {!validatePlanXExportData(props.data) ? <p><strong>Unable to display data.</strong></p> : (
            <>
              {boundary && (
                <Box sx={{ marginBottom: 1 }}>
                  <my-map
                    showNorthArrow={true}
                    showScale={true}
                    hideResetControl={true}
                    geojsonData={JSON.stringify(boundary)}
                    id="boundary-map"
                    showPrint={true}
                  />
                </Box>
              )}
              <Highlights data={props.data} />
              <Result data={props.data} />
              <AboutTheProperty data={props.data} />
              <Box sx={{ display: "flex" }}>
                <Boundary data={props.data} />
              </Box>
              <ProposalDetails data={filteredProposalDetails} />
            </>
          )}
        </Grid>
      </body>
    </html>
  );
}

// Inspired by GOV.UK's Summary List, styles borrowed from PlanX's Review page
//   see https://github.com/theopensystemslab/planx-new/blob/main/editor.planx.uk/src/%40planx/components/shared/Preview/SummaryList.tsx
const gridStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr .5fr",
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

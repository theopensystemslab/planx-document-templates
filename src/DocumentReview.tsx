/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from "react";
import Map from "./Map";
import Answer from "./Answer";
import Grid from "@mui/material/Grid";
import { Global, css } from "@emotion/react";

type DocumentReviewProps = React.PropsWithChildren<{
  geojson: object;
  csv: QuestionAnswer[];
}>;

export default function DocumentReview(
  props: DocumentReviewProps
): React.ReactElement<DocumentReviewProps, any> {
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
          <h1>Review Document</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Boundary</h2>
          <MapView geojson={props.geojson} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ paddingTop: 0 }}>
          <h2>Data</h2>
          <AnswerView csv={props.csv} />
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

function MapView(props: { geojson: object }) {
  return (
    <React.Fragment>
      {props.geojson ? (
        <Map boundary={props.geojson} />
      ) : (
        <p>Boundary map not available</p>
      )}{" "}
    </React.Fragment>
  );
}

type QuestionAnswer = {
  question: string;
  responses: any;
};

function AnswerView(props: { csv: QuestionAnswer[] }) {
  const { csv: answers } = props;
  return (
    <React.Fragment>
      {checkAnswerProps(answers) ? (
        answers.map((entry, index) => (
          <Answer
            key={index}
            title={entry.question}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            details={entry.responses}
          />
        ))
      ) : (
        <p>Data not available</p>
      )}{" "}
    </React.Fragment>
  );
}

export function checkAnswerProps(props: QuestionAnswer[]): boolean {
  return (
    props &&
    props.every((entry) => {
      return (
        Object.hasOwn(entry, "question") && Object.hasOwn(entry, "responses")
      );
    })
  );
}

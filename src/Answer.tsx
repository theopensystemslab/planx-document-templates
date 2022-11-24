/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint @typescript-eslint/no-unsafe-assignment: "off" */
import * as React from "react";
import prettyTitle from "lodash.startcase";
import styled from "@emotion/styled";

type AnswerProps = React.PropsWithChildren<{
  title: string;
  details: any;
}>;

export default function Answer(
  props: AnswerProps
): React.ReactElement<AnswerProps, any> {
  const Item = styled.div`
    padding: 1em 0;
    border-top: 1px solid #00000022;
    page-break-inside: avoid;
  `;

  const Title = styled.p`
    margin: 0 0 1em 0;
    font-weight: bold;
  `;

  const checkAnswerProps = (props: object) => {
    return Object.hasOwn(props, "title") && Object.hasOwn(props, "details");
  };

  if (checkAnswerProps(props)) {
    return (
      <Item>
        <Title>
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            prettyTitle(props.title)
          }
        </Title>
        <Details data={props.details} />
      </Item>
    );
  }
  return <p>[error]</p>;
}

function Details(props: { data: any }): React.ReactElement<any, any> {
  const Empty = styled.span`
    color: #00000033;
  `;
  const { data } = props;
  if (data === null) {
    return <Empty>[none]</Empty>;
  }
  if (data === undefined) {
    return <Empty>[empty]</Empty>;
  }
  if (typeof data === "boolean") {
    return <span>{data ? "true" : "false"}</span>;
  }
  if (typeof data === "string" || typeof data === "number") {
    return <span>{data}</span>;
  }
  if (Array.isArray(data)) {
    return List(data);
  }
  if (typeof data === "object") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Tree(data);
  }
  return <p>{`[error: Unknown detail format for ${typeof data}]`}</p>;
}

function List(details: any[]): React.ReactElement<any, any> {
  const isSingleValueArray =
    Array.isArray(details) &&
    details.length === 1 &&
    Object.hasOwn(details[0], "value"); // eslint-disable-line @typescript-eslint/no-unsafe-argument

  if (isSingleValueArray) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return <Details data={details[0]["value"]} />;
  }

  return (
    <ul>
      {
        // eslint-disable-next-line
        details.map((item) => (
          <li key={JSON.stringify(item)}>
            <Details data={item} />
          </li>
        ))
      }
    </ul>
  );
}

function Tree(details: object): React.ReactElement<any, any> {
  return (
    <ul>
      {Object.keys(details)
        .sort()
        .map((key) => (
          <li key={key}>
            <strong>
              {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                prettyTitle(key)
              }
            </strong>
            {": "}
            <Details data={details[key]} />
          </li>
        ))}
    </ul>
  );
}

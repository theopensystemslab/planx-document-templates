import * as React from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "my-map": MapProps;
    }

    interface MapProps {
      showNorthArrow: boolean;
      showScale: boolean;
      hideResetControl: boolean;
      geojsonData: string;
    }
  }
}

export default function Map(props: { boundary: object }) {
  return (
    <my-map
      showNorthArrow={true}
      showScale={true}
      hideResetControl={true}
      geojsonData={JSON.stringify(props.boundary)}
    />
  );
}

/// <reference types="react" />
declare global {
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
export default function Map(props: {
    boundary: object;
}): JSX.Element;

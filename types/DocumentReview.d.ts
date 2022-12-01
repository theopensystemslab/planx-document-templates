import * as React from "react";
export type DocumentReviewProps = React.PropsWithChildren<{
    geojson: object;
    csv: QuestionAnswer[];
}>;
export default function DocumentReview(props: DocumentReviewProps): React.ReactElement<DocumentReviewProps, any>;
export type QuestionAnswer = {
    question: string;
    responses: any;
};

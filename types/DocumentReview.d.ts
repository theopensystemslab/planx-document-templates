import * as React from "react";
type DocumentReviewProps = React.PropsWithChildren<{
    geojson: object;
    csv: QuestionAnswer[];
}>;
export default function DocumentReview(props: DocumentReviewProps): React.ReactElement<DocumentReviewProps, any>;
type QuestionAnswer = {
    question: string;
    responses: any;
};
export declare function checkAnswerProps(props: QuestionAnswer[]): boolean;
export {};

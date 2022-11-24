import * as React from "react";
type AnswerProps = React.PropsWithChildren<{
    title: string;
    details: any;
}>;
export default function Answer(props: AnswerProps): React.ReactElement<AnswerProps, any>;
export {};

import prettyTitle from "lodash.startcase";
import type { PlanXExportData } from "../types";

export function validatePlanXExportData(data: PlanXExportData[]): boolean {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every((entry: object) => {
      return (
        Object.hasOwn(entry, "question") && Object.hasOwn(entry, "responses")
      );
    })
  );
}

export function safeDecodeURI(data: string): string {
  try {
    return decodeURI(data)
  } catch (error) {
    return data
  };
};

export function prettyQuestion(question: string): string {
  if (question.includes("?") || question.includes("File") || (!question.includes("_") && question.includes(" "))) {
    return question
  } else {
    return prettyTitle(question)
  };
};

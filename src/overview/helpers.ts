import prettyTitle from "lodash.startcase";
import type { PlanXExportData, ResponseObject } from "../types";

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

export function prettyQuestion(data: PlanXExportData["question"]): string {
  const isPhrasedAsQuestion = data.includes("?");
  const isFileUpload = data.includes("File");
  const isCustomLabeledKey = !data.includes("_") && data.includes(" ");

  if (isPhrasedAsQuestion || isFileUpload || isCustomLabeledKey) {
    return safeDecodeURI(data);
  } else {
    return safeDecodeURI(prettyTitle(data));
  };
};

export function prettyResponse(data: PlanXExportData["responses"]): string {
  if (!data) {
    return "";
  }
  if (typeof data === "string") {
    return safeDecodeURI(data.trim());
  }
  if (typeof data === "number") {
    return data.toString();
  }
  if (typeof data === "boolean") {
    return data ? "True" : "False";
  } 
  if (Array.isArray(data)) {
    return getResponseValuesFromList(data);
  }
  return "Error displaying response";
};

function getResponseValuesFromList(data: ResponseObject[]): string {
  if (data?.length === 1) {
    if (typeof data?.[0]?.["value"] === "string") {
      return safeDecodeURI(data?.[0]?.["value"]);
    } else {
      return data?.[0]?.["value"];
    }
  }
  if (data?.length > 1) {
    const dataValues = data?.map(d => d?.["value"]);
    return safeDecodeURI(dataValues?.filter(Boolean)?.join("\n"));
  }
  return "Error displaying list of responses";
};

export function getToday(): string {
  return new Date().toLocaleDateString("en-GB");
};

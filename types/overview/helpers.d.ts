import type { PlanXExportData } from "../types";
export declare function validatePlanXExportData(data: PlanXExportData[]): boolean;
export declare function safeDecodeURI(data: string): string;
export declare function prettyQuestion(data: PlanXExportData["question"]): string;
export declare function prettyResponse(data: PlanXExportData["responses"]): string | number;
export declare function getToday(): string;

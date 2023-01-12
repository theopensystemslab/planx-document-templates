/// <reference types="node" />
import type { Passport, PlanXExportData } from "./types";
export declare function generateHTMLOverviewStream(planXExportData: PlanXExportData[]): import("react-dom/server").PipeableStream;
export declare function generateHTMLMapStream(geojson: object): import("react-dom/server").PipeableStream;
export declare function generateDocxTemplateStream(args: {
    templateName: string;
    passport: Passport;
}): import("stream").Stream;
export declare function hasRequiredDataForTemplate(args: {
    templateName: string;
    passport: Passport;
}): boolean;

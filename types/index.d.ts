/// <reference types="node" />
import { Document } from "docx";
import type { Passport, PlanXExportData } from "./types";
export type Template = {
    template: (passport: {
        data: object;
    }) => Document;
    redactions?: string[] | undefined;
    requirements: string[];
};
export declare function generateHTMLOverviewStream(planXExportData: PlanXExportData[]): import("react-dom/server").PipeableStream;
export declare function generateHTMLMapStream(geojson: object): import("react-dom/server").PipeableStream;
export declare function generateDocxTemplateStream({ templateName, passport, }: {
    templateName: string;
    passport: Passport;
}): import("stream").Stream;
export declare function hasRequiredDataForTemplate({ templateName, passport, }: {
    templateName: string;
    passport: Passport;
}): boolean;

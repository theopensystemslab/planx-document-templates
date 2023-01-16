import React from "react";
import resolvePath from "lodash.get";
import { renderToPipeableStream } from "react-dom/server";
import { Packer } from "docx";
import { SubmissionOverviewDocument } from "./overview/SubmissionOverview";
import { BoundaryMapDocument } from "./map/BoundaryMapDocument";
import { LambethLDCETemplate, LambethLDCPTemplate } from "./templates/Lambeth";
import type { Document as DocxDocument } from "docx";
import type { Passport, PlanXExportData } from "./types";

const TEMPLATES: Record<
  string,
  { template: DocxDocument; requirements: string[] }
> = {
  "Lambeth:LDC-P.docx": {
    template: LambethLDCPTemplate,
    requirements: [],
  },
  "Lambeth:LDC-E.docx": {
    template: LambethLDCETemplate,
    requirements: [],
  },
};

export function generateHTMLOverviewStream(planXExportData: PlanXExportData[]) {
  return renderToPipeableStream(
    <SubmissionOverviewDocument data={planXExportData} />
  );
}

export function generateHTMLMapStream(geojson: object) {
  return renderToPipeableStream(<BoundaryMapDocument geojson={geojson} />);
}

export function generateDocxTemplateStream(args: {
  templateName: string;
  passport: Passport;
}) {
  if (!hasRequiredDataForTemplate(args)) {
    throw new Error(
      `Template "${args.templateName}" is missing required fields`
    );
  }
  const template = TEMPLATES[args.templateName].template;
  return Packer.toStream(template);
}

export function hasRequiredDataForTemplate(args: {
  templateName: string;
  passport: Passport;
}): boolean {
  const template = TEMPLATES[args.templateName];
  if (!template) throw new Error(`Template "${args.templateName}" not found`);
  for (const path of template.requirements) {
    if (!resolvePath(args.passport.data, path)) {
      return false;
    }
  }
  return true;
}

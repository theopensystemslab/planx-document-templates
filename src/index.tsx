import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { SubmissionOverviewDocument } from "./overview/SubmissionOverview";
import { BoundaryMapDocument } from "./map/BoundaryMapDocument";
import { LDCETemplate } from "./templates/LDCETemplate";
import { hasValue } from "./templates/helpers";
import { Document, Packer } from "docx";
import type { Passport, PlanXExportData } from "./types";

export type Template = {
  template: (passport: { data: object }) => Document;
  redactions?: string[] | undefined;
  requirements: string[];
};

const TEMPLATES: Record<string, Template> = {
  _blank: {
    template: () => new Document({ sections: [] }),
    requirements: [],
  },
  LDCE: {
    template: LDCETemplate,
    requirements: [], // no required fields
  },
  LDCE_redacted: {
    template: LDCETemplate,
    redactions: [
      "applicant.email",
      "applicant.phone.primary",
      "applicant.phone.secondary",
    ],
    requirements: [], // no required fields
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

export function generateDocxTemplateStream({
  templateName,
  passport,
}: {
  templateName: string;
  passport: Passport;
}) {
  const template: Template | undefined = TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Template "${templateName}" not found`);
  }
  const foundTemplate: Template = template;
  if (!hasRequiredDataForTemplate({ templateName, passport })) {
    throw new Error(`Template "${templateName}" is missing required fields`);
  }
  const data = applyRedactions(passport, foundTemplate.redactions);
  const document = foundTemplate.template(data);
  return Packer.toStream(document);
}

export function hasRequiredDataForTemplate({
  templateName,
  passport,
}: {
  templateName: string;
  passport: Passport;
}): boolean {
  const template: Template | undefined = TEMPLATES[templateName];
  if (!template) throw new Error(`Template "${templateName}" not found`);
  for (const path of template.requirements) {
    if (!hasValue(passport.data, path)) {
      return false;
    }
  }
  return true;
}

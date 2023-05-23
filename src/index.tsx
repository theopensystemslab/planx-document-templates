import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { BoundaryMapDocument } from "./map/BoundaryMapDocument";
import { LDCPTemplate } from "./templates/LDCPTemplate";
import { LDCETemplate } from "./templates/LDCETemplate";
import { hasValue, getString, applyRedactions } from "./helpers";
import { Document, Packer } from "docx";
import type { Passport, PlanXExportData } from "./types";
import { OverviewDocument } from "./overview/OverviewDocument";

export type Template = {
  template: (passport: { data: object }) => Document;
  redactions?: string[] | undefined;
  requirements: { key: string; value: string | undefined }[];
};

export const TEMPLATES: Record<string, Template> = {
  _blank: {
    template: () => new Document({ sections: [] }),
    requirements: [],
  },
  LDCE: {
    template: LDCETemplate,
    requirements: [{ key: "application.type", value: "ldc.existing" }],
  },
  LDCE_redacted: {
    template: LDCETemplate,
    redactions: [
      "applicant.email",
      "applicant.phone.primary",
      "applicant.phone.secondary",
      "applicant.sameAddress.form"
    ],
    requirements: [{ key: "application.type", value: "ldc.existing" }],
  },
  LDCP: {
    template: LDCPTemplate,
    requirements: [{ key: "application.type", value: "ldc.proposed" }],
  },
  LDCP_redacted: {
    template: LDCPTemplate,
    redactions: [
      "applicant.email",
      "applicant.phone.primary",
      "applicant.phone.secondary",
      "applicant.sameAddress.form"
    ],
    requirements: [{ key: "application.type", value: "ldc.proposed" }],
  },
};

export function generateHTMLOverviewStream(planXExportData: PlanXExportData[]) {
  return renderToPipeableStream(
    <OverviewDocument data={planXExportData} />
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
  if (!TEMPLATES[templateName]) {
    throw new Error(`Template "${templateName}" not found`);
  }
  if (!hasRequiredDataForTemplate({ templateName, passport })) {
    throw new Error(`Template "${templateName}" is missing required fields`);
  }
  const { redactions, template } = TEMPLATES[templateName]!;
  let data = passport;
  if (redactions && redactions.length) {
    data = applyRedactions(passport, redactions);
  }
  const document: Document = template(data);
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
  for (const { key, value } of template.requirements) {
    if (!hasValue(passport.data, key)) {
      return false;
    }
    if (value) {
      return getString(passport.data, key) === value;
    }
  }
  return true;
}

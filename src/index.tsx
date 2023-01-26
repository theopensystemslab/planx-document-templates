import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { SubmissionOverviewDocument } from "./overview/SubmissionOverview";
import { BoundaryMapDocument } from "./map/BoundaryMapDocument";
import { LDCP } from "./templates/LDCP";
import { LDCE } from "./templates/LDCE";
import { hasValue } from "./templates/helpers";
import { Document, Packer } from "docx";
import type { Passport, PlanXExportData } from "./types";

const TEMPLATES: Record<
  string,
  {
    template: (passport: { data: object }) => Document;
    requirements: string[];
  }
> = {
  blank: {
    template: () => new Document({ sections: [] }),
    requirements: [],
  },
  "LDCE.doc": {
    template: LDCE,
    requirements: [],
  },
  "LDCP.doc": {
    template: LDCP,
    requirements: [
      "applicant.title",
      "applicant.name.first",
      "applicant.name.last",
      "_address.postcode",
    ],
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
  if (!hasRequiredDataForTemplate({ templateName, passport })) {
    throw new Error(`Template "${templateName}" is missing required fields`);
  }
  const template = TEMPLATES[templateName].template;
  const document = template(passport);
  return Packer.toStream(document);
}

export function hasRequiredDataForTemplate({
  templateName,
  passport,
}: {
  templateName: string;
  passport: Passport;
}): boolean {
  const template = TEMPLATES[templateName];
  if (!template) throw new Error(`Template "${templateName}" not found`);
  for (const path of template.requirements) {
    if (!hasValue(passport.data, path)) {
      return false;
    }
  }
  return true;
}

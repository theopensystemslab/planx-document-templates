import React from "react";
import resolvePath from "lodash.get";
import { renderToPipeableStream } from "react-dom/server";
import { SubmissionOverviewDocument } from "./overview/SubmissionOverview";
import { BoundaryMapDocument } from "./map/BoundaryMapDocument";
import { LDCP } from "./templates/LDCP";
import { Document, Packer } from "docx";
import type { Passport, PlanXExportData } from "./types";

const TEMPLATES: Record<
  string,
  {
    template: (passport: { data: unknown }) => Document;
    requirements: string[];
  }
> = {
  blank: {
    template: () => new Document({ sections: [] }),
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
    if (!resolvePath(passport.data, path)) {
      return false;
    }
  }
  return true;
}

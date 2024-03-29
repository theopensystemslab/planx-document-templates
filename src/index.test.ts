import { describe, test, expect } from "vitest";
import {
  hasRequiredDataForTemplate,
  generateDocxTemplateStream,
  generateHTMLOverviewStream,
  generateHTMLMapStream,
} from "./index";

const passport = {
  data: {
    "application.type": "ldc.existing",
  },
};

describe("generateDocxTemplateStream", () => {
  test("it creates a readable stream", () => {
    expect(
      generateDocxTemplateStream({
        templateName: "LDCE",
        passport,
      })
    ).toBeTruthy();
  });

  test("it throws when the required data is not provided", () => {
    expect(() =>
      generateDocxTemplateStream({
        templateName: "LDCE",
        passport: { data: {} },
      })
    ).toThrowError('Template "LDCE" is missing required fields');
  });

  test("it throws when the template is not found", () => {
    expect(() =>
      generateDocxTemplateStream({
        templateName: "blah",
        passport,
      })
    ).toThrowError('Template "blah" not found');
  });
});

describe("generateHTMLMapStream", () => {
  test("it creates a readable stream", () => {
    const geojson = {
      question: "boundary_geojson",
      responses: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-0.7491888117037445, 51.62746573090956],
              [-0.7487475045017631, 51.627460469121615],
              [-0.7490133156060904, 51.627360716173484],
              [-0.7491888117037445, 51.62746573090956],
            ],
          ],
        },
        properties: null,
      },
    };
    expect(generateHTMLMapStream(geojson)).toBeTruthy();
  });
});

describe("generateHTMLOverviewStream", () => {
  test("it creates a readable stream", () => {
    expect(
      generateHTMLOverviewStream([
        { question: "?", responses: { value: "yes" }, metadata: { section_name: "First section" } },
      ])
    ).toBeTruthy();
  });
});

// there are currently no templates with required fields so this is skipped for now
describe("hasRequiredDataForTemplate", () => {
  test("it returns true when the template exists and data is valid", () => {
    expect(
      hasRequiredDataForTemplate({
        templateName: "LDCE",
        passport,
      })
    ).toBe(true);
  });

  test("it returns true when no data is required", () => {
    expect(
      hasRequiredDataForTemplate({
        templateName: "_blank",
        passport: { data: {} },
      })
    ).toBe(true);
  });

  test("it returns false when required data values do not match", () => {
    expect(
      hasRequiredDataForTemplate({
        templateName: "LDCE",
        passport: {
          data: {
            "application.type": "ldc.proposed",
          },
        },
      })
    ).toBe(false);
    expect(
      hasRequiredDataForTemplate({
        templateName: "LDCP",
        passport: {
          data: {
            "application.type": "ldc.existing",
          },
        },
      })
    ).toBe(false);
  });

  test("it returns false when required data is not provided", () => {
    expect(
      hasRequiredDataForTemplate({
        templateName: "LDCE",
        passport: { data: {} },
      })
    ).toBe(false);
  });

  test("it throws when the template is not found", () => {
    expect(() =>
      hasRequiredDataForTemplate({
        templateName: "blah",
        passport,
      })
    ).toThrowError('Template "blah" not found');
  });
});

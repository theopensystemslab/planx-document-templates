import { describe, test, expect } from "vitest";
import {
  hasRequiredDataForTemplate,
  generateDocxTemplateStream,
  generateHTMLOverviewStream,
  generateHTMLMapStream,
} from "./index";

describe("hasRequiredDataForTemplate", () => {
  test("it returns true when the template exists and data is valid", () => {
    expect(
      hasRequiredDataForTemplate({
        templateName: "Lambeth:LDC-E.docx",
        passport: {
          data: {
            name: {
              first: "X",
              last: "Y",
            },
          },
        },
      })
    ).toBe(true);
  });

  test("it returns false when required data is not provided", () => {
    expect(
      hasRequiredDataForTemplate({
        templateName: "Lambeth:LDC-E.docx",
        passport: { data: {} },
      })
    ).toBe(false);
  });

  test("it throws when the template is not found", () => {
    expect(() =>
      hasRequiredDataForTemplate({
        templateName: "blah",
        passport: { data: { name: { first: "X", last: "Y" } } },
      })
    ).toThrowError('Template "blah" not found');
  });
});

describe("generateDocxTemplateStream", () => {
  test("it creates a readable stream", () => {
    expect(
      generateDocxTemplateStream({
        templateName: "Lambeth:LDC-E.docx",
        passport: { data: { name: { first: "X", last: "Y" } } },
      })
    ).toBeTruthy();
  });

  test("it throws when the required data is not provided", () => {
    expect(() =>
      generateDocxTemplateStream({
        templateName: "Lambeth:LDC-E.docx",
        passport: { data: {} },
      })
    ).toThrowError('Template "Lambeth:LDC-E.docx" is missing required fields');
  });

  test("it throws when the template is not found", () => {
    expect(() =>
      generateDocxTemplateStream({
        templateName: "blah",
        passport: { data: { name: { first: "X", last: "Y" } } },
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
        { question: "?", responses: { value: "yes" }, metadata: { q: "a" } },
      ])
    ).toBeTruthy();
  });
});

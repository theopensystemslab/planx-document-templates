import { describe, expect, test } from "vitest";
import { validatePlanXExportData, safeDecodeURI, prettyQuestion, prettyResponse } from "./helpers";

describe("validatePlanXExportData", () => {
  test("null", () => {
    expect(validatePlanXExportData(null)).toBe(false);
  });
  test("undefined", () => {
    expect(validatePlanXExportData(undefined)).toBe(false);
  });
  test("object", () => {
    expect(validatePlanXExportData({})).toBe(false);
  });
  test("empty", () => {
    expect(validatePlanXExportData([])).toBe(false);
  });
  test("empty object", () => {
    expect(validatePlanXExportData([{}])).toBe(false);
  });
  test("invalid", () => {
    expect(
      validatePlanXExportData([
        {
          q: "really?",
          a: "no",
        },
      ])
    ).toBe(false);
  });
  test("mixed", () => {
    expect(
      validatePlanXExportData([
        {
          q: "really?",
          a: "no",
        },
        {
          question: "is it?",
          responses: "yes",
        },
      ])
    ).toBe(false);
  });
  test("valid", () => {
    expect(
      validatePlanXExportData([
        {
          question: "is it?",
          responses: "yes",
        },
      ])
    ).toBe(true);
  });
});

describe("safeDecodeURI", () => {
  test("It handles URI encoded strings", () =>
    expect(
      safeDecodeURI("https://testURL.pizza/file%20with%20spaces.pdf")
    ).toEqual("https://testURL.pizza/file with spaces.pdf"));

  test("It handles non-URI encoded strings", () =>
    expect(safeDecodeURI("50% or less")).toEqual("50% or less"));
});

describe("prettyQuestion", () => {
  test("It leaves original question text and casing in tact", () => 
    expect(prettyQuestion("Do you know the title numbers of the properties?")
  ).toEqual("Do you know the title numbers of the properties?"));

  test("It leaves file upload question text and casing in tact", () => 
    expect(prettyQuestion("File upload: Proposed, Elevation")
  ).toEqual("File upload: Proposed, Elevation"));

  test("It start-cases and splits question text that is machine-readable", () => 
    expect(prettyQuestion("application.fee.reference.govPay")
  ).toEqual("Application Fee Reference Gov Pay"));

  test("It handles questions that have URI-encoded text", () => 
    expect(prettyQuestion("Did you upload 39%20River%20Court%202.jpg?")
  ).toEqual("Did you upload 39 River Court 2.jpg?"));
});

describe("prettyResponse", () => {
  test("It decodes files names", () => 
    expect(prettyResponse("39%20River%20Court%202.jpg")
  ).toEqual("39 River Court 2.jpg"));

  test("It handles the value from a question response", () => 
    expect(prettyResponse([
      {
        "value": "No"
      }
    ])).toEqual("No"));

  test("It decodes file names when they're the value of a question response", () => 
    expect(prettyResponse([
      {
        "value": "39%20River%20Court%202.jpg"
      }
    ])).toEqual("39 River Court 2.jpg"));

  test("It handles many values from a checklist response and inserts line breaks that will be split later", () => 
    expect(prettyResponse([
      {
        "value": "Replace window with window"
      },
      {
        "value": "Replace door with door"
      }
    ])).toEqual("Replace window with window\nReplace door with door"));

  test("It handles number responses", () => 
    expect(prettyResponse(10300)).toEqual(10300));

  test("It handles plain text responses", () => 
    expect(prettyResponse("applicant@test.com")).toEqual("applicant@test.com"));

  test("It handles boolean responses", () => 
    expect(prettyResponse(true)).toEqual("True"));
});

import { describe, expect, test } from "vitest";
import { validatePlanXExportData } from "./helpers";

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

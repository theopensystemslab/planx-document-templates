import { describe, expect, test } from "vitest";
import { validatePlanXExportData } from "./helpers";

describe("validatePlanXExportData", () => {
  test("undefined", () => {
    expect(validatePlanXExportData(undefined)).toBe(false);
  });
  test("empty", () => {
    expect(validatePlanXExportData([])).toBe(false);
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
});

import { expect, test } from "vitest";
import { validatePlanXExportData } from "./helpers";

test("validatePlanXExportData", () => {
  expect(
    validatePlanXExportData([
      {
        question: "is it?",
        responses: "yes",
      },
    ])
  ).toBe(true);
  expect(
    validatePlanXExportData([
      {
        q: "really?",
        a: "no",
      },
    ])
  ).toBe(false);
});

import type { PlanXExportData } from "../types";

export function validatePlanXExportData(data: PlanXExportData[]): boolean {
  return (
    data &&
    data.every((entry: object) => {
      return (
        Object.hasOwn(entry, "question") && Object.hasOwn(entry, "responses")
      );
    })
  );
}

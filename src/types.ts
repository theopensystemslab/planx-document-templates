export interface PlanXExportData {
  question: string;
  responses: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
}

export interface Passport {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

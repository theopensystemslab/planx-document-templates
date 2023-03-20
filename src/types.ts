export interface PlanXExportData {
  question: string;
  responses: unknown;
  metadata?: {
    portal_name?: string;
    section_name?: string;
    policy_refs?: PolicyRefs[];
    flags?: string[];
  };
}

export interface PolicyRefs {
  text: string;
}

export interface Passport {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export interface ResponseObject {
  value: string;
  metadata?: {
      flags?: string[];
  }
};

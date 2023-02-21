export interface PlanXExportData {
    question: string;
    responses: unknown;
    metadata?: any;
}
export interface Passport {
    data: Record<string, any>;
}
export interface ResponseObject {
    value: string;
    metadata?: {
        flags?: string[];
    };
}

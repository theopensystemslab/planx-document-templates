export interface PlanXExportData {
    question: string;
    responses: string | number | ResponseObject[] | Record<string, any> | any;
    metadata?: NodeMetadata | string;
}
type ResponseObject = {
    value: string;
    metadata?: {
        flags?: string[];
    };
};
type NodeMetadata = {
    auto_answered?: boolean;
    portal_name?: string;
    policy_refs?: Record<string, any>[];
};
export interface Passport {
    data: Record<string, any>;
}
export {};

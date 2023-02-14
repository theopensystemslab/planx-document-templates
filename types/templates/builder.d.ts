import { Document } from "docx";
export type TemplateData = {
    presets: {
        title: string;
        subtitle: string;
    };
    sections: TemplateDataSection[];
};
export type TemplateDataSection = {
    title: string;
    fields: TemplateDataField[];
};
export type TemplateDataField = {
    name: string;
    value: string;
};
export declare function buildFormTemplate(data: TemplateData): Document;

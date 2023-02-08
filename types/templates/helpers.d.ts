export declare function hasValue(data: object, path: string): boolean;
export declare function getString(data: object, path: string): string;
export declare function getStrings(data: object, path: string): string[];
export declare function getBoolean(data: object, path: string): boolean;
export declare function applyRedactions(data: {
    data: object;
}, redactions?: string[] | undefined): {
    data: object;
};

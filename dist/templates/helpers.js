"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoolean = exports.getStrings = exports.getString = exports.hasValue = void 0;
/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint @typescript-eslint/no-unsafe-assignment: "off" */
function hasValue(data, path) {
    const value = get(data, path) || false;
    return !!value;
}
exports.hasValue = hasValue;
function getString(data, path) {
    const value = get(data, path) || "";
    if (Array.isArray(value)) {
        return value[0] ? String(value[0]) : "";
    }
    return String(value);
}
exports.getString = getString;
function getStrings(data, path) {
    const values = get(data, path) || [];
    if (Array.isArray(values)) {
        return values.map((x) => String(x));
    }
    return [];
}
exports.getStrings = getStrings;
function getBoolean(data, path) {
    const value = get(data, path);
    if (Array.isArray(value) && value.length === 1) {
        return value[0] === true || value[0] === "true";
    }
    return value === true || value === "true";
}
exports.getBoolean = getBoolean;
// recursively find key by name (i.e. data["a.b.c"], data["a.b"], data["a"])
function get(data, path, index = -1) {
    const parts = path.split(".");
    if (index === -1) {
        index = parts.length;
    }
    const key = parts.slice(0, index).join(".");
    if (!data[key] && index > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return get(data, path, --index);
    }
    if (data[key] && parts.slice(index).length > 0) {
        const newPath = parts.slice(index).join(".");
        // eslint-disable-next-line
        return get(data[key], newPath);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data[key];
}

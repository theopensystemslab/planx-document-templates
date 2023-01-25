"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const helpers_1 = require("./helpers");
(0, vitest_1.describe)("Passport helper functions", () => {
    (0, vitest_1.describe)("hasValue", () => {
        (0, vitest_1.test)("it accesses data from a simple object", () => {
            const data = {
                a: {
                    b: "it works",
                },
            };
            (0, vitest_1.expect)((0, helpers_1.hasValue)(data, "a.b")).toEqual(true);
        });
        (0, vitest_1.test)("it accesses data from nested keys", () => {
            const data = {
                a: {
                    "b.c": {
                        d: {
                            "e.f.g": "it works",
                        },
                    },
                },
            };
            (0, vitest_1.expect)((0, helpers_1.hasValue)(data, "a.b.c.d.e.f.g")).toEqual(true);
        });
        (0, vitest_1.test)("it returns false when the value is not found", () => {
            const data = {
                a: {
                    b: "it works",
                },
            };
            (0, vitest_1.expect)((0, helpers_1.hasValue)(data, "a.b.c")).toEqual(false);
        });
    });
    (0, vitest_1.describe)("getString", () => {
        (0, vitest_1.test)("it accesses data from a simple object", () => {
            const data = {
                a: {
                    b: "it works",
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getString)(data, "a.b")).toEqual("it works");
        });
        (0, vitest_1.test)("it accesses data from nested keys", () => {
            const data = {
                a: {
                    "b.c": {
                        d: {
                            "e.f.g": "it works",
                        },
                    },
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getString)(data, "a.b.c.d.e.f.g")).toEqual("it works");
        });
        (0, vitest_1.test)("it unwraps array values", () => {
            const data = {
                a: {
                    "b.c": ["it works"],
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getString)(data, "a.b.c")).toEqual("it works");
        });
        (0, vitest_1.test)("it handles empty values", () => {
            const data = {
                a: {
                    "b.c": "",
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getString)(data, "a.b.c")).toEqual("");
        });
        (0, vitest_1.test)("it handles missing values", () => {
            const data = { a: {} };
            (0, vitest_1.expect)((0, helpers_1.getString)(data, "a.b.c")).toEqual("");
        });
        (0, vitest_1.test)("it handles numbers", () => {
            const data = { a: 123 };
            (0, vitest_1.expect)((0, helpers_1.getString)(data, "a")).toEqual("123");
        });
    });
    (0, vitest_1.describe)("getStrings", () => {
        (0, vitest_1.test)("it accesses data from a simple object", () => {
            const data = {
                a: {
                    b: ["it", "works"],
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getStrings)(data, "a.b")).toEqual(["it", "works"]);
        });
        (0, vitest_1.test)("it accesses data from nested keys", () => {
            const data = {
                a: {
                    "b.c": {
                        d: {
                            "e.f.g": ["it", "works"],
                        },
                    },
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getStrings)(data, "a.b.c.d.e.f.g")).toEqual(["it", "works"]);
        });
        (0, vitest_1.test)("it handles empty values", () => {
            const data = {
                a: {
                    "b.c": [],
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getStrings)(data, "a.b.c")).toEqual([]);
        });
        (0, vitest_1.test)("it handles missing values", () => {
            const data = { a: {} };
            (0, vitest_1.expect)((0, helpers_1.getStrings)(data, "a.b.c")).toEqual([]);
        });
        (0, vitest_1.test)("it handles numbers", () => {
            const data = { a: [1, "2", 3] };
            (0, vitest_1.expect)((0, helpers_1.getStrings)(data, "a")).toEqual(["1", "2", "3"]);
        });
    });
    (0, vitest_1.describe)("getBoolean", () => {
        (0, vitest_1.test)("it accesses data from nested keys", () => {
            const data = {
                a: {
                    "b.c": {
                        d: {
                            "e.f.g": "true",
                        },
                    },
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getBoolean)(data, "a.b.c.d.e.f.g")).toEqual(true);
        });
        (0, vitest_1.test)("it unwraps array values", () => {
            const data = {
                a: {
                    "b.c": ["true"],
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getBoolean)(data, "a.b.c")).toEqual(true);
        });
        (0, vitest_1.test)("it handles empty values", () => {
            const data = {
                a: {
                    "b.c": "",
                },
            };
            (0, vitest_1.expect)((0, helpers_1.getBoolean)(data, "a.b.c")).toEqual(false);
        });
        (0, vitest_1.test)("it handles missing values", () => {
            const data = { a: {} };
            (0, vitest_1.expect)((0, helpers_1.getBoolean)(data, "a.b.c")).toEqual(false);
        });
        (0, vitest_1.test)("it returns false when encountering multiple values", () => {
            const data = { a: ["true", "true"] };
            (0, vitest_1.expect)((0, helpers_1.getBoolean)(data, "a")).toEqual(false);
        });
    });
});

import { describe, expect, test } from "vitest";
import { hasValue, getString, getStrings, getBoolean } from "./helpers";

describe("Passport helper functions", () => {
  describe("hasValue", () => {
    test("it accesses data from a simple object", () => {
      const data = {
        a: {
          b: "it works",
        },
      };
      expect(hasValue(data, "a.b")).toEqual(true);
    });
    test("it accesses data from nested keys", () => {
      const data = {
        a: {
          "b.c": {
            d: {
              "e.f.g": "it works",
            },
          },
        },
      };
      expect(hasValue(data, "a.b.c.d.e.f.g")).toEqual(true);
    });
    test("it returns false when the value is not found", () => {
      const data = {
        a: {
          b: "it works",
        },
      };
      expect(hasValue(data, "a.b.c")).toEqual(false);
    });
  });

  describe("getString", () => {
    test("it accesses data from a simple object", () => {
      const data = {
        a: {
          b: "it works",
        },
      };
      expect(getString(data, "a.b")).toEqual("it works");
    });
    test("it accesses data from nested keys", () => {
      const data = {
        a: {
          "b.c": {
            d: {
              "e.f.g": "it works",
            },
          },
        },
      };
      expect(getString(data, "a.b.c.d.e.f.g")).toEqual("it works");
    });
    test("it unwraps array values", () => {
      const data = {
        a: {
          "b.c": ["it works"],
        },
      };
      expect(getString(data, "a.b.c")).toEqual("it works");
    });
    test("it handles empty values", () => {
      const data = {
        a: {
          "b.c": "",
        },
      };
      expect(getString(data, "a.b.c")).toEqual("");
    });
    test("it handles missing values", () => {
      const data = { a: {} };
      expect(getString(data, "a.b.c")).toEqual("");
    });
    test("it handles numbers", () => {
      const data = { a: 123 };
      expect(getString(data, "a")).toEqual("123");
    });
  });

  describe("getStrings", () => {
    test("it accesses data from a simple object", () => {
      const data = {
        a: {
          b: ["it", "works"],
        },
      };
      expect(getStrings(data, "a.b")).toEqual(["it", "works"]);
    });
    test("it accesses data from nested keys", () => {
      const data = {
        a: {
          "b.c": {
            d: {
              "e.f.g": ["it", "works"],
            },
          },
        },
      };
      expect(getStrings(data, "a.b.c.d.e.f.g")).toEqual(["it", "works"]);
    });
    test("it handles empty values", () => {
      const data = {
        a: {
          "b.c": [],
        },
      };
      expect(getStrings(data, "a.b.c")).toEqual([]);
    });
    test("it handles missing values", () => {
      const data = { a: {} };
      expect(getStrings(data, "a.b.c")).toEqual([]);
    });
    test("it handles numbers", () => {
      const data = { a: [1, "2", 3] };
      expect(getStrings(data, "a")).toEqual(["1", "2", "3"]);
    });
  });

  describe("getBoolean", () => {
    test("it accesses data from nested keys", () => {
      const data = {
        a: {
          "b.c": {
            d: {
              "e.f.g": "true",
            },
          },
        },
      };
      expect(getBoolean(data, "a.b.c.d.e.f.g")).toEqual(true);
    });
    test("it unwraps array values", () => {
      const data = {
        a: {
          "b.c": ["true"],
        },
      };
      expect(getBoolean(data, "a.b.c")).toEqual(true);
    });
    test("it handles empty values", () => {
      const data = {
        a: {
          "b.c": "",
        },
      };
      expect(getBoolean(data, "a.b.c")).toEqual(false);
    });
    test("it handles missing values", () => {
      const data = { a: {} };
      expect(getBoolean(data, "a.b.c")).toEqual(false);
    });
    test("it returns false when encountering multiple values", () => {
      const data = { a: ["true", "true"] };
      expect(getBoolean(data, "a")).toEqual(false);
    });
  });
});

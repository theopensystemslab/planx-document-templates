import { describe, expect, test } from "vitest";
import {
  hasValue,
  getString,
  getStrings,
  getBoolean,
  applyRedactions,
} from "./helpers";

describe("Passport helper functions", () => {
  describe("applyRedactions", () => {
    test("it filters out redacted keys", () => {
      const data = {
        data: {
          a: {
            "b.c": {
              d: {
                "e.f.g": 0,
                h: 1,
                i: 2,
                j: 3,
              },
            },
          },
        },
      };
      const redactions = ["a.b.c.d.e.f.g", "a.b.c.d.i"];
      const expected = {
        data: {
          a: {
            "b.c": {
              d: {
                "e.f.g": null,
                h: 1,
                i: null,
                j: 3,
              },
            },
          },
        },
      };
      expect(applyRedactions(data, redactions)).toEqual(expected);
    });
    test("it applies redactions to deeply nested objects", () => {
      const data = {
        data: {
          a: {
            b: {
              c: {
                d: "abc",
              },
            },
          },
          "x.y.z": {
            list: [1, 2, 3],
          },
        },
      };
      const expected = {
        data: {
          a: {
            b: null,
          },
          "x.y.z": null,
        },
      };
      const redactions = ["a.b", "x.y.z"];
      expect(applyRedactions(data, redactions)).toEqual(expected);
    });
    test("it does nothing when the redacted values are not found", () => {
      const data = {
        data: {
          a: null,
          "x.y.z": null,
        },
      };
      const redactions = ["a.b", "c.d", "x.y.z"];
      expect(applyRedactions(data, redactions)).toEqual(data);
    });
    test("it does nothing for an empty set of redactions", () => {
      const data = {
        data: { a: { "b.c": 123 } },
      };
      expect(applyRedactions(data, [])).toEqual(data);
    });
    test("it does nothing for an undefined set of redactions", () => {
      const data = {
        data: { a: { "b.c": 123 } },
      };
      expect(applyRedactions(data, undefined)).toEqual(data);
    });
  });

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
    test("it returns false when the value is an empty string", () => {
      const data = {
        a: {
          b: "",
        },
      };
      expect(hasValue(data, "a.b")).toEqual(false);
    });
    test("it returns true when a falsy value is found", () => {
      const data = {
        a: {
          b: 0,
          c: false,
        },
      };
      expect(hasValue(data, "a.b")).toEqual(true);
      expect(hasValue(data, "a.c")).toEqual(true);
    });
  });

  describe("getString", () => {
    test("it accesses data from a simple object", () => {
      const data = {
        a: {
          b: "it works",
          c: "yes it does",
        },
      };
      expect(getString(data, "a.b")).toEqual("it works");
      expect(getString(data, "a.c")).toEqual("yes it does");
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
    test("it unwraps and concatanates array values", () => {
      const data = {
        a: {
          b: ["it", "works"],
          c: ["Yes"],
        },
      };
      expect(getString(data, "a.b")).toEqual("it, works");
      expect(getString(data, "a.c")).toEqual("Yes");
    });
    test("it returns an empty string when accessing empty values", () => {
      const data = {
        a: {
          "b.c": "",
          d: [],
          e: null,
          f: undefined,
        },
      };
      expect(getString(data, "a.b.c")).toEqual("");
      expect(getString(data, "a.d")).toEqual("");
      expect(getString(data, "a.e")).toEqual("");
      expect(getString(data, "a.e.x.y")).toEqual("");
      expect(getString(data, "a.f")).toEqual("");
    });
    test("it returns an empty string when accessing non-existent values", () => {
      const data = {
        a: {
          b: null,
        },
        x: "y",
      };
      expect(getString(data, "a.y")).toEqual("");
      expect(getString(data, "a.b")).toEqual("");
      expect(getString(data, "a.b.c")).toEqual("");
      expect(getString(data, "h.i.j")).toEqual("");
      expect(getString(data, "x.y.z")).toEqual("");
    });
    test("it returns an empty string when accessing missing values", () => {
      const data = { a: {} };
      expect(getString(data, "a.b.c")).toEqual("");
    });
    test("it handles numbers including zero", () => {
      const data = { a: 123, b: 0 };
      expect(getString(data, "a")).toEqual("123");
      expect(getString(data, "b")).toEqual("0");
    });
    test("it returns an empty string when the path cannot be parsed", () => {
      const data = { a: { b: 1 } };
      expect(getString(data, "a[9].b")).toEqual("");
      expect(getString(data, "a.*")).toEqual("");
    });
  });

  describe("getStrings", () => {
    test("it accesses data from a simple object", () => {
      const data = {
        a: {
          b: ["it", "works"],
          c: ["Yes"],
        },
      };
      expect(getStrings(data, "a.b")).toEqual(["it", "works"]);
      expect(getStrings(data, "a.c")).toEqual(["Yes"]);
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
      const data = { a: [1, "2", 0] };
      expect(getStrings(data, "a")).toEqual(["1", "2", "0"]);
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

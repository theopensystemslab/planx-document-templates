"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const resolvePath = require("lodash.get");
const server = require("react-dom/server");
const docx = require("docx");
const React = require("react");
const prettyTitle = require("lodash.startcase");
const styled = require("@emotion/styled");
const jsxRuntime = require("react/jsx-runtime");
const Grid = require("@mui/material/Grid");
const react = require("@emotion/react");
const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const resolvePath__default = /* @__PURE__ */ _interopDefaultLegacy(resolvePath);
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const prettyTitle__default = /* @__PURE__ */ _interopDefaultLegacy(prettyTitle);
const styled__default = /* @__PURE__ */ _interopDefaultLegacy(styled);
const jsxRuntime__namespace = /* @__PURE__ */ _interopNamespace(jsxRuntime);
const Grid__default = /* @__PURE__ */ _interopDefaultLegacy(Grid);
const jsx = jsxRuntime__namespace.jsx;
const jsxs = jsxRuntime__namespace.jsxs;
function DataItem(props) {
  const Item = styled__default.default.div`
    padding: 1em 0;
    border-top: 1px solid #00000022;
    break-inside: avoid;
  `;
  const Title = styled__default.default.p`
    margin: 0 0 1em 0;
    font-weight: bold;
  `;
  const checkDataItemProps = (props2) => {
    return Object.hasOwn(props2, "title") && Object.hasOwn(props2, "details");
  };
  if (checkDataItemProps(props)) {
    return /* @__PURE__ */ jsxs(Item, {
      children: [/* @__PURE__ */ jsx(Title, {
        children: prettyTitle__default.default(props.title)
      }), /* @__PURE__ */ jsx(Details, {
        data: props.details
      })]
    });
  }
  return /* @__PURE__ */ jsx("p", {
    children: "[error]"
  });
}
function Details(props) {
  const Empty = styled__default.default.span`
    color: #00000033;
  `;
  const {
    data
  } = props;
  if (data === null) {
    return /* @__PURE__ */ jsx(Empty, {
      children: "[none]"
    });
  }
  if (data === void 0) {
    return /* @__PURE__ */ jsx(Empty, {
      children: "[empty]"
    });
  }
  if (typeof data === "boolean") {
    return /* @__PURE__ */ jsx("span", {
      children: data ? "true" : "false"
    });
  }
  if (typeof data === "number") {
    return /* @__PURE__ */ jsx("span", {
      children: data
    });
  }
  if (typeof data === "string") {
    return /* @__PURE__ */ jsx("span", {
      children: decodeURI(data)
    });
  }
  if (Array.isArray(data)) {
    return List(data);
  }
  if (typeof data === "object") {
    return Tree(data);
  }
  return /* @__PURE__ */ jsx("p", {
    children: `[error: Unknown detail format for ${typeof data}]`
  });
}
function List(details) {
  if (isListOfNumbersOrStrings(details)) {
    return /* @__PURE__ */ jsx(Details, {
      data: `[${details.join(", ")}]`
    });
  }
  if (isListOfObjectsWithOneKey(details, "value")) {
    if (details.length === 1) {
      return /* @__PURE__ */ jsx(Details, {
        data: details[0]["value"]
      });
    }
    details = details.map((d) => d["value"]);
  }
  return /* @__PURE__ */ jsx("ul", {
    children: details.map((item) => /* @__PURE__ */ jsx("li", {
      children: /* @__PURE__ */ jsx(Details, {
        data: item
      })
    }, JSON.stringify(item)))
  });
}
function Tree(details) {
  return /* @__PURE__ */ jsx("ul", {
    children: Object.keys(details).sort().map((key) => /* @__PURE__ */ jsxs("li", {
      children: [/* @__PURE__ */ jsx("strong", {
        children: prettyTitle__default.default(key)
      }), ": ", /* @__PURE__ */ jsx(Details, {
        data: details[key]
      })]
    }, key))
  });
}
function isListOfNumbersOrStrings(list) {
  return list.every((d) => typeof d === "number" || typeof d === "string");
}
function isListOfObjectsWithOneKey(list, key) {
  return list.every(
    (d) => typeof d === "object" && Object.keys(d).every((k) => k === key)
  );
}
function validatePlanXExportData(data) {
  return Array.isArray(data) && data.length > 0 && data.every((entry) => {
    return Object.hasOwn(entry, "question") && Object.hasOwn(entry, "responses");
  });
}
function SubmissionOverviewDocument(props) {
  return /* @__PURE__ */ jsxs("html", {
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("title", {
        children: "PlanX Submission Overview"
      })]
    }), /* @__PURE__ */ jsx("body", {
      children: /* @__PURE__ */ jsx(SubmissionOverview, {
        data: props.data
      })
    })]
  });
}
function SubmissionOverview(props) {
  return /* @__PURE__ */ jsxs(React__namespace.Fragment, {
    children: [/* @__PURE__ */ jsx(Styles$1, {}), /* @__PURE__ */ jsxs(Grid__default.default, {
      container: true,
      spacing: 2,
      direction: "row-reverse",
      sx: {
        justifyContent: "center",
        minWidth: "650px",
        maxWidth: "1400px",
        padding: "0 1em",
        margin: "auto"
      },
      children: [/* @__PURE__ */ jsx(Grid__default.default, {
        item: true,
        xs: 12,
        children: /* @__PURE__ */ jsx("h1", {
          style: {
            textAlign: "center"
          },
          children: "PlanX Submission Overview"
        })
      }), /* @__PURE__ */ jsxs(Grid__default.default, {
        item: true,
        xs: 12,
        md: 6,
        sx: {
          paddingTop: 0
        },
        children: [/* @__PURE__ */ jsx("h2", {
          children: "Data"
        }), /* @__PURE__ */ jsx(DataList, {
          data: props.data
        })]
      })]
    })]
  });
}
function Styles$1() {
  return /* @__PURE__ */ jsx(react.Global, {
    styles: react.css`
        @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
        body {
          font-family: "Inter", arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 18px;
          font-size: 1.125rem;
        }
      `
  });
}
function DataList(props) {
  const hasValidDataStructure = validatePlanXExportData(props.data);
  return /* @__PURE__ */ jsxs(React__namespace.Fragment, {
    children: [hasValidDataStructure ? props.data.map((item, index) => {
      const {
        question,
        responses
      } = item;
      return /* @__PURE__ */ jsx(DataItem, {
        title: question,
        details: responses
      }, index);
    }) : /* @__PURE__ */ jsx("p", {
      children: "Data not available"
    }), " "]
  });
}
function Map(props) {
  return /* @__PURE__ */ jsx("my-map", {
    showNorthArrow: true,
    showScale: true,
    hideResetControl: true,
    useScaleBarStyle: true,
    geojsonData: JSON.stringify(props.boundary)
  });
}
function BoundaryMapDocument(props) {
  return /* @__PURE__ */ jsxs("html", {
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("script", {
        src: "https://cdn.jsdelivr.net/npm/@opensystemslab/map"
      }), /* @__PURE__ */ jsx("title", {
        children: "PlanX Submission Boundary"
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Styles, {}), /* @__PURE__ */ jsx("h1", {
        children: "Boundary"
      }), /* @__PURE__ */ jsx(Map, {
        boundary: props.geojson
      })]
    })]
  });
}
function Styles() {
  return /* @__PURE__ */ jsx(react.Global, {
    styles: react.css`
        @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
        body {
          font-family: "Inter", arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 18px;
          font-size: 1.125rem;
        }
      `
  });
}
const LambethLDCETemplate = new docx.Document({
  background: {
    color: "C45911"
  },
  sections: [
    {
      children: [
        new docx.Paragraph({
          children: [new docx.TextRun("LDC-E")]
        })
      ]
    }
  ]
});
const LambethLDCPTemplate = new docx.Document({
  background: {
    color: "F459A1"
  },
  sections: [
    {
      children: [
        new docx.Paragraph({
          children: [new docx.TextRun("LDC-P")]
        })
      ]
    }
  ]
});
const TEMPLATES = {
  "Lambeth:LDC-P.docx": {
    template: LambethLDCPTemplate,
    requirements: ["name.first", "name.last"]
  },
  "Lambeth:LDC-E.docx": {
    template: LambethLDCETemplate,
    requirements: ["name.first", "name.last"]
  }
};
function generateHTMLOverviewStream(planXExportData) {
  return server.renderToPipeableStream(/* @__PURE__ */ jsx(SubmissionOverviewDocument, {
    data: planXExportData
  }));
}
function generateHTMLMapStream(geojson) {
  return server.renderToPipeableStream(/* @__PURE__ */ jsx(BoundaryMapDocument, {
    geojson
  }));
}
function generateDocxTemplateStream(args) {
  if (!hasRequiredDataForTemplate(args)) {
    throw new Error(`Template "${args.templateName}" is missing required fields`);
  }
  const template = TEMPLATES[args.templateName].template;
  return docx.Packer.toStream(template);
}
function hasRequiredDataForTemplate(args) {
  const template = TEMPLATES[args.templateName];
  if (!template)
    throw new Error(`Template "${args.templateName}" not found`);
  for (const path of template.requirements) {
    if (!resolvePath__default.default(args.passport.data, path)) {
      return false;
    }
  }
  return true;
}
exports.generateDocxTemplateStream = generateDocxTemplateStream;
exports.generateHTMLMapStream = generateHTMLMapStream;
exports.generateHTMLOverviewStream = generateHTMLOverviewStream;
exports.hasRequiredDataForTemplate = hasRequiredDataForTemplate;

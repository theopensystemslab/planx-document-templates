import resolvePath from "lodash.get";
import { renderToPipeableStream } from "react-dom/server";
import { Document, Paragraph, TextRun, Packer } from "docx";
import * as React from "react";
import prettyTitle from "lodash.startcase";
import styled from "@emotion/styled";
import * as jsxRuntime from "react/jsx-runtime";
import Grid from "@mui/material/Grid";
import { Global, css } from "@emotion/react";
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function DataItem(props) {
  const Item = styled.div`
    padding: 1em 0;
    border-top: 1px solid #00000022;
    break-inside: avoid;
  `;
  const Title = styled.p`
    margin: 0 0 1em 0;
    font-weight: bold;
  `;
  const checkDataItemProps = (props2) => {
    return Object.hasOwn(props2, "title") && Object.hasOwn(props2, "details");
  };
  if (checkDataItemProps(props)) {
    return /* @__PURE__ */ jsxs(Item, {
      children: [/* @__PURE__ */ jsx(Title, {
        children: prettyTitle(props.title)
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
  const Empty = styled.span`
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
        children: prettyTitle(key)
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
  return data && data.every((entry) => {
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
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx(Styles$1, {}), /* @__PURE__ */ jsxs(Grid, {
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
      children: [/* @__PURE__ */ jsx(Grid, {
        item: true,
        xs: 12,
        children: /* @__PURE__ */ jsx("h1", {
          style: {
            textAlign: "center"
          },
          children: "PlanX Submission Overview"
        })
      }), /* @__PURE__ */ jsxs(Grid, {
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
  return /* @__PURE__ */ jsx(Global, {
    styles: css`
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
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [hasValidDataStructure ? props.data.map((entry, index) => /* @__PURE__ */ jsx(DataItem, {
      title: entry.question,
      details: entry.responses
    }, index)) : /* @__PURE__ */ jsx("p", {
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
  return /* @__PURE__ */ jsx(Global, {
    styles: css`
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
const LambethLDCETemplate = new Document({
  background: {
    color: "C45911"
  },
  sections: [
    {
      children: [
        new Paragraph({
          children: [new TextRun("LDC-E")]
        })
      ]
    }
  ]
});
const LambethLDCPTemplate = new Document({
  background: {
    color: "F459A1"
  },
  sections: [
    {
      children: [
        new Paragraph({
          children: [new TextRun("LDC-P")]
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
  return renderToPipeableStream(/* @__PURE__ */ jsx(SubmissionOverviewDocument, {
    data: planXExportData
  }));
}
function generateHTMLMapStream(geojson) {
  return renderToPipeableStream(/* @__PURE__ */ jsx(BoundaryMapDocument, {
    geojson
  }));
}
function generateDocxTemplateStream(args) {
  if (!hasRequiredDataForTemplate(args)) {
    throw new Error(`Template "${args.templateName}" is missing required fields`);
  }
  const template = TEMPLATES[args.templateName].template;
  return Packer.toStream(template);
}
function hasRequiredDataForTemplate(args) {
  const template = TEMPLATES[args.templateName];
  if (!template)
    throw new Error(`Template "${args.templateName}" not found`);
  for (const path of template.requirements) {
    if (!resolvePath(args.passport.data, path)) {
      return false;
    }
  }
  return true;
}
export {
  generateDocxTemplateStream,
  generateHTMLMapStream,
  generateHTMLOverviewStream,
  hasRequiredDataForTemplate
};

"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const server = require("react-dom/server");
const React = require("react");
const prettyTitle = require("lodash.startcase");
const styled = require("@emotion/styled");
const jsxRuntime = require("react/jsx-runtime");
const Grid = require("@mui/material/Grid");
const react = require("@emotion/react");
const docx = require("docx");
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
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const prettyTitle__default = /* @__PURE__ */ _interopDefaultLegacy(prettyTitle);
const styled__default = /* @__PURE__ */ _interopDefaultLegacy(styled);
const jsxRuntime__namespace = /* @__PURE__ */ _interopNamespace(jsxRuntime);
const Grid__default = /* @__PURE__ */ _interopDefaultLegacy(Grid);
function validatePlanXExportData(data) {
  return Array.isArray(data) && data.length > 0 && data.every((entry) => {
    return Object.hasOwn(entry, "question") && Object.hasOwn(entry, "responses");
  });
}
function safeDecodeURI(data) {
  try {
    return decodeURI(data);
  } catch (error) {
    return data;
  }
}
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
      children: safeDecodeURI(data)
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
function hasValue(data, path) {
  const value = get(data, path) || false;
  return !!value;
}
function getString(data, path) {
  const value = get(data, path) || "";
  if (Array.isArray(value)) {
    return value[0] ? String(value[0]) : "";
  }
  return String(value);
}
function getBoolean(data, path) {
  const value = get(data, path);
  if (Array.isArray(value) && value.length === 1) {
    return value[0] === true || value[0] === "true";
  }
  return value === true || value === "true";
}
function get(data, path, index = -1) {
  const parts = path.split(".");
  if (index === -1) {
    index = parts.length;
  }
  const key = parts.slice(0, index).join(".");
  if (!data[key] && index > 0) {
    return get(data, path, --index);
  }
  if (data[key] && parts.slice(index).length > 0) {
    const newPath = parts.slice(index).join(".");
    return get(data[key], newPath);
  }
  return data[key];
}
function buildFormTemplate(data) {
  const heading = [
    new docx.Paragraph({
      heading: docx.HeadingLevel.HEADING_1,
      children: [new docx.TextRun(data.presets.title)]
    }),
    new docx.Paragraph({
      heading: docx.HeadingLevel.HEADING_2,
      children: [new docx.TextRun(data.presets.subtitle)]
    })
  ];
  const fieldBuilder = (field) => {
    return new docx.TableRow({
      children: [
        new docx.TableCell({
          children: [new docx.Paragraph(field.name)]
        }),
        new docx.TableCell({
          children: [new docx.Paragraph(field.value)]
        })
      ]
    });
  };
  const sectionBuilder = (section) => {
    const formSectionTitle = new docx.TextRun(section.title);
    const formSectionRows = section.fields.map(fieldBuilder);
    const formSection = [
      new docx.Paragraph({
        heading: docx.HeadingLevel.HEADING_2,
        children: [formSectionTitle]
      }),
      new docx.Table({
        rows: formSectionRows,
        margins: {
          marginUnitType: docx.WidthType.PERCENTAGE,
          top: 1,
          bottom: 1,
          left: 1,
          right: 1
        },
        width: {
          size: 100,
          type: docx.WidthType.PERCENTAGE
        }
      })
    ];
    return formSection;
  };
  return new docx.Document({
    creator: "PlanX",
    title: data.presets.title,
    styles: {
      default: {
        heading1: {
          run: {
            font: "Arial",
            size: 28,
            bold: true,
            color: "000000"
          },
          paragraph: {
            alignment: docx.AlignmentType.CENTER,
            spacing: {
              after: 120
            }
          }
        },
        heading2: {
          run: {
            font: "Arial",
            size: 24,
            bold: true,
            color: "000000"
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120
            }
          }
        },
        heading3: {
          run: {
            font: "Arial",
            size: 22,
            bold: true,
            color: "000000"
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120
            }
          }
        }
      }
    },
    sections: [
      {
        children: data.sections.map(sectionBuilder).reduce((acc, val) => [...acc, ...val], [...heading])
      }
    ]
  });
}
function LDCETemplate(passport) {
  const get2 = (path) => {
    return getString(passport.data, path);
  };
  const getBoolean$1 = (path) => {
    return getBoolean(passport.data, path);
  };
  return buildFormTemplate({
    presets: {
      title: "Application for a Lawful Development Certificate - Existing",
      subtitle: "Town and Country Planning Act 1990: Section 191 as amended by section 10 of the Planning and Compensation Act 1991. Town and Country Planning (Development Management Procedure) (England) Order 2015"
    },
    sections: [
      {
        title: "1. Applicant Name and Address",
        fields: [
          {
            name: "Name",
            value: `${get2("applicant.name.first")} ${get2(
              "applicant.name.last"
            )}`
          },
          {
            name: "Address",
            value: get2("applicant.address.singleLine")
          }
        ]
      },
      {
        title: "2. Agent Name and Address",
        fields: [
          {
            name: "Is there an agent?",
            value: getBoolean$1("applicant.agent.exists") ? "Yes" : "No"
          },
          {
            name: "Agent name",
            value: `${get2("applicant.agent.name.first")} ${get2(
              "applicant.agent.name.last"
            )}`
          },
          {
            name: "Agent address",
            value: get2("applicant.agent.address.singleLine")
          }
        ]
      },
      {
        title: "3. Site Address details",
        fields: [
          {
            name: "Is the applicant\u2019s address the same as the site address?",
            value: get2("applicant.address.sameAsSiteAddress")
          },
          {
            name: "Site address",
            value: get2("property.address.singleLine")
          }
        ]
      },
      {
        title: "4. Pre-application advice",
        fields: [
          {
            name: "Has assistance or prior advice been sought from the local authority about this application?",
            value: "Yes"
          },
          {
            name: "Officer name",
            value: get2("application.preApp.officer")
          },
          {
            name: "Pre-app reference",
            value: get2("application.preApp.reference")
          },
          {
            name: "Date",
            value: get2("application.preApp.data")
          },
          {
            name: "Details of advice received",
            value: get2("application.preApp.summary")
          }
        ]
      },
      {
        title: "5. Interest in Land",
        fields: [
          {
            name: "What is the applicant\u2019s interest in the land?",
            value: get2("applicant.landInterest")
          },
          {
            name: "If applicant is not the owner, do they know any owners?",
            value: get2("property.owners.notified")
          },
          {
            name: "Have other owners been informed in writing about the application",
            value: get2("applicant.landInterest.ownerInformed")
          },
          {
            name: "If they have not been informed of the application, please explain why not",
            value: get2("property.owners.notificationReason")
          },
          {
            name: "Names of other owners",
            value: [
              get2("applicant.ownership.certificateB.owner1.name"),
              get2("applicant.ownership.certificateB.owner2.name"),
              get2("applicant.ownership.certificateB.multipleOwners")
            ].filter((value) => value && value !== "").join(", ")
          },
          {
            name: "Address of other owners",
            value: [
              get2("applicant.ownership.certificateB.owner1.address"),
              get2("applicant.ownership.certificateB.owner2.address"),
              get2("applicant.ownership.certificateB.multipleOwners.address")
            ].filter((value) => value && value !== "").join(", ")
          }
        ]
      },
      {
        title: "6. Authority employee / member",
        fields: [
          {
            name: "Do any of these statements apply to you?",
            value: get2("application.declaration.connection")
          },
          {
            name: "If Yes, please provide details of the name, role, and how you are related to them",
            value: get2("application.declaration.connection.description")
          }
        ]
      },
      {
        title: "7. Description of Use, Building Works or Activity",
        fields: [
          {
            name: "Which of these do you need a lawful application certificate for?",
            value: get2("application.basis")
          },
          {
            name: "If Yes to an existing use, please state which of the Use Classes the use relates to",
            value: get2("proposal.use")
          },
          {
            name: "What is the existing site use(s) for which the certificate of lawfulness is being sought? Please fully describe each use and state which part of the land the use relates to",
            value: get2("proposal.changeOfUse.details")
          }
        ]
      },
      {
        title: "8. Description of Existing Use, Building Works or Activity ",
        fields: [
          {
            name: "",
            value: get2("")
          }
        ]
      },
      {
        title: "9. Grounds for Application for a Lawful Development Certificate ",
        fields: [{ name: "", value: get2("") }]
      },
      {
        title: "10. Information in Support of a Lawful Development Certificate",
        fields: [{ name: "", value: get2("") }]
      },
      {
        title: "11. Additional Information Requirements of the Mayor of London",
        fields: [{ name: "", value: get2("") }]
      },
      {
        title: "12. Declaration",
        fields: [{ name: "", value: get2("") }]
      },
      {
        title: "13. Applicant contact details",
        fields: [{ name: "", value: get2("") }]
      },
      {
        title: "14. Agent contact details",
        fields: [{ name: "", value: get2("") }]
      },
      {
        title: "15. Site visit",
        fields: [{ name: "", value: get2("") }]
      }
    ]
  });
}
const TEMPLATES = {
  blank: {
    template: () => new docx.Document({
      sections: []
    }),
    requirements: []
  },
  LDCE: {
    template: LDCETemplate,
    requirements: []
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
function generateDocxTemplateStream({
  templateName,
  passport
}) {
  if (!hasRequiredDataForTemplate({
    templateName,
    passport
  })) {
    throw new Error(`Template "${templateName}" is missing required fields`);
  }
  const template = TEMPLATES[templateName].template;
  const document = template(passport);
  return docx.Packer.toStream(document);
}
function hasRequiredDataForTemplate({
  templateName,
  passport
}) {
  const template = TEMPLATES[templateName];
  if (!template)
    throw new Error(`Template "${templateName}" not found`);
  for (const path of template.requirements) {
    if (!hasValue(passport.data, path)) {
      return false;
    }
  }
  return true;
}
exports.generateDocxTemplateStream = generateDocxTemplateStream;
exports.generateHTMLMapStream = generateHTMLMapStream;
exports.generateHTMLOverviewStream = generateHTMLOverviewStream;
exports.hasRequiredDataForTemplate = hasRequiredDataForTemplate;

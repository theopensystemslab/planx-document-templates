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
  const value = get({ data, path }) || false;
  return !!value;
}
function getString(data, path) {
  const value = get({ data, path }) !== void 0 ? get({ data, path }) : "";
  if (Array.isArray(value)) {
    return value[0] ? String(value[0]) : "";
  }
  return String(value);
}
function getBoolean(data, path) {
  const value = get({ data, path });
  if (Array.isArray(value) && value.length === 1) {
    return value[0] === true || value[0] === "true";
  }
  return value === true || value === "true";
}
function applyRedactions(data, redactions = []) {
  redactions.forEach((key) => {
    get({ data: data.data, path: key, nullifyValue: true });
  });
  return data;
}
function get({
  data,
  path,
  nullifyValue = false,
  index = -1
}) {
  const parts = path.split(".");
  if (index === -1) {
    index = parts.length;
  }
  const key = parts.slice(0, index).join(".");
  if (data[key] === void 0 && index > 0) {
    return get({ data, path, nullifyValue, index: index - 1 });
  }
  if (data[key] !== void 0 && parts.slice(index).length > 0) {
    const newPath = parts.slice(index).join(".");
    return get({ data: data[key], path: newPath, nullifyValue });
  }
  if (nullifyValue) {
    data[key] = null;
  }
  return data[key];
}
function buildFormTemplate(data) {
  const heading = [
    new docx.Paragraph({
      heading: docx.HeadingLevel.HEADING_1,
      children: [
        new docx.TextRun({
          text: data.presets.title,
          font: "Arial",
          bold: true,
          color: "000000",
          size: 54
        })
      ],
      alignment: docx.AlignmentType.LEFT,
      spacing: {
        after: 120
      }
    }),
    new docx.Paragraph({
      heading: docx.HeadingLevel.HEADING_2,
      children: [
        new docx.TextRun({
          text: data.presets.subtitle,
          font: "Arial",
          size: 32,
          color: "000000"
        })
      ],
      alignment: docx.AlignmentType.LEFT,
      spacing: {
        before: 240,
        after: 120
      }
    })
  ];
  const fieldBuilder = (field) => {
    return new docx.TableRow({
      children: [
        new docx.TableCell({
          children: [
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: field.name,
                  bold: true
                })
              ],
              style: "styled"
            })
          ]
        }),
        new docx.TableCell({
          children: [
            new docx.Paragraph({
              text: field.value,
              style: "styled"
            })
          ]
        })
      ]
    });
  };
  const sectionBuilder = (section) => {
    const formSectionTitle = new docx.TextRun({
      text: section.title,
      font: "Arial",
      bold: true,
      color: "000000",
      size: 32
    });
    const formSectionRows = section.fields.map(fieldBuilder);
    const formSection = [
      new docx.Paragraph({
        heading: docx.HeadingLevel.HEADING_2,
        children: [formSectionTitle],
        alignment: docx.AlignmentType.LEFT,
        spacing: {
          before: 480,
          after: 240
        }
      }),
      new docx.Table({
        columnWidths: [4520, 4520],
        rows: formSectionRows,
        width: {
          size: 9040,
          type: docx.WidthType.DXA
        }
      })
    ];
    return formSection;
  };
  return new docx.Document({
    creator: "PlanX",
    title: data.presets.title,
    styles: {
      paragraphStyles: [
        {
          id: "styled",
          name: "Styled",
          basedOn: "Text",
          next: "Text",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 28,
            italics: false,
            bold: false,
            color: "000000"
          },
          paragraph: {
            spacing: {
              before: 120,
              after: 120
            }
          }
        }
      ]
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
            value: get2("application.preAppAdvice")
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
            ].filter(Boolean).join(", ")
          },
          {
            name: "Address of other owners",
            value: [
              get2("applicant.ownership.certificateB.owner1.address"),
              get2("applicant.ownership.certificateB.owner2.address"),
              get2("applicant.ownership.certificateB.multipleOwners.address")
            ].filter(Boolean).join(", ")
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
            name: "What is the existing site use(s) for which the certificate of lawfulness is being sought? Please fully describe each use and state which part of the land the use relates to",
            value: ""
          }
        ]
      },
      {
        title: "9. Grounds for Application for a Lawful Development Certificate ",
        fields: [
          {
            name: "Please state under what grounds is the certificate sought",
            value: ""
          },
          {
            name: "If applicable, please give the reference number of any existing planning permission, lawful development certificate or enforcement notice affecting the application site. Include its date and the number of any condition being breached:",
            value: ""
          },
          {
            name: "Please state why a Lawful Development Certificate should be granted",
            value: ""
          }
        ]
      },
      {
        title: "10. Information in Support of a Lawful Development Certificate",
        fields: [
          {
            name: "When was the use or activity begun, or the building work substantially completed?",
            value: ""
          },
          {
            name: "In the case of an existing use or activity in breach of conditions has there been any interruption:",
            value: "Yes/No"
          },
          {
            name: "If Yes, please provide details of the dates, duration and any discontinuance of the development which is the subject of this application. If your application is based on the claim that a use or activity has been ongoing for a period of years, please state exactly when any interruption occurred:",
            value: ""
          },
          {
            name: "In the case of an existing use of land, has there been any material change of use of the land since the start of the use for which a certificate is sought?",
            value: ""
          },
          {
            name: "If yes, provide details",
            value: ""
          },
          {
            name: "Does the application for a Certificate relate to a residential use where the number of residential units has changed?",
            value: "Yes/No"
          },
          { name: "New 1 bed homes", value: "" },
          { name: "New 2 bed homes", value: "" },
          { name: "New 3 bed homes", value: "" },
          { name: "New 4+ bed homes", value: "" },
          { name: "New other / unknown homes", value: "" },
          { name: "Total new homes of all types", value: "" },
          { name: "New social rented homes", value: "" },
          { name: "New intermediate homes", value: "" },
          { name: "New key worker homes", value: "" },
          { name: "Existing 1 bed homes", value: "" },
          { name: "Existing 2 bed homes", value: "" },
          { name: "Existing 3 bed homes", value: "" },
          { name: "Existing 4+ bed homes", value: "" },
          { name: "Existing other / unknown homes", value: "" },
          { name: "Total existing homes of all types", value: "" },
          { name: "...", value: "" }
        ]
      },
      {
        title: "11. Additional Information Requirements of the Mayor of London",
        fields: [
          {
            name: "Do you know the title number of the property?",
            value: ""
          },
          {
            name: "Title number",
            value: ""
          },
          {
            name: "Do you know the Energy Performance Certificate reference of the property?",
            value: "Yes/No"
          },
          {
            name: "Energy Performance Certificate reference",
            value: ""
          },
          {
            name: "Gross internal floor area to be added (sqm)",
            value: ""
          },
          {
            name: "Number of additional bedrooms",
            value: ""
          },
          {
            name: "Number of additional bathrooms",
            value: ""
          },
          {
            name: "Does the site have any existing vehicle/cycle parking spaces?",
            value: "Yes/No"
          },
          {
            name: "Car spaces existing",
            value: ""
          },
          {
            name: "Car spaces proposed",
            value: ""
          },
          {
            name: "Light goods vehicles / public vehicles existing",
            value: ""
          },
          {
            name: "Light goods vehicles / public vehicles proposed",
            value: ""
          },
          {
            name: "Motorcycles existing",
            value: ""
          },
          {
            name: "Motorcycles proposed",
            value: ""
          },
          {
            name: "Disabled parking existing",
            value: ""
          },
          {
            name: "Disabled parking proposed",
            value: ""
          },
          {
            name: "Cycle spaces existing",
            value: ""
          },
          {
            name: "Cycle spaces proposed",
            value: ""
          },
          {
            name: "Bus spaces existing",
            value: ""
          },
          {
            name: "Bus spaces proposed",
            value: ""
          },
          {
            name: "Residential only off-street parking existing",
            value: ""
          },
          {
            name: "Residential only off-street parking proposed",
            value: ""
          },
          {
            name: "Car club existing",
            value: ""
          },
          {
            name: "Car club proposed",
            value: ""
          },
          {
            name: "Other existing",
            value: ""
          },
          {
            name: "Other proposed",
            value: ""
          }
        ]
      },
      {
        title: "12. Declaration",
        fields: [
          {
            name: "I / We hereby apply for Lawful development: Existing use as described in this form and accompanying plans/drawings and additional information. I / We confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine options of the persons giving them. I / We also accept that: Once submitted, this information will be transmitted to the Local Planning Authority and, once validated by them, be made available as part of a public register and on the authority's website; our system will automatically generate and send you emails in regard to the submission of this application.",
            value: "Yes/No (applicant), Yes / No (agent)"
          },
          { name: "Date", value: new Date().toLocaleDateString("en-GB") }
        ]
      },
      {
        title: "13. Applicant contact details",
        fields: [
          {
            name: "Phone",
            value: [
              get2("applicant.phone.primary"),
              get2("applicant.phone.secondary")
            ].filter(Boolean).join(", ")
          },
          { name: "Email", value: get2("applicant.email") }
        ]
      },
      {
        title: "14. Agent contact details",
        fields: [
          {
            name: "Phone",
            value: [
              get2("applicant.agent.phone.primary"),
              get2("applicant.agent.phone.secondary")
            ].filter(Boolean).join(", ")
          },
          { name: "Email", value: get2("applicant.agent.email") }
        ]
      },
      {
        title: "15. Site visit",
        fields: [
          {
            name: "Can the site be seen from a: Public road, Public footpath, Bridleway, Or other public land?",
            value: "Information not provided"
          },
          {
            name: "If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?",
            value: "Applicant / agent / Other"
          },
          { name: "Name", value: get2("applicant.siteContact.name") },
          { name: "Phone", value: get2("applicant.siteContact.telephone") },
          { name: "Email", value: get2("applicant.siteContact.email") }
        ]
      }
    ]
  });
}
const TEMPLATES = {
  _blank: {
    template: () => new docx.Document({
      sections: []
    }),
    requirements: []
  },
  LDCE: {
    template: LDCETemplate,
    requirements: []
  },
  LDCE_redacted: {
    template: LDCETemplate,
    redactions: ["applicant.email", "applicant.phone.primary", "applicant.phone.secondary"],
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
  const template = TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Template "${templateName}" not found`);
  }
  const foundTemplate = template;
  if (!hasRequiredDataForTemplate({
    templateName,
    passport
  })) {
    throw new Error(`Template "${templateName}" is missing required fields`);
  }
  const data = applyRedactions(passport, foundTemplate.redactions);
  const document = foundTemplate.template(data);
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

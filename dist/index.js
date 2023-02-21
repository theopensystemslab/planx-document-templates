"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const server = require("react-dom/server");
const jsxRuntime = require("react/jsx-runtime");
const react = require("@emotion/react");
const docx = require("docx");
const Box = require("@mui/material/Box");
const Grid = require("@mui/material/Grid");
const prettyTitle = require("lodash.startcase");
const React = require("react");
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
const jsxRuntime__namespace = /* @__PURE__ */ _interopNamespace(jsxRuntime);
const Box__default = /* @__PURE__ */ _interopDefaultLegacy(Box);
const Grid__default = /* @__PURE__ */ _interopDefaultLegacy(Grid);
const prettyTitle__default = /* @__PURE__ */ _interopDefaultLegacy(prettyTitle);
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const Fragment = jsxRuntime__namespace.Fragment;
const jsx = jsxRuntime__namespace.jsx;
const jsxs = jsxRuntime__namespace.jsxs;
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
      children: [/* @__PURE__ */ jsx(Styles$1, {}), /* @__PURE__ */ jsx("h1", {
        children: "Boundary"
      }), /* @__PURE__ */ jsx(Map, {
        boundary: props.geojson
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
function hasValue(data, path) {
  const value = get({ data, path });
  if (value === 0 || value === false)
    return true;
  return Boolean(value);
}
function getString(data, path) {
  const value = get({ data, path }) ?? "";
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
function applyRedactions(input, redactions = []) {
  const outputData = { ...input.data };
  redactions.forEach((key) => {
    if (hasValue(outputData, key))
      get({ data: outputData, path: key, nullifyValue: true });
  });
  return { data: outputData };
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
  if (data[key] === void 0 && data[key] !== null && index > 0) {
    return get({ data, path, nullifyValue, index: index - 1 });
  }
  if (data[key] !== void 0 && data[key] !== null && parts.slice(index).length > 0) {
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
  const get2 = (path) => getString(passport.data, path);
  const getBoolean$1 = (path) => getBoolean(passport.data, path);
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
            value: getBoolean$1("applicant.agent.form") ? "Yes" : "No"
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
            value: get2("applicant.sameAddress.form")
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
            value: get2("application.preAppAdvice.form")
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
            value: get2("application.preApp.date")
          },
          {
            name: "Details of advice received",
            value: "Not provided"
          }
        ]
      },
      {
        title: "5. Interest in Land",
        fields: [
          {
            name: "What is the applicant\u2019s interest in the land?",
            value: get2("applicant.interest.form")
          },
          {
            name: "If applicant is not the owner, do they know any owners?",
            value: get2("applicant.interest.ownerKnown.form")
          },
          {
            name: "Have other owners been informed in writing about the application",
            value: get2("applicant.ownership.noticeGiven.form")
          },
          {
            name: "If they have not been informed of the application, please explain why not",
            value: get2("applicant.ownership.noNoticeReason")
          },
          {
            name: "Names of other owners",
            value: [
              get2("applicant.ownership.owner1.name"),
              get2("applicant.ownership.owner2.name"),
              get2("applicant.ownership.owner3.name"),
              get2("applicant.ownership.multipleOwners")
            ].filter(Boolean).join(", ")
          },
          {
            name: "Address of other owners",
            value: [
              get2("applicant.ownership.owner1.address"),
              get2("applicant.ownership.owner2.address"),
              get2("applicant.ownership.owner3.address"),
              get2("applicant.ownership.multipleOwners.address")
            ].filter(Boolean).join(", ")
          }
        ]
      },
      {
        title: "6. Authority employee / member",
        fields: [
          {
            name: "Do any of these statements apply to you?",
            value: get2("application.declaration.connection.form")
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
            value: get2("application.about.form")
          },
          {
            name: "If Yes to an existing use, please state which of the Use Classes the use relates to",
            value: `Use class ${get2("property.useClass")}`
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
            value: get2("proposal.use")
          }
        ]
      },
      {
        title: "9. Grounds for Application for a Lawful Development Certificate ",
        fields: [
          {
            name: "Please state under what grounds is the certificate sought",
            value: get2("application.basisOfLawfulness")
          },
          {
            name: "If applicable, please give the reference number of any existing planning permission, lawful development certificate or enforcement notice affecting the application site. Include its date and the number of any condition being breached:",
            value: ""
          },
          {
            name: "Please state why a Lawful Development Certificate should be granted",
            value: [
              get2("application.reason"),
              get2("application.resultOverride.reason")
            ].filter(Boolean).join(" ")
          }
        ]
      },
      {
        title: "10. Information in Support of a Lawful Development Certificate",
        fields: [
          {
            name: "When was the use or activity begun, or the building work substantially completed?",
            value: "Information not provided"
          },
          {
            name: "In the case of an existing use or activity in breach of conditions has there been any interruption:",
            value: get2("proposal.completion.continousUse.form")
          },
          {
            name: "If Yes, please provide details of the dates, duration and any discontinuance of the development which is the subject of this application. If your application is based on the claim that a use or activity has been ongoing for a period of years, please state exactly when any interruption occurred:",
            value: get2("proposal.completion.continousUse.description")
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
            value: get2("proposal.changeNumberOfHomes.form")
          },
          { name: "New 1 bed houses", value: "" },
          { name: "New 2 bed houses", value: "" },
          { name: "New 3 bed houses", value: "" },
          { name: "New 4+ bed houses", value: "" },
          { name: "New houses, beds unknown", value: "" },
          { name: "Total new houses", value: "" },
          { name: "New 1 bed flats & maisonettes", value: "" },
          { name: "New 2 bed flats & maisonettes", value: "" },
          { name: "New 3 bed flats & maisonettes", value: "" },
          { name: "New 4+ bed flats & maisonettes", value: "" },
          { name: "New flats & maisonettes, beds unknown", value: "" },
          { name: "Total new flats & maisonettes", value: "" },
          { name: "New 1 bed live-work units", value: "" },
          { name: "New 2 bed live-work units", value: "" },
          { name: "New 3 bed live-work units", value: "" },
          { name: "New 4+ bed live-work units", value: "" },
          { name: "New live-work units, beds unknown", value: "" },
          { name: "Total new live-work units", value: "" },
          { name: "New 1 bed cluster flats", value: "" },
          { name: "New 2 bed cluster flats", value: "" },
          { name: "New 3 bed cluster flats", value: "" },
          { name: "New 4+ bed cluster flats", value: "" },
          { name: "New cluster flats, beds unknown", value: "" },
          { name: "Total new cluster flats", value: "" },
          { name: "New 1 bed sheltered housing units", value: "" },
          { name: "New 2 bed sheltered housing units", value: "" },
          { name: "New 3 bed sheltered housing units", value: "" },
          { name: "New 4+ bed sheltered housing units", value: "" },
          { name: "New sheltered housing units, beds unknown", value: "" },
          { name: "Total new sheltered housing units", value: "" },
          { name: "New 1 bed bedsits / studios", value: "" },
          { name: "New 2 bed bedsits / studios", value: "" },
          { name: "New 3 bed bedsits / studios", value: "" },
          { name: "New 4+ bed bedsits / studios", value: "" },
          { name: "New bedsits / studios, beds unknown", value: "" },
          { name: "Total new bedsits / studios", value: "" },
          { name: "Total new homes", value: "" },
          { name: "New social rented homes", value: "" },
          { name: "New intermediate homes", value: "" },
          { name: "New key worker homes", value: "" },
          { name: "Existing 1 bed houses", value: "" },
          { name: "Existing 2 bed houses", value: "" },
          { name: "Existing 3 bed houses", value: "" },
          { name: "Existing 4+ bed houses", value: "" },
          { name: "Existing houses, beds unknown", value: "" },
          { name: "Total existing houses", value: "" },
          { name: "Existing 1 bed flats & maisonettes", value: "" },
          { name: "Existing 2 bed flats & maisonettes", value: "" },
          { name: "Existing 3 bed flats & maisonettes", value: "" },
          { name: "Existing 4+ bed flats & maisonettes", value: "" },
          { name: "Existing flats & maisonettes, beds unknown", value: "" },
          { name: "Total existing flats & maisonettes", value: "" },
          { name: "Existing 1 bed live-work units", value: "" },
          { name: "Existing 2 bed live-work units", value: "" },
          { name: "Existing 3 bed live-work units", value: "" },
          { name: "Existing 4+ bed live-work units", value: "" },
          { name: "Existing live-work units, beds unknown", value: "" },
          { name: "Total existing live-work units", value: "" },
          { name: "Existing 1 bed cluster flats", value: "" },
          { name: "Existing 2 bed cluster flats", value: "" },
          { name: "Existing 3 bed cluster flats", value: "" },
          { name: "Existing 4+ bed cluster flats", value: "" },
          { name: "Existing cluster flats, beds unknown", value: "" },
          { name: "Total existing cluster flats", value: "" },
          { name: "Existing 1 bed sheltered housing units", value: "" },
          { name: "Existing 2 bed sheltered housing units", value: "" },
          { name: "Existing 3 bed sheltered housing units", value: "" },
          { name: "Existing 4+ bed sheltered housing units", value: "" },
          { name: "Existing sheltered housing units, beds unknown", value: "" },
          { name: "Total existing sheltered housing units", value: "" },
          { name: "Existing 1 bed bedsits / studios", value: "" },
          { name: "Existing 2 bed bedsits / studios", value: "" },
          { name: "Existing 3 bed bedsits / studios", value: "" },
          { name: "Existing 4+ bed bedsits / studios", value: "" },
          { name: "Existing bedsits / studios, beds unknown", value: "" },
          { name: "Total existing bedsits / studios", value: "" },
          { name: "Total existing homes", value: "" },
          { name: "Existing social rented homes", value: "" },
          { name: "Existing intermediate homes", value: "" },
          { name: "Existing key worker homes", value: "" }
        ]
      },
      {
        title: "11. Additional Information Requirements of the Mayor of London",
        fields: [
          {
            name: "Do you know the title number of the property?",
            value: get2("property.titleNumberKnown.form")
          },
          {
            name: "Title number",
            value: get2("property.titleNumber")
          },
          {
            name: "Do you know the Energy Performance Certificate reference of the property?",
            value: get2("property.EPCKnown.form")
          },
          {
            name: "Energy Performance Certificate reference",
            value: get2("property.EPC.number")
          },
          {
            name: "Gross internal floor area to be added (sqm)",
            value: get2("proposal.extended.area")
          },
          {
            name: "Number of additional bedrooms",
            value: get2("proposal.newBedrooms.number")
          },
          {
            name: "Number of additional bathrooms",
            value: get2("proposal.newBathrooms.number")
          },
          {
            name: "Does the site have any existing vehicle/cycle parking spaces?",
            value: get2("proposal.vehicleParking")
          },
          {
            name: "Car spaces existing",
            value: get2("proposal.cars.number.existing")
          },
          {
            name: "Car spaces proposed",
            value: get2("proposal.cars.number.proposed")
          },
          {
            name: "Light goods vehicles / public vehicles existing",
            value: get2("proposal.vans.number.existing")
          },
          {
            name: "Light goods vehicles / public vehicles proposed",
            value: get2("proposal.vans.number.proposed")
          },
          {
            name: "Motorcycles existing",
            value: get2("proposal.motorcycles.number.existing")
          },
          {
            name: "Motorcycles proposed",
            value: get2("proposal.motorcycles.number.proposed")
          },
          {
            name: "Disabled parking existing",
            value: get2("proposal.cars.disabled.number.existing")
          },
          {
            name: "Disabled parking proposed",
            value: get2("proposal.cars.disabled.number.proposed")
          },
          {
            name: "Cycle spaces existing",
            value: get2("proposal.bicycles.number.existing")
          },
          {
            name: "Cycle spaces proposed",
            value: get2("proposal.bicycles.number.proposed")
          },
          {
            name: "Bus spaces existing",
            value: get2("proposal.buses.number.existing")
          },
          {
            name: "Bus spaces proposed",
            value: get2("proposal.buses.number.proposed")
          },
          {
            name: "Residential only off-street parking existing",
            value: get2("proposal.cars.offStreet.residents.number.existing")
          },
          {
            name: "Residential only off-street parking proposed",
            value: get2("proposal.cars.offStreet.residents.number.proposed")
          },
          {
            name: "Car club existing",
            value: get2("proposal.cars.club.number.existing")
          },
          {
            name: "Car club proposed",
            value: get2("proposal.cars.club.number.proposed")
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
            value: get2("application.declaration.accurate.form")
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
            value: getBoolean$1("proposal.visibleFromPublicRealm") ? "Yes" : "No"
          },
          {
            name: "If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?",
            value: get2("applicant.siteContact")
          },
          { name: "Name", value: get2("applicant.siteContact.name") },
          { name: "Phone", value: get2("applicant.siteContact.telephone") },
          { name: "Email", value: get2("applicant.siteContact.email") }
        ]
      }
    ]
  });
}
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
function prettyQuestion(data) {
  const isPhrasedAsQuestion = data.includes("?");
  const isFileUpload = data.includes("File");
  const isCustomLabeledKey = !data.includes("_") && data.includes(" ");
  if (isPhrasedAsQuestion || isFileUpload || isCustomLabeledKey) {
    return safeDecodeURI(data);
  } else {
    return safeDecodeURI(prettyTitle__default.default(data));
  }
}
function prettyResponse(data) {
  if (!data) {
    return "";
  }
  if (typeof data === "string") {
    return safeDecodeURI(data.trim());
  }
  if (typeof data === "number") {
    return data;
  }
  if (typeof data === "boolean") {
    return data ? "True" : "False";
  }
  if (Array.isArray(data)) {
    return getResponseValuesFromList(data);
  }
  return "Error displaying response";
}
function getResponseValuesFromList(data) {
  var _a, _b, _c, _d;
  if ((data == null ? void 0 : data.length) === 1) {
    if (typeof ((_a = data == null ? void 0 : data[0]) == null ? void 0 : _a["value"]) === "string") {
      return safeDecodeURI((_b = data == null ? void 0 : data[0]) == null ? void 0 : _b["value"]);
    } else {
      return (_c = data == null ? void 0 : data[0]) == null ? void 0 : _c["value"];
    }
  }
  if ((data == null ? void 0 : data.length) > 1) {
    const dataValues = data == null ? void 0 : data.map((d) => d == null ? void 0 : d["value"]);
    return safeDecodeURI((_d = dataValues == null ? void 0 : dataValues.filter(Boolean)) == null ? void 0 : _d.join("\n"));
  }
  return "Error displaying list of responses";
}
function getToday() {
  return new Date().toLocaleDateString("en-GB");
}
function Highlights(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const siteAddress = (_a = props.data.find((d) => d.question === "site")) == null ? void 0 : _a.responses;
  const sessionId = (_b = props.data.find((d) => d.question === "Planning Application Reference")) == null ? void 0 : _b.responses;
  const payRef = (_d = (_c = props.data.find((d) => d.question === "application.fee.reference.govPay")) == null ? void 0 : _c.responses) == null ? void 0 : _d["payment_id"];
  const fee = (_f = (_e = props.data.find((d) => d.question === "application.fee.reference.govPay")) == null ? void 0 : _e.responses) == null ? void 0 : _f["amount"];
  return /* @__PURE__ */ jsxs(Box__default.default, {
    component: "dl",
    sx: {
      ...gridStyles,
      border: "none"
    },
    children: [/* @__PURE__ */ jsxs(React__namespace.Fragment, {
      children: [/* @__PURE__ */ jsx("dt", {
        children: "Property address"
      }), /* @__PURE__ */ jsx("dd", {
        children: [(_g = siteAddress == null ? void 0 : siteAddress["address_1"]) == null ? void 0 : _g.toString(), (_h = siteAddress == null ? void 0 : siteAddress["town"]) == null ? void 0 : _h.toString(), (_i = siteAddress == null ? void 0 : siteAddress["postcode"]) == null ? void 0 : _i.toString()].filter(Boolean).join(" ")
      }), /* @__PURE__ */ jsx("dd", {
        children: ""
      })]
    }, "address"), /* @__PURE__ */ jsxs(React__namespace.Fragment, {
      children: [/* @__PURE__ */ jsx("dt", {
        children: "Planning application reference"
      }), /* @__PURE__ */ jsx("dd", {
        children: typeof sessionId === "string" && sessionId
      }), /* @__PURE__ */ jsx("dd", {
        children: ""
      })]
    }, "sessionId"), payRef && /* @__PURE__ */ jsxs(React__namespace.Fragment, {
      children: [/* @__PURE__ */ jsx("dt", {
        children: "GOV.UK Pay reference"
      }), /* @__PURE__ */ jsx("dd", {
        children: payRef
      }), /* @__PURE__ */ jsx("dd", {
        children: ""
      })]
    }, "payReference"), fee && /* @__PURE__ */ jsxs(React__namespace.Fragment, {
      children: [/* @__PURE__ */ jsx("dt", {
        children: "Fee paid"
      }), /* @__PURE__ */ jsx("dd", {
        children: `\xA3${fee}`
      }), /* @__PURE__ */ jsx("dd", {
        children: ""
      })]
    }, "fee"), /* @__PURE__ */ jsxs(React__namespace.Fragment, {
      children: [/* @__PURE__ */ jsx("dt", {
        children: "Paid and submitted on"
      }), /* @__PURE__ */ jsx("dd", {
        children: getToday()
      }), /* @__PURE__ */ jsx("dd", {
        children: ""
      })]
    }, "createdDate")]
  });
}
function Result(props) {
  var _a, _b;
  const result = (_a = props.data.find((d) => d.question === "result")) == null ? void 0 : _a.responses;
  return /* @__PURE__ */ jsxs(Box__default.default, {
    sx: {
      borderBottom: 1,
      borderColor: "divider"
    },
    children: [/* @__PURE__ */ jsx("h2", {
      children: "It looks like"
    }), /* @__PURE__ */ jsx("span", {
      style: {
        fontWeight: 700,
        padding: ".5em",
        backgroundColor: "#ffdd00"
      },
      children: (_b = result == null ? void 0 : result["heading"]) == null ? void 0 : _b.toString()
    }), /* @__PURE__ */ jsx("p", {
      children: "This pre-assessment is based on the information provided by the applicant."
    })]
  });
}
function AboutTheProperty(props) {
  var _a, _b, _c, _d, _e;
  const siteAddress = (_a = props.data.find((d) => d.question === "site")) == null ? void 0 : _a.responses;
  return /* @__PURE__ */ jsxs(Box__default.default, {
    children: [/* @__PURE__ */ jsx("h2", {
      children: "About the property"
    }), /* @__PURE__ */ jsxs(Box__default.default, {
      component: "dl",
      sx: gridStyles,
      children: [/* @__PURE__ */ jsxs(React__namespace.Fragment, {
        children: [/* @__PURE__ */ jsx("dt", {
          children: "Address"
        }), /* @__PURE__ */ jsx("dd", {
          children: [(_b = siteAddress == null ? void 0 : siteAddress["address_1"]) == null ? void 0 : _b.toString(), (_c = siteAddress == null ? void 0 : siteAddress["town"]) == null ? void 0 : _c.toString(), (_d = siteAddress == null ? void 0 : siteAddress["postcode"]) == null ? void 0 : _d.toString()].filter(Boolean).join(" ")
        }), /* @__PURE__ */ jsx("dd", {
          children: ""
        })]
      }, "address"), /* @__PURE__ */ jsxs(React__namespace.Fragment, {
        children: [/* @__PURE__ */ jsx("dt", {
          children: "UPRN"
        }), /* @__PURE__ */ jsx("dd", {
          children: (_e = siteAddress == null ? void 0 : siteAddress["uprn"]) == null ? void 0 : _e.toString()
        }), /* @__PURE__ */ jsx("dd", {
          children: ""
        })]
      }, "uprn"), /* @__PURE__ */ jsxs(React__namespace.Fragment, {
        children: [/* @__PURE__ */ jsx("dt", {
          children: "Coordinate (lng, lat)"
        }), /* @__PURE__ */ jsxs("dd", {
          children: [siteAddress == null ? void 0 : siteAddress["longitude"], ", ", siteAddress == null ? void 0 : siteAddress["latitude"]]
        }), /* @__PURE__ */ jsx("dd", {
          children: ""
        })]
      }, "coordinate")]
    })]
  });
}
function Boundary(props) {
  var _a;
  const boundary = (_a = props.data.find((d) => d.question === "boundary_geojson")) == null ? void 0 : _a.responses;
  return /* @__PURE__ */ jsxs(Box__default.default, {
    sx: {
      borderBottom: 1,
      borderColor: "divider",
      width: "100%"
    },
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Boundary"
    }), /* @__PURE__ */ jsx("pre", {
      style: {
        display: "block",
        whiteSpace: "pre-wrap",
        padding: ".5em",
        background: "#f2f2f2",
        fontSize: ".8em"
      },
      children: JSON.stringify(boundary, null, 2)
    })]
  });
}
function ProposalDetails(props) {
  return /* @__PURE__ */ jsxs(Box__default.default, {
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Proposal details"
    }), /* @__PURE__ */ jsx(Box__default.default, {
      component: "dl",
      sx: gridStyles,
      children: props.data.map((d, i) => {
        var _a, _b, _c, _d, _e, _f, _g;
        return /* @__PURE__ */ jsxs(React__namespace.Fragment, {
          children: [/* @__PURE__ */ jsx("dt", {
            children: prettyQuestion(d.question)
          }), /* @__PURE__ */ jsx("dd", {
            children: typeof prettyResponse(d.responses) === "string" && ((_c = (_b = (_a = prettyResponse(d.responses)) == null ? void 0 : _a.toString()) == null ? void 0 : _b.split("\n")) == null ? void 0 : _c.length) > 1 ? /* @__PURE__ */ jsx("ul", {
              style: {
                lineHeight: "1.5em"
              },
              children: (_f = (_e = (_d = prettyResponse(d.responses)) == null ? void 0 : _d.toString()) == null ? void 0 : _e.split("\n")) == null ? void 0 : _f.map((response, i2) => /* @__PURE__ */ jsx("li", {
                children: response
              }, i2))
            }) : prettyResponse(d.responses)
          }), /* @__PURE__ */ jsx("dd", {
            style: {
              fontStyle: "italic"
            },
            children: typeof d.metadata === "object" && Boolean((_g = d.metadata) == null ? void 0 : _g.auto_answered) ? "Auto-answered" : ""
          })]
        }, i);
      })
    })]
  });
}
function OverviewDocument(props) {
  var _a, _b, _c;
  const applicationType = (_a = props.data.find((d) => d.question === "application_type")) == null ? void 0 : _a.responses;
  const workStatus = (_b = props.data.find((d) => d.question === "work_status")) == null ? void 0 : _b.responses;
  const documentTitle = applicationType && typeof applicationType === "string" && typeof workStatus === "string" ? [prettyTitle__default.default(applicationType), prettyTitle__default.default(workStatus)].filter(Boolean).join(" - ") : "PlanX Submission Overview";
  const boundary = (_c = props.data.find((d) => d.question === "boundary_geojson")) == null ? void 0 : _c.responses;
  const removeableQuestions = ["Planning Application Reference", "Property Address", "application.fee.reference.govPay", "application_type", "site", "boundary_geojson", "constraints", "work_status", "payment_amount", "payment_reference", "result"];
  const filteredProposalDetails = props.data.filter((d) => !removeableQuestions.includes(d.question));
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
        children: typeof documentTitle === "string" && documentTitle
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Styles, {}), /* @__PURE__ */ jsxs(Grid__default.default, {
        container: true,
        sx: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "1000px",
          margin: "auto"
        },
        children: [/* @__PURE__ */ jsx("h1", {
          children: typeof documentTitle === "string" && documentTitle
        }), !validatePlanXExportData(props.data) ? /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("strong", {
            children: "Unable to display data."
          })
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [boundary && /* @__PURE__ */ jsx(Box__default.default, {
            sx: {
              marginBottom: 1
            },
            children: /* @__PURE__ */ jsx("my-map", {
              showNorthArrow: true,
              showScale: true,
              hideResetControl: true,
              geojsonData: JSON.stringify(boundary),
              id: "boundary-map"
            })
          }), /* @__PURE__ */ jsx(Highlights, {
            data: props.data
          }), /* @__PURE__ */ jsx(Result, {
            data: props.data
          }), /* @__PURE__ */ jsx(AboutTheProperty, {
            data: props.data
          }), /* @__PURE__ */ jsx(Box__default.default, {
            sx: {
              display: "flex"
            },
            children: /* @__PURE__ */ jsx(Boundary, {
              data: props.data
            })
          }), /* @__PURE__ */ jsx(ProposalDetails, {
            data: filteredProposalDetails
          })]
        })]
      })]
    })]
  });
}
const gridStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr .5fr",
  gridRowGap: "10px",
  marginTop: "1em",
  marginBottom: "1em",
  "& > *": {
    borderBottom: 1,
    borderColor: "divider",
    paddingBottom: ".5em",
    paddingTop: ".5em",
    verticalAlign: "top",
    margin: 0
  },
  "& ul": {
    listStylePosition: "inside",
    padding: 0,
    margin: 0
  },
  "& >:nth-child(3n+1)": {
    fontWeight: 700
  },
  "& >:nth-child(3n+2)": {
    paddingLeft: "10px"
  },
  "& >:nth-child(3n+3)": {
    textAlign: "right"
  }
};
function Styles() {
  return /* @__PURE__ */ jsx(react.Global, {
    styles: react.css`
        @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
        body {
          font-family: "Inter", arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 16px;
          font-size: 1rem;
        }
      `
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
    requirements: [{
      key: "application.type",
      value: "ldc.existing"
    }]
  },
  LDCE_redacted: {
    template: LDCETemplate,
    redactions: ["applicant.email", "applicant.phone.primary", "applicant.phone.secondary"],
    requirements: [{
      key: "application.type",
      value: "ldc.existing"
    }]
  }
};
function generateHTMLOverviewStream(planXExportData) {
  return server.renderToPipeableStream(/* @__PURE__ */ jsx(OverviewDocument, {
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
  if (!TEMPLATES[templateName]) {
    throw new Error(`Template "${templateName}" not found`);
  }
  if (!hasRequiredDataForTemplate({
    templateName,
    passport
  })) {
    throw new Error(`Template "${templateName}" is missing required fields`);
  }
  const {
    redactions,
    template
  } = TEMPLATES[templateName];
  let data = passport;
  if (redactions && redactions.length) {
    data = applyRedactions(passport, redactions);
  }
  const document = template(data);
  return docx.Packer.toStream(document);
}
function hasRequiredDataForTemplate({
  templateName,
  passport
}) {
  const template = TEMPLATES[templateName];
  if (!template)
    throw new Error(`Template "${templateName}" not found`);
  for (const {
    key,
    value
  } of template.requirements) {
    if (!hasValue(passport.data, key)) {
      return false;
    }
    if (value) {
      return getString(passport.data, key) === value;
    }
  }
  return true;
}
exports.TEMPLATES = TEMPLATES;
exports.generateDocxTemplateStream = generateDocxTemplateStream;
exports.generateHTMLMapStream = generateHTMLMapStream;
exports.generateHTMLOverviewStream = generateHTMLOverviewStream;
exports.hasRequiredDataForTemplate = hasRequiredDataForTemplate;

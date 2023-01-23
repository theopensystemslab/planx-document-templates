"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const resolvePath = require("lodash.get");
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
const resolvePath__default = /* @__PURE__ */ _interopDefaultLegacy(resolvePath);
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
const emptyCheckbox = new docx.Paragraph({
  children: [new docx.SymbolRun("F071")]
});
const checkedCheckbox = new docx.Paragraph({
  children: [new docx.SymbolRun("F0FE")]
});
const LDCP = (passport) => {
  return new docx.Document({
    creator: "PlanX",
    title: "LDC-P",
    description: "LDC-P application",
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
        children: [
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_1,
            children: [
              new docx.TextRun(
                "Application for a Lawful Development Certificate for a Proposed use or development."
              )
            ]
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_1,
            children: [new docx.TextRun("Town and Country Planning Act 1990")]
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_3,
            children: [
              new docx.TextRun(
                "Publication of applications on planning authority websites"
              )
            ]
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun(
                "Information provided on this form and in supporting documents may be published on the authority's planning register and website."
              )
            ]
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("1. Applicant Name and Address")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Name")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("applicant.title"),
                      new docx.Paragraph("applicant.name.first"),
                      new docx.Paragraph("applicant.name.last")
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Address")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("applicant.address.singleLine"),
                      new docx.Paragraph("applicant.address.organisation"),
                      new docx.Paragraph("applicant.address.sao"),
                      new docx.Paragraph("applicant.address.buildingName"),
                      new docx.Paragraph("applicant.address.pao"),
                      new docx.Paragraph("applicant.address.street"),
                      new docx.Paragraph("applicant.address.locality"),
                      new docx.Paragraph("applicant.address.town"),
                      new docx.Paragraph("applicant.address.postcode"),
                      new docx.Paragraph("applicant.address.country")
                    ]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE
            }
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("2. Agent Name and Address")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("No agent?")]
                  }),
                  new docx.TableCell({
                    children: [emptyCheckbox]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Agent name")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("applicant.agent.name.first"),
                      new docx.Paragraph("applicant.agent.name.last"),
                      new docx.Paragraph("applicant.agent.company.name")
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Address")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("applicant.agent.address.singleLine"),
                      new docx.Paragraph("applicant.agent.address.organisation"),
                      new docx.Paragraph("applicant.agent.address.sao"),
                      new docx.Paragraph("applicant.agent.address.buildingName"),
                      new docx.Paragraph("applicant.agent.address.pao"),
                      new docx.Paragraph("applicant.agent.address.street"),
                      new docx.Paragraph("applicant.agent.address.locality"),
                      new docx.Paragraph("applicant.agent.address.town"),
                      new docx.Paragraph("applicant.agent.address.postcode"),
                      new docx.Paragraph("applicant.agent.address.country")
                    ]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE
            }
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("3. Site Address Details")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Address same as site address?")]
                  }),
                  new docx.TableCell({
                    children: [checkedCheckbox]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("If no, address")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("property.address.singleLine"),
                      new docx.Paragraph("property.address.line1"),
                      new docx.Paragraph("property.address.line2"),
                      new docx.Paragraph("property.address.organisation"),
                      new docx.Paragraph("property.address.sao"),
                      new docx.Paragraph("property.address.buildingName"),
                      new docx.Paragraph("property.address.pao"),
                      new docx.Paragraph("property.address.street"),
                      new docx.Paragraph("property.address.locality"),
                      new docx.Paragraph("property.address.town"),
                      new docx.Paragraph("property.address.postcode")
                    ]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE
            }
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("4. Pre-application advice")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Has assistance or prior advice been sought from the local authority about this application?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Yes/No")
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If yes, please complete the following information about the advice you were given."
                      )
                    ]
                  }),
                  new docx.TableCell({ children: [] })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Officer name")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("application.preApp.officer")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Pre-app Reference")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("application.preApp.reference")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Date")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("application.preApp.data ??")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Details of pre-application advice received?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("application.preApp.summary")]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE
            }
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [
              new docx.TextRun(
                "5. Lawful Development Certificate \u2013 Interest in Land"
              )
            ]
          }),
          new docx.Paragraph("Please state the applicant\u2019s interest in the land"),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Owner")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Yes/No")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Lessee")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Yes/No")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Occupier")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Yes/No")]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE
            }
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "If Yes to Lessee or Occupier",
                underline: {
                  type: docx.UnderlineType.SINGLE
                }
              }),
              new docx.TextRun(
                ", please give details of the Owner and state whether they have been informed in writing of this application:"
              )
            ]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Name")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Address")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Have they been informed in writing of the application"
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Yes/No")]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE
            }
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "If No to all of the above",
                underline: {
                  type: docx.UnderlineType.SINGLE
                }
              }),
              new docx.TextRun(
                ", please give name and address of anyone you know who has an interest in the land:"
              )
            ]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Name")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Address")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Nature of interest in the land")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Have they been informed of the application"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If they have not been informed of the application please explain why not"
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE
            }
          })
        ]
      }
    ]
  });
};
const TEMPLATES = {
  "LDCP.doc": {
    template: LDCP,
    requirements: ["name"]
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
    if (!resolvePath__default.default(passport.data, path)) {
      return false;
    }
  }
  return true;
}
exports.generateDocxTemplateStream = generateDocxTemplateStream;
exports.generateHTMLMapStream = generateHTMLMapStream;
exports.generateHTMLOverviewStream = generateHTMLOverviewStream;
exports.hasRequiredDataForTemplate = hasRequiredDataForTemplate;

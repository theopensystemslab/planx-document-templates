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
const emptyCheckbox$1 = new docx.Paragraph({
  children: [new docx.SymbolRun("F071")]
});
const checkedCheckbox$1 = new docx.Paragraph({
  children: [new docx.SymbolRun("F0FE")]
});
const LDCP = (passport) => {
  const get2 = (path) => {
    return getString(passport.data, path);
  };
  const getBoolean$1 = (path) => {
    return getBoolean(passport.data, path);
  };
  const hasValue$1 = (path) => {
    return hasValue(passport.data, path);
  };
  const applicantAddress = () => {
    const addressParts = [
      get2("applicant.address.line1"),
      get2("applicant.address.line2"),
      get2("applicant.address.organisation"),
      get2("applicant.address.sao"),
      get2("applicant.address.buildingName"),
      get2("applicant.address.pao"),
      get2("applicant.address.street"),
      get2("applicant.address.locality"),
      get2("applicant.address.town"),
      get2("applicant.address.postcode")
    ];
    return buildParagraphsFromNonEmptyParts$1(addressParts);
  };
  const siteAddress = () => {
    const addressParts = [
      get2("_address.line1"),
      get2("_address.line2"),
      get2("_address.organisation"),
      get2("_address.sao"),
      get2("_address.buildingName"),
      get2("_address.pao"),
      get2("_address.street"),
      get2("_address.locality"),
      get2("_address.town"),
      get2("_address.postcode")
    ];
    return buildParagraphsFromNonEmptyParts$1(addressParts);
  };
  const agentAddress = () => {
    const addressParts = [
      get2("applicant.agent.address.organisation"),
      get2("applicant.agent.address.sao"),
      get2("applicant.agent.address.buildingName"),
      get2("applicant.agent.address.pao"),
      get2("applicant.agent.address.street"),
      get2("applicant.agent.address.locality"),
      get2("applicant.agent.address.town"),
      get2("applicant.agent.address.postcode"),
      get2("applicant.agent.address.country")
    ];
    return buildParagraphsFromNonEmptyParts$1(addressParts);
  };
  const files = () => {
    const propertySitePlan = passport.data["property.drawing.sitePlan"];
    const proposalSitePlan = passport.data["proposal.drawing.sitePlan"];
    const sitePlan = [].concat(propertySitePlan, proposalSitePlan).filter((item) => item !== void 0);
    if (sitePlan && Array.isArray(sitePlan)) {
      return sitePlan.map((item) => String(item["filename"])).filter((item) => item !== void 0);
    }
    return [];
  };
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
                      new docx.Paragraph(get2("applicant.title")),
                      new docx.Paragraph(get2("applicant.name.first")),
                      new docx.Paragraph(get2("applicant.name.last"))
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
                    children: applicantAddress()
                  })
                ]
              })
            ],
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
                    children: [emptyCheckbox$1]
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
                      new docx.Paragraph(get2("applicant.agent.name.first")),
                      new docx.Paragraph(get2("applicant.agent.name.last")),
                      new docx.Paragraph(get2("applicant.agent.company.name"))
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
                    children: agentAddress()
                  })
                ]
              })
            ],
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
                    children: [
                      getBoolean$1("applicant.occupier") ? checkedCheckbox$1 : emptyCheckbox$1
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("If no, address")]
                  }),
                  new docx.TableCell({
                    children: siteAddress()
                  })
                ]
              })
            ],
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
                    children: hasValue$1("application.preAppAdvice") ? getBoolean$1("application.preAppAdvice") ? [new docx.Paragraph("Yes")] : [new docx.Paragraph("No")] : []
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
                    children: [
                      new docx.Paragraph(get2("application.preApp.officer"))
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Pre-app Reference")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("application.preApp.reference"))
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Date")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("application.preApp.data"))]
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
                    children: [
                      new docx.Paragraph(get2("application.preApp.summary"))
                    ]
                  })
                ]
              })
            ],
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
            ],
            spacing: {
              before: 200,
              after: 200
            }
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
            ],
            spacing: {
              before: 200,
              after: 200
            }
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("6. Authority Employee/Member")]
          }),
          new docx.Paragraph({
            text: "It is an important principle of decision-making that the process is open and transparent. For the purposes of this question, \u201Crelated to\u201D means related, by birth or otherwise, closely enough that a fair-minded and informed observer, having considered the facts, would conclude that there was bias on the part of the decision-maker in the local planning authority",
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Paragraph({
            text: "With respect to the Authority, I am: (a) a member of staff (b) an elected member (c) related to a member of staff (d) related to an elected member.",
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Does any of these statements apply to you?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("applicant.declaration.employee")),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily.name")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily.relationship")
                      ),
                      new docx.Paragraph(get2("applicant.declaration.member")),
                      new docx.Paragraph(get2("applicant.declaration.memberFamily")),
                      new docx.Paragraph(
                        get2("applicant.declaration.memberFamily.name")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.memberFamily.relationship")
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If Yes, please provide details of the name, role, and how you are related to them"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("applicant.declaration.employee")),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily.name")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily.relationship")
                      ),
                      new docx.Paragraph(get2("applicant.declaration.member")),
                      new docx.Paragraph(get2("applicant.declaration.memberFamily")),
                      new docx.Paragraph(
                        get2("applicant.declaration.memberFamily.name")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.memberFamily.relationship")
                      )
                    ]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("7. Grounds for Application")]
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Information About the Exiting Use(s)",
                underline: {
                  type: docx.UnderlineType.SINGLE
                }
              })
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Please explain why you consider the existing or last use of the land is lawful, or why you consider that any existing buildings, which it is proposed to alter, or extend are lawful:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Please list the supporting documentary evidence (such as a planning permission) which accompanies this application:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: files().map((filename) => {
                      return new docx.Paragraph(filename);
                    })
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If you consider the existing, or last use is within a 'Use Class', state which one:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Information About the Proposed Use(s)",
                underline: {
                  type: docx.UnderlineType.SINGLE
                }
              })
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If you consider the proposed use is within a \u2018Use Class\u2019, state which one:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Is the proposed operation or use Temporary or Permanent?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Temporary/Permanent")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("If temporary, please give details:")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Please state why you consider that a Lawful Development Certificate should be granted for this proposal:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("8. Description of Proposal")]
          }),
          new docx.Paragraph("Does the proposal consist of, or include:"),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "a. The carrying out of building or other operations? "
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Yes/No")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If Yes to a, please give detailed description of all such operations (includes the need to describe any proposal to alter or create a new access, layout any new street, construct any associated hard-standings, means of enclosure or means of draining the land/buildings) and indicate on your plans (in the case of a proposed building the plan should indicate the precise siting and exact dimensions):"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("proposal.description"))]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "b. Change of use of the land or building(s)?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Yes/No")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If Yes to b, please give a full description of the scale and nature of the proposed use, including the processes to be carried out, any machinery to be installed and the hours the proposed use will be carried out:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("proposal.description"))]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If Yes to b, please describe fully the existing or the last known use, with the date this use ceased:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If Yes to b, please describe fully the existing or the last known use, with the date this use ceased:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("proposal.started"))]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [
              new docx.TextRun(
                "9. Additional Information Requirements of the Mayor of London"
              )
            ]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Title number unknown?")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Yes/No")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Title number:")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Energy Performance Certificate reference unknown?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("EPC number:")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Gross internal Floor Area to be added (sqm)"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Number of additional bedrooms proposed")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Number of additional bathrooms proposed")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Existing and Proposed Vehicle Parking spaces for the following:",
                bold: true
              })
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Existing")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Proposed")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("a. Cars")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("b. Light Good Vehicles / Public Vehicles")
                    ]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("c. Motorcycles")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("d. Disabled Person Parking")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("e. Cycle spaces")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("f. Bus")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("g. Residential only off-street parking")
                    ]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("h. Car Club")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("i. Other")]
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("10. Declaration")]
          }),
          new docx.Paragraph({
            text: "I/We hereby apply for a Lawful Development Certificate as described in this form and the accompanying plans/drawings and additional information. I/We confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine opinions of the person(s) giving them.",
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Signed")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("application.declaration"))]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Signed by")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.SymbolRun("F071"),
                          new docx.TextRun("Applicant")
                        ]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Agent")]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Date")]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph("(date cannot be pre-application submission)"),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "WARNING:",
                bold: true
              })
            ],
            spacing: {
              before: 200
            }
          }),
          new docx.Paragraph({
            text: "The amended section 194 of the 1990 Act provides that it is an offence to furnish false or misleading information or to withhold material information with intent to deceive. Section 193(7) enables the authority to revoke, at any time, a certificate they may have been issued as a result of such false or misleading information.",
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("11. Applicant Contact Details")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Phone")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("applicant.phone.primary")),
                      new docx.Paragraph(get2("applicant.phone.secondary"))
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Email")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("applicant.email"))]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("12. Agent Contact Details")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Phone")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("applicant.agent.phone.primary")),
                      new docx.Paragraph(get2("applicant.agent.phone.secondary"))
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Email")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("applicant.agent.email"))]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("13. Site Visit")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Can the site be seen from a:"),
                      new docx.Paragraph("Public road"),
                      new docx.Paragraph("Public footpath"),
                      new docx.Paragraph("Bridleway"),
                      new docx.Paragraph("Or other public land?")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.SymbolRun("F071"),
                          new docx.TextRun("Applicant")
                        ]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Agent")]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Other")]
                      })
                    ]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "If Other has been selected",
                underline: {
                  type: docx.UnderlineType.SINGLE
                }
              }),
              new docx.TextRun(
                ", please provide a contact name, telephone number and email address:"
              )
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Other contact for site visit."),
                      new docx.Paragraph("Name")
                    ]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Phone")]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Email")]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              })
            ],
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
        ]
      }
    ]
  });
};
function buildParagraphsFromNonEmptyParts$1(parts) {
  return parts.filter((part) => part !== "").map((part) => {
    return new docx.Paragraph(part);
  });
}
const emptyCheckbox = new docx.Paragraph({
  children: [new docx.SymbolRun("F071")]
});
const checkedCheckbox = new docx.Paragraph({
  children: [new docx.SymbolRun("F0FE")]
});
const LDCE = (passport) => {
  const get2 = (path) => {
    return getString(passport.data, path);
  };
  const getBoolean$1 = (path) => {
    return getBoolean(passport.data, path);
  };
  const hasValue$1 = (path) => {
    return hasValue(passport.data, path);
  };
  const applicantAddress = () => {
    const addressParts = [
      get2("applicant.address.line1"),
      get2("applicant.address.line2"),
      get2("applicant.address.organisation"),
      get2("applicant.address.sao"),
      get2("applicant.address.buildingName"),
      get2("applicant.address.pao"),
      get2("applicant.address.street"),
      get2("applicant.address.locality"),
      get2("applicant.address.town"),
      get2("applicant.address.postcode")
    ];
    return buildParagraphsFromNonEmptyParts(addressParts);
  };
  const siteAddress = () => {
    const addressParts = [
      get2("_address.line1"),
      get2("_address.line2"),
      get2("_address.organisation"),
      get2("_address.sao"),
      get2("_address.buildingName"),
      get2("_address.pao"),
      get2("_address.street"),
      get2("_address.locality"),
      get2("_address.town"),
      get2("_address.postcode")
    ];
    return buildParagraphsFromNonEmptyParts(addressParts);
  };
  const agentAddress = () => {
    const addressParts = [
      get2("applicant.agent.address.organisation"),
      get2("applicant.agent.address.sao"),
      get2("applicant.agent.address.buildingName"),
      get2("applicant.agent.address.pao"),
      get2("applicant.agent.address.street"),
      get2("applicant.agent.address.locality"),
      get2("applicant.agent.address.town"),
      get2("applicant.agent.address.postcode"),
      get2("applicant.agent.address.country")
    ];
    return buildParagraphsFromNonEmptyParts(addressParts);
  };
  return new docx.Document({
    creator: "PlanX",
    title: "LDC-E",
    description: "LDC-E Application",
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
                "Application for a Lawful Development Certificate for an Existing use or operation or activity including those in breach of a planning condition."
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
                      new docx.Paragraph(get2("applicant.title")),
                      new docx.Paragraph(get2("applicant.name.first")),
                      new docx.Paragraph(get2("applicant.name.last"))
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
                    children: applicantAddress()
                  })
                ]
              })
            ],
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
                      new docx.Paragraph(get2("applicant.agent.name.first")),
                      new docx.Paragraph(get2("applicant.agent.name.last")),
                      new docx.Paragraph(get2("applicant.agent.company.name"))
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
                    children: agentAddress()
                  })
                ]
              })
            ],
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
                    children: [
                      getBoolean$1("applicant.occupier") ? checkedCheckbox : emptyCheckbox
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("If no, address")]
                  }),
                  new docx.TableCell({
                    children: siteAddress()
                  })
                ]
              })
            ],
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
                    children: hasValue$1("application.preAppAdvice") ? getBoolean$1("application.preAppAdvice") ? [new docx.Paragraph("Yes")] : [new docx.Paragraph("No")] : []
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
                    children: [
                      new docx.Paragraph(get2("application.preApp.officer"))
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Pre-app Reference")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("application.preApp.reference"))
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Date")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("application.preApp.data"))]
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
                    children: [
                      new docx.Paragraph(get2("application.preApp.summary"))
                    ]
                  })
                ]
              })
            ],
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
            ],
            spacing: {
              before: 200,
              after: 200
            }
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
            ],
            spacing: {
              before: 200,
              after: 200
            }
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("6. Authority Employee/Member")]
          }),
          new docx.Paragraph({
            text: "It is an important principle of decision-making that the process is open and transparent. For the purposes of this question, \u201Crelated to\u201D means related, by birth or otherwise, closely enough that a fair-minded and informed observer, having considered the facts, would conclude that there was bias on the part of the decision-maker in the local planning authority",
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun(
                "With respect to the Authority, I am: (a) a member of staff (b) an elected member (c) related to a member of staff (d) related to an elected member."
              )
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Does any of these statements apply to you?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("applicant.declaration.employee")),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily.name")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily.relationship")
                      ),
                      new docx.Paragraph(get2("applicant.declaration.member")),
                      new docx.Paragraph(get2("applicant.declaration.memberFamily")),
                      new docx.Paragraph(
                        get2("applicant.declaration.memberFamily.name")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.memberFamily.relationship")
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If Yes, please provide details of the name, role, and how you are related to them"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("applicant.declaration.employee")),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily.name")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.employeeFamily.relationship")
                      ),
                      new docx.Paragraph(get2("applicant.declaration.member")),
                      new docx.Paragraph(get2("applicant.declaration.memberFamily")),
                      new docx.Paragraph(
                        get2("applicant.declaration.memberFamily.name")
                      ),
                      new docx.Paragraph(
                        get2("applicant.declaration.memberFamily.relationship")
                      )
                    ]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [
              new docx.TextRun("7. Description of Use, Building Works or Activity")
            ]
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun(
                "Please state for which of these you need a lawful development certificate/building works (you must tick at least one option):"
              )
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("An existing use:")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Yes")]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Existing building works:")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Yes")]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "An existing use, building work or activity in breach of a condition"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Yes")]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Being a use, building works or activity which is still going on at the date of this application."
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If Yes to either \u2018an existing use\u2019 or \u2018an existing use in breach of a condition\u2019 please state which one of the Use Classes the use relates to:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [
              new docx.TextRun(
                "8. Description of Existing Use, Building Works or Activity"
              )
            ]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "What is the existing site use(s) for which the certificate of lawfulness is being sought? Please fully describe each use and state which part of the land the use relates to"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [
              new docx.TextRun(
                "9. Grounds For Application for a Lawful Development Certificate"
              )
            ]
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Please state under what grounds is the certificate sought (you must tick at least one box):"
              })
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            columnWidths: [5, 95],
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [emptyCheckbox]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "The use began more than 10 years before the date of this application."
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [emptyCheckbox]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "The use, building works or activity in breach of condition began more than 10 years before the date of this application."
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [emptyCheckbox]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "The use began within the last 10 years, as a result of a change of use not requiring planning permission, and there has not been a change of use requiring planning permission in the last 10 years."
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [emptyCheckbox]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "The building works (for instance, building or engineering works) were substantially completed more than four years before the date of this application."
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [emptyCheckbox]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "The use as a single dwelling house began more than four years before the date of this application."
                      )
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [emptyCheckbox]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Other - please specify (this might include claims that the change of use or building work was not development, or that it benefited from planning permission granted under the Act or by the General Permitted Development Order)."
                      )
                    ]
                  })
                ]
              })
            ],
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
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If the certificate is sought on 'Other' grounds please give details:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "If applicable, please give the reference number of any existing planning permission, lawful development certificate or enforcement notice affecting the application site. Include its date and the number of any condition being breached:"
              })
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Reference number:")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Condition number:")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Date (DD/MM/YYYY):"),
                      new docx.Paragraph("(must be pre application submission)")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Please state why a Lawful Development Certificate should be granted:"
              })
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_3,
            children: [new docx.TextRun("Exisiting Housing")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Number of bedrooms",
                            italics: true
                          })
                        ]
                      })
                    ],
                    columnSpan: 5
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Total",
                            italics: true
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Market Housing",
                            bold: true
                          })
                        ]
                      })
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("1")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("2")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("3")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("4+")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Unknown")]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Houses")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Flats & Maisonettes")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Live-work Units")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Cluster Flats")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Sheltered Housing")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Bedsit/Studios")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Unknown")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Total:",
                            bold: true
                          })
                        ]
                      })
                    ],
                    columnSpan: 6
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Enter if relevant")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [
              new docx.TextRun(
                "10. Information In Support of a Lawful Development Certificate"
              )
            ]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "When was the use or activity begun, or the building work substantially completed?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Not supplied"),
                      new docx.Paragraph(""),
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Date (DD/MM/YYYY) (must be pre application submission)",
                            underline: {
                              type: docx.UnderlineType.SINGLE
                            }
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "In the case of an existing use or activity in breach of conditions has there been any interruption:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Yes")]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("No")]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If Yes, please provide details of the dates, duration and any discontinuance of the development which is the subject of this application. If your application is based on the claim that a use or activity has been ongoing for a period of years, please state exactly when any interruption occurred:"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "In the case of an existing use of land, has there been any material change of use of the land since the start of the use for which a certificate is sought?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Yes")]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("No")]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("If Yes, please provide details:")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Does the application for a Certificate relate to a residential use where the number of residential units has changed?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Yes")]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("No")]
                      }),
                      new docx.Paragraph(""),
                      new docx.Paragraph("If Yes, complete table below")
                    ]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_3,
            children: [new docx.TextRun("Proposed Housing")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Number of bedrooms",
                            italics: true
                          })
                        ]
                      })
                    ],
                    columnSpan: 5
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Total",
                            italics: true
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Market Housing",
                            bold: true
                          })
                        ]
                      })
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("1")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("2")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("3")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("4+")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Unknown")]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Houses")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Flats & Maisonettes")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Live-work Units")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Cluster Flats")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Sheltered Housing")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Bedsit/Studios")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Unknown")]
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
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.TextRun({
                            text: "Total:",
                            bold: true
                          })
                        ]
                      })
                    ],
                    columnSpan: 6
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Enter if relevant")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Social/ Intermediate/ Key Worker Housing")
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.SymbolRun("F071"),
                          new docx.TextRun("None relevant")
                        ]
                      }),
                      new docx.Paragraph(""),
                      new docx.Paragraph(
                        "(If relevant to the application,  set out details in a table like the above)"
                      )
                    ]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [
              new docx.TextRun(
                "11. Additional Information Requirements of the Mayor of London"
              )
            ]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Title number unknown?")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Yes/No")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Title number:")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Energy Performance Certificate reference unknown?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("EPC number:")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "Gross internal Floor Area to be added (sqm)"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Number of additional bedrooms proposed")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Number of additional bathrooms proposed")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("")]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Existing and Proposed Vehicle Parking spaces for the following:",
                bold: true
              })
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Existing")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Proposed")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("a. Cars")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("b. Light Good Vehicles / Public Vehicles")
                    ]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("c. Motorcycles")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("d. Disabled Person Parking")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("e. Cycle spaces")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("f. Bus")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("g. Residential only off-street parking")
                    ]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("h. Car Club")]
                  }),
                  new docx.TableCell({
                    children: []
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("i. Other")]
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("12. Declaration")]
          }),
          new docx.Paragraph({
            text: "I/We hereby apply for a Lawful Development Certificate as described in this form and the accompanying plans/drawings and additional information. I/We confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine opinions of the person(s) giving them.",
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Signed")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("application.declaration"))]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Signed by")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.SymbolRun("F071"),
                          new docx.TextRun("Applicant")
                        ]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Agent")]
                      })
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Date")]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph("(date cannot be pre-application submission)"),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "WARNING:",
                bold: true
              })
            ],
            spacing: {
              before: 200
            }
          }),
          new docx.Paragraph({
            text: "The amended section 194 of the 1990 Act provides that it is an offence to furnish false or misleading information or to withhold material information with intent to deceive. Section 193(7) enables the authority to revoke, at any time, a certificate they may have been issued as a result of such false or misleading information.",
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("13. Applicant Contact Details")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Phone")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("applicant.phone.primary")),
                      new docx.Paragraph(get2("applicant.phone.secondary"))
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Email")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("applicant.email"))]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("14. Agent Contact Details")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Phone")]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(get2("applicant.agent.phone.primary")),
                      new docx.Paragraph(get2("applicant.agent.phone.secondary"))
                    ]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Email")]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph(get2("applicant.agent.email"))]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            children: [new docx.TextRun("15. Site Visit")]
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Can the site be seen from a:"),
                      new docx.Paragraph("Public road"),
                      new docx.Paragraph("Public footpath"),
                      new docx.Paragraph("Bridleway"),
                      new docx.Paragraph("Or other public land?")
                    ]
                  }),
                  new docx.TableCell({
                    children: [new docx.Paragraph("Not supplied")]
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph(
                        "If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?"
                      )
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.SymbolRun("F071"),
                          new docx.TextRun("Applicant")
                        ]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Agent")]
                      }),
                      new docx.Paragraph({
                        children: [new docx.SymbolRun("F071"), new docx.TextRun("Other")]
                      })
                    ]
                  })
                ]
              })
            ],
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
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "If Other has been selected",
                underline: {
                  type: docx.UnderlineType.SINGLE
                }
              }),
              new docx.TextRun(
                ", please provide a contact name, telephone number and email address:"
              )
            ],
            spacing: {
              before: 200,
              after: 200
            }
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph("Other contact for site visit."),
                      new docx.Paragraph("Name")
                    ]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Phone")]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    children: [new docx.Paragraph("Email")]
                  }),
                  new docx.TableCell({
                    children: []
                  })
                ]
              })
            ],
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
        ]
      }
    ]
  });
};
function buildParagraphsFromNonEmptyParts(parts) {
  return parts.filter((part) => part !== "").map((part) => {
    return new docx.Paragraph(part);
  });
}
const TEMPLATES = {
  blank: {
    template: () => new docx.Document({
      sections: []
    }),
    requirements: []
  },
  "LDCE.doc": {
    template: LDCE,
    requirements: []
  },
  "LDCP.doc": {
    template: LDCP,
    requirements: ["applicant.title", "applicant.name.first", "applicant.name.last", "_address.postcode"]
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

import resolvePath from "lodash.get";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import prettyTitle from "lodash.startcase";
import styled from "@emotion/styled";
import * as jsxRuntime from "react/jsx-runtime";
import Grid from "@mui/material/Grid";
import { Global, css } from "@emotion/react";
import { Paragraph, SymbolRun, Document, AlignmentType, HeadingLevel, TextRun, Table, TableRow, TableCell, WidthType, UnderlineType, Packer } from "docx";
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
const emptyCheckbox = new Paragraph({
  children: [new SymbolRun("F071")]
});
const checkedCheckbox = new Paragraph({
  children: [new SymbolRun("F0FE")]
});
const LDCP = (passport) => {
  return new Document({
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
            alignment: AlignmentType.CENTER,
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
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun(
                "Application for a Lawful Development Certificate for a Proposed use or development."
              )
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun("Town and Country Planning Act 1990")]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun(
                "Publication of applications on planning authority websites"
              )
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Information provided on this form and in supporting documents may be published on the authority's planning register and website."
              )
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("1. Applicant Name and Address")]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Name")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("applicant.title"),
                      new Paragraph("applicant.name.first"),
                      new Paragraph("applicant.name.last")
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Address")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("applicant.address.singleLine"),
                      new Paragraph("applicant.address.organisation"),
                      new Paragraph("applicant.address.sao"),
                      new Paragraph("applicant.address.buildingName"),
                      new Paragraph("applicant.address.pao"),
                      new Paragraph("applicant.address.street"),
                      new Paragraph("applicant.address.locality"),
                      new Paragraph("applicant.address.town"),
                      new Paragraph("applicant.address.postcode"),
                      new Paragraph("applicant.address.country")
                    ]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            }
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("2. Agent Name and Address")]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("No agent?")]
                  }),
                  new TableCell({
                    children: [emptyCheckbox]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Agent name")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("applicant.agent.name.first"),
                      new Paragraph("applicant.agent.name.last"),
                      new Paragraph("applicant.agent.company.name")
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Address")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("applicant.agent.address.singleLine"),
                      new Paragraph("applicant.agent.address.organisation"),
                      new Paragraph("applicant.agent.address.sao"),
                      new Paragraph("applicant.agent.address.buildingName"),
                      new Paragraph("applicant.agent.address.pao"),
                      new Paragraph("applicant.agent.address.street"),
                      new Paragraph("applicant.agent.address.locality"),
                      new Paragraph("applicant.agent.address.town"),
                      new Paragraph("applicant.agent.address.postcode"),
                      new Paragraph("applicant.agent.address.country")
                    ]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            }
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("3. Site Address Details")]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Address same as site address?")]
                  }),
                  new TableCell({
                    children: [checkedCheckbox]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("If no, address")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("property.address.singleLine"),
                      new Paragraph("property.address.line1"),
                      new Paragraph("property.address.line2"),
                      new Paragraph("property.address.organisation"),
                      new Paragraph("property.address.sao"),
                      new Paragraph("property.address.buildingName"),
                      new Paragraph("property.address.pao"),
                      new Paragraph("property.address.street"),
                      new Paragraph("property.address.locality"),
                      new Paragraph("property.address.town"),
                      new Paragraph("property.address.postcode")
                    ]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            }
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("4. Pre-application advice")]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Has assistance or prior advice been sought from the local authority about this application?"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("Yes/No")
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If yes, please complete the following information about the advice you were given."
                      )
                    ]
                  }),
                  new TableCell({ children: [] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Officer name")]
                  }),
                  new TableCell({
                    children: [new Paragraph("application.preApp.officer")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Pre-app Reference")]
                  }),
                  new TableCell({
                    children: [new Paragraph("application.preApp.reference")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Date")]
                  }),
                  new TableCell({
                    children: [new Paragraph("application.preApp.data ??")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Details of pre-application advice received?"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("application.preApp.summary")]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            }
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun(
                "5. Lawful Development Certificate \u2013 Interest in Land"
              )
            ]
          }),
          new Paragraph("Please state the applicant\u2019s interest in the land"),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Owner")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Lessee")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Occupier")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "If Yes to Lessee or Occupier",
                underline: {
                  type: UnderlineType.SINGLE
                }
              }),
              new TextRun(
                ", please give details of the Owner and state whether they have been informed in writing of this application:"
              )
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Name")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Address")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Have they been informed in writing of the application"
                      )
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")]
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "If No to all of the above",
                underline: {
                  type: UnderlineType.SINGLE
                }
              }),
              new TextRun(
                ", please give name and address of anyone you know who has an interest in the land:"
              )
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Name")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Address")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Nature of interest in the land")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Have they been informed of the application"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If they have not been informed of the application please explain why not"
                      )
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
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
  return renderToPipeableStream(/* @__PURE__ */ jsx(SubmissionOverviewDocument, {
    data: planXExportData
  }));
}
function generateHTMLMapStream(geojson) {
  return renderToPipeableStream(/* @__PURE__ */ jsx(BoundaryMapDocument, {
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
  return Packer.toStream(document);
}
function hasRequiredDataForTemplate({
  templateName,
  passport
}) {
  const template = TEMPLATES[templateName];
  if (!template)
    throw new Error(`Template "${templateName}" not found`);
  for (const path of template.requirements) {
    if (!resolvePath(passport.data, path)) {
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

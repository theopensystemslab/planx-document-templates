import _get from "lodash.get";
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
  const get = (path) => {
    const value = _get(passport.data, path);
    return value ? `${value}` : "";
  };
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
                      new Paragraph(get("applicant.title")),
                      new Paragraph(get("applicant.name.first")),
                      new Paragraph(get("applicant.name.last"))
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
                      new Paragraph(get("_address.singleLine")),
                      new Paragraph(get("_address.organisation")),
                      new Paragraph(get("_address.sao")),
                      new Paragraph(get("_address.buildingName")),
                      new Paragraph(get("_address.pao")),
                      new Paragraph(get("_address.street")),
                      new Paragraph(get("_address.locality")),
                      new Paragraph(get("_address.town")),
                      new Paragraph(get("_address.postcode")),
                      new Paragraph(get("_address.country"))
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
                      new Paragraph(get("applicant.agent.name.first")),
                      new Paragraph(get("applicant.agent.name.last")),
                      new Paragraph(get("applicant.agent.company.name"))
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
                      new Paragraph(get("applicant.agent.address.singleLine")),
                      new Paragraph(
                        get("applicant.agent.address.organisation")
                      ),
                      new Paragraph(get("applicant.agent.address.sao")),
                      new Paragraph(
                        get("applicant.agent.address.buildingName")
                      ),
                      new Paragraph(get("applicant.agent.address.pao")),
                      new Paragraph(get("applicant.agent.address.street")),
                      new Paragraph(get("applicant.agent.address.locality")),
                      new Paragraph(get("applicant.agent.address.town")),
                      new Paragraph(get("applicant.agent.address.postcode")),
                      new Paragraph(get("applicant.agent.address.country"))
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
                      new Paragraph(get("property.address.line1")),
                      new Paragraph(get("property.address.line2")),
                      new Paragraph(get("property.address.organisation")),
                      new Paragraph(get("property.address.sao")),
                      new Paragraph(get("property.address.buildingName")),
                      new Paragraph(get("property.address.pao")),
                      new Paragraph(get("property.address.street")),
                      new Paragraph(get("property.address.locality")),
                      new Paragraph(get("property.address.town")),
                      new Paragraph(get("property.address.postcode"))
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
                    children: [
                      new Paragraph(get("application.preApp.officer"))
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Pre-app Reference")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("application.preApp.reference"))
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Date")]
                  }),
                  new TableCell({
                    children: [new Paragraph(get("application.preApp.data"))]
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
                    children: [
                      new Paragraph(get("application.preApp.summary"))
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
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("6. Authority Employee/Member")]
          }),
          new Paragraph(
            "It is an important principle of decision-making that the process is open and transparent. For the purposes of this question, \u201Crelated to\u201D means related, by birth or otherwise, closely enough that a fair-minded and informed observer, having considered the facts, would conclude that there was bias on the part of the decision-maker in the local planning authority"
          ),
          new Paragraph(
            "With respect to the Authority, I am: (a) a member of staff (b) an elected member (c) related to a member of staff (d) related to an elected member."
          ),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Does any of these statements apply to you?"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("applicant.declaration.employee")),
                      new Paragraph(
                        get("applicant.declaration.employeeFamily")
                      ),
                      new Paragraph(
                        get("applicant.declaration.employeeFamily.name")
                      ),
                      new Paragraph(
                        get("applicant.declaration.employeeFamily.relationship")
                      ),
                      new Paragraph(get("applicant.declaration.member")),
                      new Paragraph(get("applicant.declaration.memberFamily")),
                      new Paragraph(
                        get("applicant.declaration.memberFamily.name")
                      ),
                      new Paragraph(
                        get("applicant.declaration.memberFamily.relationship")
                      )
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes, please provide details of the name, role, and how you are related to them"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("applicant.declaration.employee")),
                      new Paragraph(
                        get("applicant.declaration.employeeFamily")
                      ),
                      new Paragraph(
                        get("applicant.declaration.employeeFamily.name")
                      ),
                      new Paragraph(
                        get("applicant.declaration.employeeFamily.relationship")
                      ),
                      new Paragraph(get("applicant.declaration.member")),
                      new Paragraph(get("applicant.declaration.memberFamily")),
                      new Paragraph(
                        get("applicant.declaration.memberFamily.name")
                      ),
                      new Paragraph(
                        get("applicant.declaration.memberFamily.relationship")
                      )
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
            children: [new TextRun("7. Grounds for Application")]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Information About the Exiting Use(s)",
                underline: {
                  type: UnderlineType.SINGLE
                }
              })
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Please explain why you consider the existing or last use of the land is lawful, or why you consider that any existing buildings, which it is proposed to alter, or extend are lawful:"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Please list the supporting documentary evidence (such as a planning permission) which accompanies this application:"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("files")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If you consider the existing, or last use is within a 'Use Class', state which one:"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")]
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
                text: "Information About the Proposed Use(s)",
                underline: {
                  type: UnderlineType.SINGLE
                }
              })
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If you consider the proposed use is within a \u2018Use Class\u2019, state which one:"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Is the proposed operation or use Temporary or Permanent?"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Temporary/Permanent")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("If temporary, please give details:")
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Please state why you consider that a Lawful Development Certificate should be granted for this proposal:"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")]
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
            children: [new TextRun("8. Description of Proposal")]
          }),
          new Paragraph("Does the proposal consist of, or include:"),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "a. The carrying out of building or other operations? "
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes to a, please give detailed description of all such operations (includes the need to describe any proposal to alter or create a new access, layout any new street, construct any associated hard-standings, means of enclosure or means of draining the land/buildings) and indicate on your plans (in the case of a proposed building the plan should indicate the precise siting and exact dimensions):"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph(get("proposal.description"))]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "b. Change of use of the land or building(s)?"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes to b, please give a full description of the scale and nature of the proposed use, including the processes to be carried out, any machinery to be installed and the hours the proposed use will be carried out:"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph(get("proposal.description"))]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes to b, please describe fully the existing or the last known use, with the date this use ceased:"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes to b, please describe fully the existing or the last known use, with the date this use ceased:"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph(get("proposal.started"))]
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
                "9. Additional Information Requirements of the Mayor of London"
              )
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Title number unknown?")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Title number:")]
                  }),
                  new TableCell({
                    children: [new Paragraph("")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Energy Performance Certificate reference unknown?"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("EPC number:")]
                  }),
                  new TableCell({
                    children: [new Paragraph("")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Gross internal Floor Area to be added (sqm)"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Number of additional bedrooms proposed")
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Number of additional bathrooms proposed")
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("")]
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
                text: "Existing and Proposed Vehicle Parking spaces for the following:",
                bold: true
              })
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: [new Paragraph("Existing")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Proposed")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("a. Cars")]
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("b. Light Good Vehicles / Public Vehicles")
                    ]
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("c. Motorcycles")]
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("d. Disabled Person Parking")]
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("e. Cycle spaces")]
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("f. Bus")]
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("g. Residential only off-street parking")
                    ]
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("h. Car Club")]
                  }),
                  new TableCell({
                    children: []
                  }),
                  new TableCell({
                    children: []
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("i. Other")]
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
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("10. Declaration")]
          }),
          new Paragraph(
            "I/We hereby apply for a Lawful Development Certificate as described in this form and the accompanying plans/drawings and additional information. I/We confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine opinions of the person(s) giving them."
          ),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Signed")]
                  }),
                  new TableCell({
                    children: [new Paragraph(get("application.declaration"))]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Signed by")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new SymbolRun("F071"),
                          new TextRun("Applicant")
                        ]
                      }),
                      new Paragraph({
                        children: [new SymbolRun("F071"), new TextRun("Agent")]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Date")]
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
          }),
          new Paragraph("(date cannot be pre-application submission)"),
          new Paragraph({
            children: [
              new TextRun({
                text: "WARNING:",
                bold: true
              })
            ]
          }),
          new Paragraph(
            "The amended section 194 of the 1990 Act provides that it is an offence to furnish false or misleading information or to withhold material information with intent to deceive. Section 193(7) enables the authority to revoke, at any time, a certificate they may have been issued as a result of such false or misleading information."
          ),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("11. Applicant Contact Details")]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Phone")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("applicant.phone.primary")),
                      new Paragraph(get("applicant.phone.secondary"))
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Email")]
                  }),
                  new TableCell({
                    children: [new Paragraph(get("applicant.email"))]
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
            children: [new TextRun("12. Agent Contact Details")]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Phone")]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("applicant.agent.phone.primary")),
                      new Paragraph(get("applicant.agent.phone.secondary"))
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Email")]
                  }),
                  new TableCell({
                    children: [new Paragraph(get("applicant.agent.email"))]
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
            children: [new TextRun("13. Site Visit")]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Can the site be seen from a: \nPublic road\n Public footpath\n Bridleway \n Or other public land?"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        " If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?"
                      )
                    ]
                  }),
                  new TableCell({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new SymbolRun("F071"),
                              new TextRun("Applicant")
                            ]
                          }),
                          new Paragraph({
                            children: [
                              new SymbolRun("F071"),
                              new TextRun("Agent")
                            ]
                          }),
                          new Paragraph({
                            children: [
                              new SymbolRun("F071"),
                              new TextRun("Other")
                            ]
                          })
                        ]
                      })
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
            children: [
              new TextRun({
                text: "If Other has been selected",
                underline: {
                  type: UnderlineType.SINGLE
                }
              }),
              new TextRun(
                ", please provide a contact name, telephone number and email address:"
              )
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Other contact for site visit.\nName")
                    ]
                  }),
                  new TableCell({
                    children: [new Paragraph("Phone")]
                  }),
                  new TableCell({
                    children: [new Paragraph("Email")]
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
  blank: {
    template: () => new Document({
      sections: []
    }),
    requirements: []
  },
  "LDCP.doc": {
    template: LDCP,
    requirements: ["applicant.title", "applicant.name.first", "applicant.name.last", "_address.postcode"]
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
    if (!_get(passport.data, path)) {
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

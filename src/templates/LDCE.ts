import {
  getString as _getString,
  getBoolean as _getBoolean,
  hasValue as _hasValue,
} from "./helpers";
import {
  Document,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  UnderlineType,
  Paragraph,
  TextRun,
  SymbolRun,
} from "docx";

const emptyCheckbox = new Paragraph({
  children: [new SymbolRun("F071")],
});
const checkedCheckbox = new Paragraph({
  children: [new SymbolRun("F0FE")],
});

export const LDCE = (passport: { data: object }) => {
  const get = (path: string): string => {
    return _getString(passport.data, path);
  };
  const getBoolean = (path: string): boolean => {
    return _getBoolean(passport.data, path);
  };
  const hasValue = (path: string): boolean => {
    return _hasValue(passport.data, path);
  };

  const applicantAddress = () => {
    const addressParts = [
      get("applicant.address.line1"),
      get("applicant.address.line2"),
      get("applicant.address.organisation"),
      get("applicant.address.sao"),
      get("applicant.address.buildingName"),
      get("applicant.address.pao"),
      get("applicant.address.street"),
      get("applicant.address.locality"),
      get("applicant.address.town"),
      get("applicant.address.postcode"),
    ];
    return buildParagraphsFromNonEmptyParts(addressParts);
  };

  const siteAddress = () => {
    const addressParts = [
      get("_address.line1"),
      get("_address.line2"),
      get("_address.organisation"),
      get("_address.sao"),
      get("_address.buildingName"),
      get("_address.pao"),
      get("_address.street"),
      get("_address.locality"),
      get("_address.town"),
      get("_address.postcode"),
    ];
    return buildParagraphsFromNonEmptyParts(addressParts);
  };

  const agentAddress = () => {
    const addressParts = [
      get("applicant.agent.address.organisation"),
      get("applicant.agent.address.sao"),
      get("applicant.agent.address.buildingName"),
      get("applicant.agent.address.pao"),
      get("applicant.agent.address.street"),
      get("applicant.agent.address.locality"),
      get("applicant.agent.address.town"),
      get("applicant.agent.address.postcode"),
      get("applicant.agent.address.country"),
    ];
    return buildParagraphsFromNonEmptyParts(addressParts);
  };

  // QUESTION: is this the right collection of files?
  const files = (): string[] => {
    // eslint-disable-next-line
    const propertySitePlan = passport.data["property.drawing.sitePlan"];
    // eslint-disable-next-line
    const proposalSitePlan = passport.data["proposal.drawing.sitePlan"];
    const sitePlan = []
      // eslint-disable-next-line
      .concat(propertySitePlan, proposalSitePlan)
      .filter((item) => item !== undefined);
    if (sitePlan && Array.isArray(sitePlan)) {
      return (
        sitePlan
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .map((item) => String(item["filename"]))
          .filter((item) => item !== undefined)
      );
    }
    return [];
  };

  return new Document({
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
            color: "000000",
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 120,
            },
          },
        },
        heading2: {
          run: {
            font: "Arial",
            size: 24,
            bold: true,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120,
            },
          },
        },
        heading3: {
          run: {
            font: "Arial",
            size: 22,
            bold: true,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120,
            },
          },
        },
      },
    },
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun(
                "Application for a Lawful Development Certificate for an Existing use or operation or activity including those in breach of a planning condition."
              ),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun("Town and Country Planning Act 1990")],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun(
                "Publication of applications on planning authority websites"
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Information provided on this form and in supporting documents may be published on the authority's planning register and website."
              ),
            ],
          }),

          // 1
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("1. Applicant Name and Address")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Name")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("applicant.title")),
                      new Paragraph(get("applicant.name.first")),
                      new Paragraph(get("applicant.name.last")),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Address")],
                  }),
                  new TableCell({
                    children: applicantAddress(),
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 2
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("2. Agent Name and Address")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("No agent?")],
                  }),
                  new TableCell({
                    children: [emptyCheckbox],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Agent name")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("applicant.agent.name.first")),
                      new Paragraph(get("applicant.agent.name.last")),
                      new Paragraph(get("applicant.agent.company.name")),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Address")],
                  }),
                  new TableCell({
                    children: agentAddress(),
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 3
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("3. Site Address Details")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Address same as site address?")],
                  }),
                  new TableCell({
                    children: [
                      getBoolean("applicant.occupier")
                        ? checkedCheckbox
                        : emptyCheckbox,
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("If no, address")],
                  }),
                  new TableCell({
                    children: siteAddress(),
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 4
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("4. Pre-application advice")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Has assistance or prior advice been sought from the local authority about this application?"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: hasValue("application.preAppAdvice")
                      ? getBoolean("application.preAppAdvice")
                        ? [new Paragraph("Yes")]
                        : [new Paragraph("No")]
                      : [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If yes, please complete the following information about the advice you were given."
                      ),
                    ],
                  }),
                  new TableCell({ children: [] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Officer name")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("application.preApp.officer")),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Pre-app Reference")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("application.preApp.reference")),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Date")],
                  }),
                  new TableCell({
                    children: [new Paragraph(get("application.preApp.data"))],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Details of pre-application advice received?"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("application.preApp.summary")),
                    ],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 5
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun(
                "5. Lawful Development Certificate – Interest in Land"
              ),
            ],
          }),
          new Paragraph("Please state the applicant’s interest in the land"),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Owner")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Lessee")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Occupier")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "If Yes to Lessee or Occupier",
                underline: {
                  type: UnderlineType.SINGLE,
                },
              }),
              new TextRun(
                ", please give details of the Owner and state whether they have been informed in writing of this application:"
              ),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Name")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Address")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Have they been informed in writing of the application"
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "If No to all of the above",
                underline: {
                  type: UnderlineType.SINGLE,
                },
              }),
              new TextRun(
                ", please give name and address of anyone you know who has an interest in the land:"
              ),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Name")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Address")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Nature of interest in the land")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Have they been informed of the application"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If they have not been informed of the application please explain why not"
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 6
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("6. Authority Employee/Member")],
          }),
          new Paragraph({
            text: "It is an important principle of decision-making that the process is open and transparent. For the purposes of this question, “related to” means related, by birth or otherwise, closely enough that a fair-minded and informed observer, having considered the facts, would conclude that there was bias on the part of the decision-maker in the local planning authority",
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Paragraph({
            children: [
             new TextRun("With respect to the Authority, I am: (a) a member of staff (b) an elected member (c) related to a member of staff (d) related to an elected member."),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Does any of these statements apply to you?"
                      ),
                    ],
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
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes, please provide details of the name, role, and how you are related to them"
                      ),
                    ],
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
                      ),
                    ],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 7
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("7. Description of Use, Building Works or Activity")],
          }),
          new Paragraph({
            children: [
            new TextRun("Please state for which of these you need a lawful development certificate/building works (you must tick at least one option):")
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("An existing use:") ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new SymbolRun("F071"),
                          new TextRun("Yes"),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Existing building works:") ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new SymbolRun("F071"),
                          new TextRun("Yes"),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("An existing use, building work or activity in breach of a condition") ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new SymbolRun("F071"),
                          new TextRun("Yes"),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Being a use, building works or activity which is still going on at the date of this application.") ],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("If Yes to either ‘an existing use’ or ‘an existing use in breach of a condition’ please state which one of the Use Classes the use relates to:") ],
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 8
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("8. ")],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "",
                underline: {
                  type: UnderlineType.SINGLE,
                },
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 9
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("9. ")],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "",
                underline: {
                  type: UnderlineType.SINGLE,
                },
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 10
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("10. ")],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "",
                underline: {
                  type: UnderlineType.SINGLE,
                },
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 11
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun(
                "11. Additional Information Requirements of the Mayor of London"
              ),
            ],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Title number unknown?")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Title number:")],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Energy Performance Certificate reference unknown?"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("EPC number:")],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "Gross internal Floor Area to be added (sqm)"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Number of additional bedrooms proposed"),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Number of additional bathrooms proposed"),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Existing and Proposed Vehicle Parking spaces for the following:",
                bold: true,
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [new Paragraph("Existing")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Proposed")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("a. Cars")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("b. Light Good Vehicles / Public Vehicles"),
                    ],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("c. Motorcycles")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("d. Disabled Person Parking")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("e. Cycle spaces")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("f. Bus")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("g. Residential only off-street parking"),
                    ],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("h. Car Club")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("i. Other")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 10
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("10. Declaration")],
          }),
          new Paragraph({
            text: "I/We hereby apply for a Lawful Development Certificate as described in this form and the accompanying plans/drawings and additional information. I/We confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine opinions of the person(s) giving them.",
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Signed")],
                  }),
                  new TableCell({
                    children: [new Paragraph(get("application.declaration"))],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Signed by")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new SymbolRun("F071"),
                          new TextRun("Applicant"),
                        ],
                      }),
                      new Paragraph({
                        children: [new SymbolRun("F071"), new TextRun("Agent")],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Date")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),
          new Paragraph("(date cannot be pre-application submission)"),
          new Paragraph({
            children: [
              new TextRun({
                text: "WARNING:",
                bold: true,
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "The amended section 194 of the 1990 Act provides that it is an offence to furnish false or misleading information or to withhold material information with intent to deceive. Section 193(7) enables the authority to revoke, at any time, a certificate they may have been issued as a result of such false or misleading information.",
            spacing: {
              before: 200,
              after: 200,
            },
          }),

          // 11
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("11. Applicant Contact Details")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Phone")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("applicant.phone.primary")),
                      new Paragraph(get("applicant.phone.secondary")),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Email")],
                  }),
                  new TableCell({
                    children: [new Paragraph(get("applicant.email"))],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 12
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("12. Agent Contact Details")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Phone")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(get("applicant.agent.phone.primary")),
                      new Paragraph(get("applicant.agent.phone.secondary")),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Email")],
                  }),
                  new TableCell({
                    children: [new Paragraph(get("applicant.agent.email"))],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 13
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("13. Site Visit")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Can the site be seen from a:"),
                      new Paragraph("Public road"),
                      new Paragraph("Public footpath"),
                      new Paragraph("Bridleway"),
                      new Paragraph("Or other public land?"),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("Not supplied")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new SymbolRun("F071"),
                          new TextRun("Applicant"),
                        ],
                      }),
                      new Paragraph({
                        children: [new SymbolRun("F071"), new TextRun("Agent")],
                      }),
                      new Paragraph({
                        children: [new SymbolRun("F071"), new TextRun("Other")], // applicant.siteContact
                      }),
                    ],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "If Other has been selected",
                underline: {
                  type: UnderlineType.SINGLE,
                },
              }),
              new TextRun(
                ", please provide a contact name, telephone number and email address:"
              ),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Other contact for site visit."),
                      new Paragraph("Name"),
                    ],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Phone")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Email")],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
            ],
            margins: {
              marginUnitType: WidthType.PERCENTAGE,
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),
        ],
      },
    ],
  });
};

function buildParagraphsFromNonEmptyParts(parts: string[]): Paragraph[] {
  return parts
    .filter((part) => part !== "")
    .map((part) => {
      return new Paragraph(part);
    });
}

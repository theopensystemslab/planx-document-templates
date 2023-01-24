import _get from "lodash.get";
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

export const LDCP = (passport: { data: unknown }) => {
  const get = (path): string => {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value: string | undefined = _get(passport.data, path);
    return value ? `${value}` : "";
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
                "Application for a Lawful Development Certificate for a Proposed use or development."
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
                      get("applicant.occupier")
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
                    children: [
                      new Paragraph("Yes/No"), // application.preAppAdvice
                    ],
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
            text: "With respect to the Authority, I am: (a) a member of staff (b) an elected member (c) related to a member of staff (d) related to an elected member.",
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
            children: [new TextRun("7. Grounds for Application")],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Information About the Exiting Use(s)",
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
                    children: [
                      new Paragraph(
                        "Please explain why you consider the existing or last use of the land is lawful, or why you consider that any existing buildings, which it is proposed to alter, or extend are lawful:"
                      ),
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
                        "Please list the supporting documentary evidence (such as a planning permission) which accompanies this application:"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("files")], // all filenames
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If you consider the existing, or last use is within a 'Use Class', state which one:"
                      ),
                    ],
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
          new Paragraph({
            children: [
              new TextRun({
                text: "Information About the Proposed Use(s)",
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
                    children: [
                      new Paragraph(
                        "If you consider the proposed use is within a ‘Use Class’, state which one:"
                      ),
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
                        "Is the proposed operation or use Temporary or Permanent?"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("Temporary/Permanent")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("If temporary, please give details:"),
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
                        "Please state why you consider that a Lawful Development Certificate should be granted for this proposal:"
                      ),
                    ],
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
            children: [new TextRun("8. Description of Proposal")],
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
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")], // based on development type
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes to a, please give detailed description of all such operations (includes the need to describe any proposal to alter or create a new access, layout any new street, construct any associated hard-standings, means of enclosure or means of draining the land/buildings) and indicate on your plans (in the case of a proposed building the plan should indicate the precise siting and exact dimensions):"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph(get("proposal.description"))],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "b. Change of use of the land or building(s)?"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")], // based on development type
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes to b, please give a full description of the scale and nature of the proposed use, including the processes to be carried out, any machinery to be installed and the hours the proposed use will be carried out:"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph(get("proposal.description"))],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph(
                        "If Yes to b, please describe fully the existing or the last known use, with the date this use ceased:"
                      ),
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
                        "If Yes to b, please describe fully the existing or the last known use, with the date this use ceased:"
                      ),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph(get("proposal.started"))],
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
            children: [
              new TextRun(
                "9. Additional Information Requirements of the Mayor of London"
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

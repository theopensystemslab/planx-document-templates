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

export const LDCP = (passport: { name: string }) => {
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
                      new Paragraph("applicant.title"),
                      new Paragraph("applicant.name.first"),
                      new Paragraph("applicant.name.last"),
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
                      new Paragraph("applicant.address.country"),
                    ],
                  }),
                ],
              }),
            ],
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
                      new Paragraph("applicant.agent.name.first"),
                      new Paragraph("applicant.agent.name.last"),
                      new Paragraph("applicant.agent.company.name"),
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
                      new Paragraph("applicant.agent.address.country"),
                    ],
                  }),
                ],
              }),
            ],
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
                    children: [checkedCheckbox], //applicant.occupier
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("If no, address")],
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
                      new Paragraph("property.address.postcode"),
                    ],
                  }),
                ],
              }),
            ],
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
                      new Paragraph("Yes/No"), // applciation.preApp
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
                    children: [new Paragraph("application.preApp.officer")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Pre-app Reference")],
                  }),
                  new TableCell({
                    children: [new Paragraph("application.preApp.reference")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Date")],
                  }),
                  new TableCell({
                    children: [new Paragraph("application.preApp.data ??")],
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
                    children: [new Paragraph("application.preApp.summary")],
                  }),
                ],
              }),
            ],
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
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),

          // 6
          // TODO
        ],
      },
    ],
  });
};

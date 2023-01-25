"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LDCP = void 0;
const helpers_1 = require("./helpers");
const docx_1 = require("docx");
const emptyCheckbox = new docx_1.Paragraph({
    children: [new docx_1.SymbolRun("F071")],
});
const checkedCheckbox = new docx_1.Paragraph({
    children: [new docx_1.SymbolRun("F0FE")],
});
const LDCP = (passport) => {
    const get = (path) => {
        return (0, helpers_1.getString)(passport.data, path);
    };
    const getBoolean = (path) => {
        return (0, helpers_1.getBoolean)(passport.data, path);
    };
    const hasValue = (path) => {
        return (0, helpers_1.hasValue)(passport.data, path);
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
    const files = () => {
        // eslint-disable-next-line
        const propertySitePlan = passport.data["property.drawing.sitePlan"];
        // eslint-disable-next-line
        const proposalSitePlan = passport.data["proposal.drawing.sitePlan"];
        const sitePlan = []
            // eslint-disable-next-line
            .concat(propertySitePlan, proposalSitePlan)
            .filter((item) => item !== undefined);
        if (sitePlan && Array.isArray(sitePlan)) {
            return (sitePlan
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                .map((item) => String(item["filename"]))
                .filter((item) => item !== undefined));
        }
        return [];
    };
    return new docx_1.Document({
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
                        alignment: docx_1.AlignmentType.CENTER,
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
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_1,
                        children: [
                            new docx_1.TextRun("Application for a Lawful Development Certificate for a Proposed use or development."),
                        ],
                    }),
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_1,
                        children: [new docx_1.TextRun("Town and Country Planning Act 1990")],
                    }),
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_3,
                        children: [
                            new docx_1.TextRun("Publication of applications on planning authority websites"),
                        ],
                    }),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun("Information provided on this form and in supporting documents may be published on the authority's planning register and website."),
                        ],
                    }),
                    // 1
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("1. Applicant Name and Address")],
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Name")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("applicant.title")),
                                            new docx_1.Paragraph(get("applicant.name.first")),
                                            new docx_1.Paragraph(get("applicant.name.last")),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Address")],
                                    }),
                                    new docx_1.TableCell({
                                        children: applicantAddress(),
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 2
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("2. Agent Name and Address")],
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("No agent?")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [emptyCheckbox],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Agent name")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("applicant.agent.name.first")),
                                            new docx_1.Paragraph(get("applicant.agent.name.last")),
                                            new docx_1.Paragraph(get("applicant.agent.company.name")),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Address")],
                                    }),
                                    new docx_1.TableCell({
                                        children: agentAddress(),
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 3
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("3. Site Address Details")],
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Address same as site address?")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            getBoolean("applicant.occupier")
                                                ? checkedCheckbox
                                                : emptyCheckbox,
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("If no, address")],
                                    }),
                                    new docx_1.TableCell({
                                        children: siteAddress(),
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 4
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("4. Pre-application advice")],
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Has assistance or prior advice been sought from the local authority about this application?"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: hasValue("application.preAppAdvice")
                                            ? getBoolean("application.preAppAdvice")
                                                ? [new docx_1.Paragraph("Yes")]
                                                : [new docx_1.Paragraph("No")]
                                            : [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If yes, please complete the following information about the advice you were given."),
                                        ],
                                    }),
                                    new docx_1.TableCell({ children: [] }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Officer name")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("application.preApp.officer")),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Pre-app Reference")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("application.preApp.reference")),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Date")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph(get("application.preApp.data"))],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Details of pre-application advice received?"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("application.preApp.summary")),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 5
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [
                            new docx_1.TextRun("5. Lawful Development Certificate – Interest in Land"),
                        ],
                    }),
                    new docx_1.Paragraph("Please state the applicant’s interest in the land"),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Owner")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Yes/No")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Lessee")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Yes/No")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Occupier")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Yes/No")],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun({
                                text: "If Yes to Lessee or Occupier",
                                underline: {
                                    type: docx_1.UnderlineType.SINGLE,
                                },
                            }),
                            new docx_1.TextRun(", please give details of the Owner and state whether they have been informed in writing of this application:"),
                        ],
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Name")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Address")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Have they been informed in writing of the application"),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Yes/No")],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun({
                                text: "If No to all of the above",
                                underline: {
                                    type: docx_1.UnderlineType.SINGLE,
                                },
                            }),
                            new docx_1.TextRun(", please give name and address of anyone you know who has an interest in the land:"),
                        ],
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Name")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Address")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Nature of interest in the land")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Have they been informed of the application"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If they have not been informed of the application please explain why not"),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 6
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("6. Authority Employee/Member")],
                    }),
                    new docx_1.Paragraph({
                        text: "It is an important principle of decision-making that the process is open and transparent. For the purposes of this question, “related to” means related, by birth or otherwise, closely enough that a fair-minded and informed observer, having considered the facts, would conclude that there was bias on the part of the decision-maker in the local planning authority",
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Paragraph({
                        text: "With respect to the Authority, I am: (a) a member of staff (b) an elected member (c) related to a member of staff (d) related to an elected member.",
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Does any of these statements apply to you?"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("applicant.declaration.employee")),
                                            new docx_1.Paragraph(get("applicant.declaration.employeeFamily")),
                                            new docx_1.Paragraph(get("applicant.declaration.employeeFamily.name")),
                                            new docx_1.Paragraph(get("applicant.declaration.employeeFamily.relationship")),
                                            new docx_1.Paragraph(get("applicant.declaration.member")),
                                            new docx_1.Paragraph(get("applicant.declaration.memberFamily")),
                                            new docx_1.Paragraph(get("applicant.declaration.memberFamily.name")),
                                            new docx_1.Paragraph(get("applicant.declaration.memberFamily.relationship")),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If Yes, please provide details of the name, role, and how you are related to them"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("applicant.declaration.employee")),
                                            new docx_1.Paragraph(get("applicant.declaration.employeeFamily")),
                                            new docx_1.Paragraph(get("applicant.declaration.employeeFamily.name")),
                                            new docx_1.Paragraph(get("applicant.declaration.employeeFamily.relationship")),
                                            new docx_1.Paragraph(get("applicant.declaration.member")),
                                            new docx_1.Paragraph(get("applicant.declaration.memberFamily")),
                                            new docx_1.Paragraph(get("applicant.declaration.memberFamily.name")),
                                            new docx_1.Paragraph(get("applicant.declaration.memberFamily.relationship")),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 7
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("7. Grounds for Application")],
                    }),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun({
                                text: "Information About the Exiting Use(s)",
                                underline: {
                                    type: docx_1.UnderlineType.SINGLE,
                                },
                            }),
                        ],
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Please explain why you consider the existing or last use of the land is lawful, or why you consider that any existing buildings, which it is proposed to alter, or extend are lawful:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Not supplied")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Please list the supporting documentary evidence (such as a planning permission) which accompanies this application:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: files().map((filename) => {
                                            return new docx_1.Paragraph(filename);
                                        }),
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If you consider the existing, or last use is within a 'Use Class', state which one:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Not supplied")],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun({
                                text: "Information About the Proposed Use(s)",
                                underline: {
                                    type: docx_1.UnderlineType.SINGLE,
                                },
                            }),
                        ],
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If you consider the proposed use is within a ‘Use Class’, state which one:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Not supplied")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Is the proposed operation or use Temporary or Permanent?"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Temporary/Permanent")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If temporary, please give details:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Not supplied")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Please state why you consider that a Lawful Development Certificate should be granted for this proposal:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Not supplied")],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 8
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("8. Description of Proposal")],
                    }),
                    new docx_1.Paragraph("Does the proposal consist of, or include:"),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("a. The carrying out of building or other operations? "),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Yes/No")], // based on development type
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If Yes to a, please give detailed description of all such operations (includes the need to describe any proposal to alter or create a new access, layout any new street, construct any associated hard-standings, means of enclosure or means of draining the land/buildings) and indicate on your plans (in the case of a proposed building the plan should indicate the precise siting and exact dimensions):"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph(get("proposal.description"))],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("b. Change of use of the land or building(s)?"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Yes/No")], // based on development type
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If Yes to b, please give a full description of the scale and nature of the proposed use, including the processes to be carried out, any machinery to be installed and the hours the proposed use will be carried out:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph(get("proposal.description"))],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If Yes to b, please describe fully the existing or the last known use, with the date this use ceased:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Not supplied")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If Yes to b, please describe fully the existing or the last known use, with the date this use ceased:"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph(get("proposal.started"))],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 9
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [
                            new docx_1.TextRun("9. Additional Information Requirements of the Mayor of London"),
                        ],
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Title number unknown?")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Yes/No")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Title number:")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Energy Performance Certificate reference unknown?"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("EPC number:")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Gross internal Floor Area to be added (sqm)"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Number of additional bedrooms proposed"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Number of additional bathrooms proposed"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("")],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun({
                                text: "Existing and Proposed Vehicle Parking spaces for the following:",
                                bold: true,
                            }),
                        ],
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Existing")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Proposed")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("a. Cars")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("b. Light Good Vehicles / Public Vehicles"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("c. Motorcycles")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("d. Disabled Person Parking")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("e. Cycle spaces")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("f. Bus")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("g. Residential only off-street parking"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("h. Car Club")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("i. Other")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 10
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("10. Declaration")],
                    }),
                    new docx_1.Paragraph({
                        text: "I/We hereby apply for a Lawful Development Certificate as described in this form and the accompanying plans/drawings and additional information. I/We confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine opinions of the person(s) giving them.",
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Signed")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph(get("application.declaration"))],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Signed by")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph({
                                                children: [
                                                    new docx_1.SymbolRun("F071"),
                                                    new docx_1.TextRun("Applicant"),
                                                ],
                                            }),
                                            new docx_1.Paragraph({
                                                children: [new docx_1.SymbolRun("F071"), new docx_1.TextRun("Agent")],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Date")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    new docx_1.Paragraph("(date cannot be pre-application submission)"),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun({
                                text: "WARNING:",
                                bold: true,
                            }),
                        ],
                        spacing: {
                            before: 200,
                        },
                    }),
                    new docx_1.Paragraph({
                        text: "The amended section 194 of the 1990 Act provides that it is an offence to furnish false or misleading information or to withhold material information with intent to deceive. Section 193(7) enables the authority to revoke, at any time, a certificate they may have been issued as a result of such false or misleading information.",
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    // 11
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("11. Applicant Contact Details")],
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Phone")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("applicant.phone.primary")),
                                            new docx_1.Paragraph(get("applicant.phone.secondary")),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Email")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph(get("applicant.email"))],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 12
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("12. Agent Contact Details")],
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Phone")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph(get("applicant.agent.phone.primary")),
                                            new docx_1.Paragraph(get("applicant.agent.phone.secondary")),
                                        ],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Email")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph(get("applicant.agent.email"))],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    // 13
                    new docx_1.Paragraph({
                        heading: docx_1.HeadingLevel.HEADING_2,
                        children: [new docx_1.TextRun("13. Site Visit")],
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Can the site be seen from a:"),
                                            new docx_1.Paragraph("Public road"),
                                            new docx_1.Paragraph("Public footpath"),
                                            new docx_1.Paragraph("Bridleway"),
                                            new docx_1.Paragraph("Or other public land?"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Not supplied")],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph({
                                                children: [
                                                    new docx_1.SymbolRun("F071"),
                                                    new docx_1.TextRun("Applicant"),
                                                ],
                                            }),
                                            new docx_1.Paragraph({
                                                children: [new docx_1.SymbolRun("F071"), new docx_1.TextRun("Agent")],
                                            }),
                                            new docx_1.Paragraph({
                                                children: [new docx_1.SymbolRun("F071"), new docx_1.TextRun("Other")], // applicant.siteContact
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun({
                                text: "If Other has been selected",
                                underline: {
                                    type: docx_1.UnderlineType.SINGLE,
                                },
                            }),
                            new docx_1.TextRun(", please provide a contact name, telephone number and email address:"),
                        ],
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph("Other contact for site visit."),
                                            new docx_1.Paragraph("Name"),
                                        ],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Phone")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph("Email")],
                                    }),
                                    new docx_1.TableCell({
                                        children: [],
                                    }),
                                ],
                            }),
                        ],
                        margins: {
                            marginUnitType: docx_1.WidthType.PERCENTAGE,
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                        },
                        width: {
                            size: 100,
                            type: docx_1.WidthType.PERCENTAGE,
                        },
                    }),
                ],
            },
        ],
    });
};
exports.LDCP = LDCP;
function buildParagraphsFromNonEmptyParts(parts) {
    return parts
        .filter((part) => part !== "")
        .map((part) => {
        return new docx_1.Paragraph(part);
    });
}

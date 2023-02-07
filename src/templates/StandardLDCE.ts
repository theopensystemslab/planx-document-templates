import { getString as _getString } from "./helpers";
import {
  Document,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  Paragraph,
  TextRun,
} from "docx";

export const StandardLDCE = (passport: { data: object }) => {
  const get = (path: string): string => {
    return _getString(passport.data, path);
  };

  const presets = {
    title: "Application for a Lawful Development Certificate - Existing",
    subtitle:
      "Town and Country Planning Act 1990: Section 191 as amended by section 10 of the Planning and Compensation Act 1991. Town and Country Planning (Development Management Procedure) (England) Order 2015",
  };

  const sections = [
    {
      title: "1. Applicant Name and Address",
      fields: [
        {
          name: "Name",
          value: `${get("applicant.name.first")} ${get("applicant.name.last")}`,
        },
        {
          name: "Address",
          value: get("applicant.address.singleLine"),
        },
      ],
    },
    {
      title: "2. Agent Name and Address",
      fields: [
        {
          name: "Is there an agent?",
          value: getBoolean("applicant.agent.exists") ? "Yes" : "No",
        },
        {
          name: "Agent name",
          value: `${get("applicant.agent.name.first")} ${get(
            "applicant.agent.name.last"
          )}`,
        },
        {
          name: "Agent address",
          value: get("applicant.agent.address.singleLine"),
        },
      ],
    },
    {
      title: "3. Site Address details",
      fields: [
        {
          name: "Is the applicant’s address the same as the site address?",
          value: get("applicant.address.sameAsSiteAddress"),
        },
        {
          name: "Site address",
          value: get("property.address.singleLine"),
        },
      ],
    },
    {
      title: "4. Pre-application advice",
      fields: [
        {
          name: "Has assistance or prior advice been sought from the local authority about this application?",
          value: "Yes",
        },
        {
          name: "Officer name",
          value: get("application.preApp.officer"),
        },
        {
          name: "Pre-app reference",
          value: get("application.preApp.reference"),
        },
        {
          name: "Date",
          value: get("application.preApp.data"),
        },
        {
          name: "Details of advice received",
          value: get("application.preApp.summary"),
        },
      ],
    },
    {
      title: "5. Interest in Land",
      fields: [
        {
          name: "What is the applicant’s interest in the land?",
          value: get("applicant.landInterest"),
        },
        {
          name: "If applicant is not the owner, do they know any owners?",
          value: get("property.owners.notified"),
        },
        {
          name: "Have other owners been informed in writing about the application",
          value: get("applicant.landInterest.ownerInformed"),
        },
        {
          name: "If they have not been informed of the application, please explain why not",
          value: get("property.owners.notificationReason"),
        },
        {
          name: "Names of other owners",
          value: [
            get("applicant.ownership.certificateB.owner1.name"),
            get("applicant.ownership.certificateB.owner2.name"),
            get("applicant.ownership.certificateB.multipleOwners"),
          ]
            .filter((value) => value && value !== "")
            .join(", "),
        },
        {
          name: "Address of other owners",
          value: [
            get("applicant.ownership.certificateB.owner1.address"),
            get("applicant.ownership.certificateB.owner2.address"),
            get("applicant.ownership.certificateB.multipleOwners.address"),
          ]
            .filter((value) => value && value !== "")
            .join(", "),
        },
      ],
    },
    {
      title: "6. Authority employee / member",
      fields: [
        {
          name: "Do any of these statements apply to you?",
          value: get("application.declaration.connection")
        },
        {
          name: "If Yes, please provide details of the name, role, and how you are related to them",
          value: get("application.declaration.connection.description")
        }
      ],
    },
    {
      title: "7. Description of Use, Building Works or Activity",
      fields: [
        {
          name: "Which of these do you need a lawful application certificate for?",
          value: get("application.basis")
        },
        {
          name: "If Yes to an existing use, please state which of the Use Classes the use relates to",
          value: get("proposal.use")
        },
        {
          name: "What is the existing site use(s) for which the certificate of lawfulness is being sought? Please fully describe each use and state which part of the land the use relates to",
          value: get("proposal.changeOfUse.details")
        }
      ],
    },
    // TODO...
    {
      title: "8. Description of Existing Use, Building Works or Activity ",
      fields: [
        {
          name: "",
          value: get("")
        }
      ],
    },
    {
      title: "9. Grounds for Application for a Lawful Development Certificate ",
      fields: [
        { name: "", value: get("") }
      ],
    },
    {
      titile: "10. Information in Support of a Lawful Development Certificate",
      fields: [
        { name: "", value: get("") }
      ],
    },
    {
      titile: "11. Additional Information Requirements of the Mayor of London",
      fields: [
        { name: "", value: get("") }
      ],
    },
    {
      titile: "12. Declaration",
      fields: [
        { name: "", value: get("") }
      ],
    },
    {
      titile: "13. Applicant contact details",
      fields: [
        { name: "", value: get("") }
      ],
    },
    {
      titile: "14. Agent contact details",
      fields: [
        { name: "", value: get("") }
      ],
    },
    {
      titile: "15. Site visit",
      fields: [
        { name: "", value: get("") }
      ],
    },
  ];

  return new Document({
    creator: "PlanX",
    title: presets.title,
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
            children: [new TextRun(presets.title)],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun(presets.subtitle)],
          }),

          //1
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
                      new Paragraph(
                        `${get("applicant.name.first")} ${get(
                          "applicant.name.last"
                        )}`
                      ),
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
                      new Paragraph(get("applicant.address.singleLine")),
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
        ],
      },
    ],
  });
};

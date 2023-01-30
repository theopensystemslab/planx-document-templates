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
  const title = "Application for a Lawful Development Certificate - Existing";

  return new Document({
    creator: "PlanX",
    title,
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
            children: [new TextRun(title)],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun(
                "Town and Country Planning Act 1990: Section 191 as amended by section 10 of the Planning and Compensation Act 1991. Town and Country Planning (Development Management Procedure) (England) Order 2015"
              ),
            ],
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

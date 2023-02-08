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

export function buildTestTemplate() {
  return new Document({
    creator: "PlanX",
    title: "A Test",
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
            children: [new TextRun("A Test")],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("This is a test document")],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("Test Doc Info")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Did it work as expected?")],
                  }),
                  new TableCell({
                    children: [new Paragraph("Yes/No")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Are you sure")],
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
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun("Another Section")],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Can it handle multiple sections?"),
                    ],
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
        ],
      },
    ],
  });
}

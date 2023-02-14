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

export type TemplateData = {
  presets: {
    title: string;
    subtitle: string;
  };
  sections: TemplateDataSection[];
};

export type TemplateDataSection = {
  title: string;
  fields: TemplateDataField[];
};
export type TemplateDataField = {
  name: string;
  value: string;
};

export function buildFormTemplate(data: TemplateData) {
  const heading = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text: data.presets.title,
          font: "Arial",
          bold: true,
          color: "000000",
          size: 54,
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 120,
      },
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: data.presets.subtitle,
          font: "Arial",
          size: 32,
          color: "000000",
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: {
        before: 240,
        after: 120,
      },
    }),
  ];

  const fieldBuilder = (field: TemplateDataField) => {
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: field.name,
                  bold: true,
                }),
              ],
              style: "styled",
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: field.value,
              style: "styled",
            }),
          ],
        }),
      ],
    });
  };

  const sectionBuilder = (section: TemplateDataSection) => {
    const formSectionTitle = new TextRun({
      text: section.title,
      font: "Arial",
      bold: true,
      color: "000000",
      size: 32,
    });
    const formSectionRows = section.fields.map(fieldBuilder);
    const formSection = [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [formSectionTitle],
        alignment: AlignmentType.LEFT,
        spacing: {
          before: 480,
          after: 240,
        },
      }),
      new Table({
        columnWidths: [4520, 4520],
        rows: formSectionRows,
        width: {
          size: 9040,
          type: WidthType.DXA,
        },
      }),
    ];
    return formSection;
  };

  return new Document({
    creator: "PlanX",
    title: data.presets.title,
    styles: {
      paragraphStyles: [
        {
          id: "styled",
          name: "Styled",
          basedOn: "Text",
          next: "Text",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 28,
            italics: false,
            bold: false,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 120,
              after: 120,
            },
          },
        },
      ],
    },
    sections: [
      {
        children: data.sections
          .map(sectionBuilder)
          .reduce((acc, val) => [...acc, ...val], [...heading]),
      },
    ],
  });
}

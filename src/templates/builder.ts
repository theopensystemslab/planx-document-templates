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
      children: [new TextRun(data.presets.title)],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun(data.presets.subtitle)],
    }),
  ];

  const fieldBuilder = (field: TemplateDataField) => {
    return new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(field.name)],
        }),
        new TableCell({
          children: [new Paragraph(field.value)],
        }),
      ],
    });
  };

  const sectionBuilder = (section: TemplateDataSection) => {
    const formSectionTitle = new TextRun(section.title);
    const formSectionRows = section.fields.map(fieldBuilder);
    const formSection = [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [formSectionTitle],
      }),
      new Table({
        rows: formSectionRows,
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
    ];
    return formSection;
  };

  return new Document({
    creator: "PlanX",
    title: data.presets.title,
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
        children: data.sections
          .map(sectionBuilder)
          .reduce((acc, val) => [...acc, ...val], [...heading]),
      },
    ],
  });
}

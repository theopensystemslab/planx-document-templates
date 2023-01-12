import { Document, Paragraph, TextRun } from "docx";

export const LambethLDCETemplate = new Document({
  background: {
    color: "C45911",
  },
  sections: [
    {
      children: [
        new Paragraph({
          children: [new TextRun("LDC-E")],
        }),
      ],
    },
  ],
});

export const LambethLDCPTemplate = new Document({
  background: {
    color: "F459A1",
  },
  sections: [
    {
      children: [
        new Paragraph({
          children: [new TextRun("LDC-P")],
        }),
      ],
    },
  ],
});

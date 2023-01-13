import { Document, Paragraph, TextRun } from "docx";

export const LDCP = (passport: { name: string }) => {
  return new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun("LDC-P")],
          }),
          new Paragraph({
            children: [new TextRun(`Name: ${passport.name}`)],
          }),
        ],
      },
    ],
  });
};

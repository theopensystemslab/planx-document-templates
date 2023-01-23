import { writeFileSync } from "node:fs";
import { Packer } from "docx";
import { LDCP } from "./LDCP";
import exampleData from "../data/exampleLDC.json";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await generateTemplateExamples()
    .then(() => console.log("Example templates updated"))
    .catch((e) => console.log(e));
})();

async function generateTemplateExamples(): Promise<void> {
  const LDCPDocument = LDCP(exampleData);

  await Packer.toBuffer(LDCPDocument).then((buffer) => {
    writeFileSync(`./examples/LDCPExample.docx`, buffer);
  });
}

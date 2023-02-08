import { writeFileSync } from "node:fs";
import { Packer } from "docx";
import { LDCETemplate } from "./LDCETemplate";
import { buildTestTemplate } from "./testTemplate";
import exampleLDCData from "../data/exampleLDC.json";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await generateTemplateExamples()
    .then(() => console.log("Example templates updated"))
    .catch((e) => console.log(e));
})();

async function generateTemplateExamples(): Promise<void> {
  await Packer.toBuffer(LDCETemplate(exampleLDCData)).then((buffer) => {
    writeFileSync(`./examples/LDCEExample.docx`, buffer);
  });
  await Packer.toBuffer(buildTestTemplate()).then((buffer) => {
    writeFileSync(`./examples/Test.docx`, buffer);
  });
}

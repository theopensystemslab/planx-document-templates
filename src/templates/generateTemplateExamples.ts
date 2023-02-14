import { createWriteStream, writeFileSync } from "node:fs";
import { Packer } from "docx";
import { generateDocxTemplateStream, TEMPLATES } from "../";
import { buildTestTemplate } from "./testTemplate";
import exampleLDCData from "../data/exampleLDC.json";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await generateTemplateExamples()
    .then(() => console.log("Example templates updated"))
    .catch((e) => console.log(e));
})();

async function generateTemplateExamples(): Promise<void> {
  await Packer.toBuffer(buildTestTemplate()).then((buffer) => {
    writeFileSync(`./examples/Test.docx`, buffer);
  });

  Object.keys(TEMPLATES).forEach(async (templateName) => {
    const file = createWriteStream(`./examples/${templateName}.docx`);
    const docStream = generateDocxTemplateStream({
      templateName,
      passport: exampleLDCData,
    }).pipe(file);
    await new Promise((resolve, reject) => {
      docStream.on("error", reject);
      docStream.on("finish", resolve);
    });
  });
}

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

async function generateTemplateExamples() {
  await Packer.toBuffer(buildTestTemplate()).then((buffer) => {
    writeFileSync(`./examples/Test.docx`, buffer);
  });

  const promises: Promise<void>[] = Object.keys(TEMPLATES).map(async (templateName) => {
    const file = createWriteStream(`./examples/${templateName}.docx`);
    const docStream = generateDocxTemplateStream({
      templateName,
      passport: exampleLDCData,
    }).pipe(file);
    return new Promise((resolve, reject) => {
      docStream.on("error", reject);
      docStream.on("finish", resolve);
    });
  });

  await Promise.all(promises);
}

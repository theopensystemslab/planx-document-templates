import {
  createWriteStream,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";
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
  // create example directory
  const exampleDir = "./examples";
  if (!existsSync(exampleDir)) {
    mkdirSync(exampleDir);
  }

  // build test doc
  await Packer.toBuffer(buildTestTemplate()).then((buffer) => {
    writeFileSync(`./examples/Test.docx`, buffer);
  });

  // build templates
  const promises: Promise<void>[] = Object.keys(TEMPLATES).map(
    async (templateName) => {
      const file = createWriteStream(`./examples/${templateName}.docx`);
      const docStream = generateDocxTemplateStream({
        templateName,
        passport: exampleLDCData,
      }).pipe(file);
      return new Promise((resolve, reject) => {
        docStream.on("error", reject);
        docStream.on("finish", resolve);
      });
    }
  );

  // ensure all templates built succesfully otherwise exit with an error
  await Promise.all(promises).catch((e) => {
    console.log(e);
    process.exit(1); // fail the build if an example failed to generate
  });
}

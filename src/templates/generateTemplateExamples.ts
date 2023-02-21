import {
  createWriteStream,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { Packer } from "docx";
import { generateDocxTemplateStream } from "../";
import { buildTestTemplate } from "./testTemplate";
import exampleLDCEData from "../data/exampleLDCE.json";
import exampleLDCPData from "../data/exampleLDCP.json";

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

  // setup test data
  const examples: Record<string, { data: any }> = {
    LDCE: exampleLDCEData as { data: any },
    LDCE_redacted: exampleLDCEData as { data: any },
    LDCP: exampleLDCPData as { data: any },
    LDCP_redacted: exampleLDCPData as { data: any },
  };

  // build templates
  const promises: Promise<void>[] = Object.keys(examples).map(
    async (templateName) => {
      const file = createWriteStream(`./examples/${templateName}.docx`);
      const docStream = generateDocxTemplateStream({
        templateName,
        passport: examples[templateName],
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

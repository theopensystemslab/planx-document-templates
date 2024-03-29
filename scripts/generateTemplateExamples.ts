import {
  createWriteStream,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { Packer } from "docx";
import {
  generateDocxTemplateStream,
  generateHTMLMapStream,
  generateHTMLOverviewStream,
  TEMPLATES,
} from "../src";
import { buildTestTemplate } from "../src/templates/testTemplate";
import exampleLDCEData from "../data/exampleLDCE.json";
import exampleLDCPData from "../data/exampleLDCP.json";
import exampleData from "../data/example.json";
import exampleSectionData from "../data/exampleWithSections.json";

(async () => {
  try {
    await setUpExampleDir();
    await generateHTMLExamples();
    await generateTemplateExamples();
  } catch (e) {
    console.log("Example generation failed");
    console.log(e);
  }
})();

async function setUpExampleDir() {
  if (!existsSync("./examples")) {
    mkdirSync("./examples");
  }
}

async function generateHTMLExamples() {
  const data = exampleData.data;
  const sectionData = exampleSectionData.data;
  const geojson = exampleData.geojson;

  const promises: Promise<void>[] = [];

  const htmlFile = createWriteStream(`./examples/Overview.html`);
  const htmlStream = generateHTMLOverviewStream(data).pipe(htmlFile);
  promises.push(resolveStream(htmlStream));

  const sectionHtmlFile = createWriteStream(`./examples/Overview_with_sections.html`);
  const sectionHtmlStream = generateHTMLOverviewStream(sectionData).pipe(sectionHtmlFile);
  promises.push(resolveStream(sectionHtmlStream));

  const mapFile = createWriteStream(`./examples/LocationPlan.html`);
  const mapStream = generateHTMLMapStream(geojson).pipe(mapFile);
  promises.push(resolveStream(mapStream));

  await waitForAllOrExit(promises);
}

async function generateTemplateExamples() {
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
      return resolveStream(docStream);
    }
  );

  await waitForAllOrExit(promises);
}

async function waitForAllOrExit(promises: Promise<void>[]) {
  return Promise.all(promises).catch((e) => {
    console.log(e);
    process.exit(1); // exit with an error code if examples fail to generate
  });
}

function resolveStream(stream): Promise<void> {
  return new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", resolve);
  });
}

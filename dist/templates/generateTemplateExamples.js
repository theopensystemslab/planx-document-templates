"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const docx_1 = require("docx");
const LDCP_1 = require("./LDCP");
const LDCE_1 = require("./LDCE");
const exampleLDC_json_1 = __importDefault(require("../data/exampleLDC.json"));
// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    await generateTemplateExamples()
        .then(() => console.log("Example templates updated"))
        .catch((e) => console.log(e));
})();
async function generateTemplateExamples() {
    const LDCPDocument = (0, LDCP_1.LDCP)(exampleLDC_json_1.default);
    await docx_1.Packer.toBuffer(LDCPDocument).then((buffer) => {
        (0, node_fs_1.writeFileSync)(`./examples/LDCPExample.docx`, buffer);
    });
    const LDCEDocument = (0, LDCE_1.LDCE)(exampleLDC_json_1.default);
    await docx_1.Packer.toBuffer(LDCEDocument).then((buffer) => {
        (0, node_fs_1.writeFileSync)(`./examples/LDCEExample.docx`, buffer);
    });
}

import { getString as _getString, getBoolean as _getBoolean } from "./helpers";
import { buildFormTemplate } from "./builder";

export function LDCETemplate(passport: { data: object }) {
  const get = (path: string): string => {
    return _getString(passport.data, path);
  };
  const getBoolean = (path: string): boolean => {
    return _getBoolean(passport.data, path);
  };

  return buildFormTemplate({
    presets: {
      title: "Application for a Lawful Development Certificate - Existing",
      subtitle:
        "Town and Country Planning Act 1990: Section 191 as amended by section 10 of the Planning and Compensation Act 1991. Town and Country Planning (Development Management Procedure) (England) Order 2015",
    },
    sections: [
      {
        title: "1. Applicant Name and Address",
        fields: [
          {
            name: "Name",
            value: `${get("applicant.name.first")} ${get(
              "applicant.name.last"
            )}`,
          },
          {
            name: "Address",
            value: get("applicant.address.singleLine"),
          },
        ],
      },
      {
        title: "2. Agent Name and Address",
        fields: [
          {
            name: "Is there an agent?",
            value: getBoolean("applicant.agent.exists") ? "Yes" : "No",
          },
          {
            name: "Agent name",
            value: `${get("applicant.agent.name.first")} ${get(
              "applicant.agent.name.last"
            )}`,
          },
          {
            name: "Agent address",
            value: get("applicant.agent.address.singleLine"),
          },
        ],
      },
      {
        title: "3. Site Address details",
        fields: [
          {
            name: "Is the applicant’s address the same as the site address?",
            value: get("applicant.address.sameAsSiteAddress"),
          },
          {
            name: "Site address",
            value: get("property.address.singleLine"),
          },
        ],
      },
      {
        title: "4. Pre-application advice",
        fields: [
          {
            name: "Has assistance or prior advice been sought from the local authority about this application?",
            value: "Yes",
          },
          {
            name: "Officer name",
            value: get("application.preApp.officer"),
          },
          {
            name: "Pre-app reference",
            value: get("application.preApp.reference"),
          },
          {
            name: "Date",
            value: get("application.preApp.data"),
          },
          {
            name: "Details of advice received",
            value: get("application.preApp.summary"),
          },
        ],
      },
      {
        title: "5. Interest in Land",
        fields: [
          {
            name: "What is the applicant’s interest in the land?",
            value: get("applicant.landInterest"),
          },
          {
            name: "If applicant is not the owner, do they know any owners?",
            value: get("property.owners.notified"),
          },
          {
            name: "Have other owners been informed in writing about the application",
            value: get("applicant.landInterest.ownerInformed"),
          },
          {
            name: "If they have not been informed of the application, please explain why not",
            value: get("property.owners.notificationReason"),
          },
          {
            name: "Names of other owners",
            value: [
              get("applicant.ownership.certificateB.owner1.name"),
              get("applicant.ownership.certificateB.owner2.name"),
              get("applicant.ownership.certificateB.multipleOwners"),
            ]
              .filter((value) => value && value !== "")
              .join(", "),
          },
          {
            name: "Address of other owners",
            value: [
              get("applicant.ownership.certificateB.owner1.address"),
              get("applicant.ownership.certificateB.owner2.address"),
              get("applicant.ownership.certificateB.multipleOwners.address"),
            ]
              .filter((value) => value && value !== "")
              .join(", "),
          },
        ],
      },
      {
        title: "6. Authority employee / member",
        fields: [
          {
            name: "Do any of these statements apply to you?",
            value: get("application.declaration.connection"),
          },
          {
            name: "If Yes, please provide details of the name, role, and how you are related to them",
            value: get("application.declaration.connection.description"),
          },
        ],
      },
      {
        title: "7. Description of Use, Building Works or Activity",
        fields: [
          {
            name: "Which of these do you need a lawful application certificate for?",
            value: get("application.basis"),
          },
          {
            name: "If Yes to an existing use, please state which of the Use Classes the use relates to",
            value: get("proposal.use"),
          },
          {
            name: "What is the existing site use(s) for which the certificate of lawfulness is being sought? Please fully describe each use and state which part of the land the use relates to",
            value: get("proposal.changeOfUse.details"),
          },
        ],
      },
      {
        title: "8. Description of Existing Use, Building Works or Activity ",
        fields: [
          {
            name: "What is the existing site use(s) for which the certificate of lawfulness is being sought? Please fully describe each use and state which part of the land the use relates to",
            value: "", //TODO
          },
        ],
      },
      {
        title:
          "9. Grounds for Application for a Lawful Development Certificate ",
        fields: [
          {
            name: "Please state under what grounds is the certificate sought",
            value: "", // TODO
          },
          {
            name: "If applicable, please give the reference number of any existing planning permission, lawful development certificate or enforcement notice affecting the application site. Include its date and the number of any condition being breached:",
            value: "", // TODO
          },
          {
            name: "Please state why a Lawful Development Certificate should be granted",
            value: "", // TODO
          },
        ],
      },
      {
        title: "10. Information in Support of a Lawful Development Certificate",
        fields: [
          {
            name: "When was the use or activity begun, or the building work substantially completed?",
            value: "", // TODO
          },
          {
            name: "In the case of an existing use or activity in breach of conditions has there been any interruption:",
            value: "Yes/No", // TODO
          },
          {
            name: "If Yes, please provide details of the dates, duration and any discontinuance of the development which is the subject of this application. If your application is based on the claim that a use or activity has been ongoing for a period of years, please state exactly when any interruption occurred:",
            value: "", // TODO
          },
          {
            name: "In the case of an existing use of land, has there been any material change of use of the land since the start of the use for which a certificate is sought?",
            value: "", // TODO
          },
          {
            name: "If yes, provide details",
            value: "", // TODO
          },
          {
            name: "Does the application for a Certificate relate to a residential use where the number of residential units has changed?",
            value: "Yes/No", // TODO
          },
          { name: "New 1 bed homes", value: "" },
          { name: "New 2 bed homes", value: "" },
          { name: "New 3 bed homes", value: "" },
          { name: "New 4+ bed homes", value: "" },
          { name: "New other / unknown homes", value: "" },
          { name: "Total new homes of all types", value: "" },
          { name: "New social rented homes", value: "" },
          { name: "New intermediate homes", value: "" },
          { name: "New key worker homes", value: "" },
          { name: "Existing 1 bed homes", value: "" },
          { name: "Existing 2 bed homes", value: "" },
          { name: "Existing 3 bed homes", value: "" },
          { name: "Existing 4+ bed homes", value: "" },
          { name: "Existing other / unknown homes", value: "" },
          { name: "Total existing homes of all types", value: "" },
          { name: "...", value: "" },
        ],
      },
      {
        title: "11. Additional Information Requirements of the Mayor of London",
        fields: [
          {
            name: "Do you know the title number of the property?",
            value: "", // TODO
          },
          {
            name: "Title number",
            value: "", // TODO
          },
          {
            name: "Do you know the Energy Performance Certificate reference of the property?",
            value: "Yes/No", // TODO
          },
          {
            name: "Energy Performance Certificate reference",
            value: "", // TODO
          },
          {
            name: "Gross internal floor area to be added (sqm)",
            value: "", // TODO
          },
          {
            name: "Number of additional bedrooms",
            value: "", // TODO
          },
          {
            name: "Number of additional bathrooms",
            value: "", // TODO
          },
          {
            name: "Does the site have any existing vehicle/cycle parking spaces?",
            value: "Yes/No", // TODO
          },
          {
            name: "Car spaces existing",
            value: "", // TODO
          },
          {
            name: "Car spaces proposed",
            value: "", // TODO
          },
          {
            name: "Light goods vehicles / public vehicles existing",
            value: "", // TODO
          },
          {
            name: "Light goods vehicles / public vehicles proposed",
            value: "", // TODO
          },
          {
            name: "Motorcycles existing",
            value: "", // TODO
          },
          {
            name: "Motorcycles proposed",
            value: "", // TODO
          },
          {
            name: "Disabled parking existing",
            value: "", // TODO
          },
          {
            name: "Disabled parking proposed",
            value: "", // TODO
          },
          {
            name: "Cycle spaces existing",
            value: "", // TODO
          },
          {
            name: "Cycle spaces proposed",
            value: "", // TODO
          },
          {
            name: "Bus spaces existing",
            value: "", // TODO
          },
          {
            name: "Bus spaces proposed",
            value: "", // TODO
          },
          {
            name: "Residential only off-street parking existing",
            value: "", // TODO
          },
          {
            name: "Residential only off-street parking proposed",
            value: "", // TODO
          },
          {
            name: "Car club existing",
            value: "", // TODO
          },
          {
            name: "Car club proposed",
            value: "", // TODO
          },
          {
            name: "Other existing",
            value: "", // TODO
          },
          {
            name: "Other proposed",
            value: "", // TODO
          },
        ],
      },
      {
        title: "12. Declaration",
        fields: [
          {
            name: "I / We hereby apply for Lawful development: Existing use as described in this form and accompanying plans/drawings and additional information. I / We confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine options of the persons giving them. I / We also accept that: Once submitted, this information will be transmitted to the Local Planning Authority and, once validated by them, be made available as part of a public register and on the authority's website; our system will automatically generate and send you emails in regard to the submission of this application.",
            value: "Yes/No (applicant), Yes / No (agent)", // TODO
          },
          { name: "Date", value: new Date().toLocaleDateString("en-GB") },
        ],
      },
      {
        title: "13. Applicant contact details",
        fields: [
          {
            name: "Phone",
            value: [
              get("applicant.phone.primary"),
              get("applicant.phone.secondary"),
            ]
              .filter((value) => value && value !== "")
              .join(", "),
          },
          { name: "Email", value: get("applicant.email") },
        ],
      },
      {
        title: "14. Agent contact details",
        fields: [
          {
            name: "Phone",
            value: [
              get("applicant.agent.phone.primary"),
              get("applicant.agent.phone.secondary"),
            ]
              .filter((value) => value && value !== "")
              .join(", "),
          },
          { name: "Email", value: get("applicant.agent.email") },
        ],
      },
      {
        title: "15. Site visit",
        fields: [
          {
            name: "Can the site be seen from a: Public road, Public footpath, Bridleway, Or other public land?",
            value: "Information not provided",
          },
          {
            name: "If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?",
            value: "Applicant / agent / Other",
          },
          { name: "Name", value: get("applicant.siteContact.name") },
          { name: "Phone", value: get("applicant.siteContact.telephone") },
          { name: "Email", value: get("applicant.siteContact.email") },
        ],
      },
    ],
  });
}

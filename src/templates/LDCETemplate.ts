import { getString as _getString, getBoolean as _getBoolean } from "./helpers";
import { buildFormTemplate } from "./builder";

export function LDCETemplate(passport: { data: object }) {
  const get = (path: string): string => _getString(passport.data, path);

  const getBoolean = (path: string): boolean =>
    _getBoolean(passport.data, path);

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
            value: getBoolean("applicant.agent.form") ? "Yes" : "No",
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
            value: get("applicant.sameAddress.form"),
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
            value: get("application.preAppAdvice.form"),
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
            value: get("application.preApp.date"),
          },
          {
            name: "Details of advice received",
            value: "Not provided",
          },
        ],
      },
      {
        title: "5. Interest in Land",
        fields: [
          {
            name: "What is the applicant’s interest in the land?",
            value: get("applicant.interest.form"),
          },
          {
            name: "If applicant is not the owner, do they know any owners?",
            value: get("applicant.interest.ownerKnown.form"),
          },
          {
            name: "Have other owners been informed in writing about the application",
            value: get("applicant.ownership.noticeGiven.form"),
          },
          {
            name: "If they have not been informed of the application, please explain why not",
            value: get("applicant.ownership.noNoticeReason"),
          },
          {
            name: "Names of other owners",
            value: [
              get("applicant.ownership.owner1.name"),
              get("applicant.ownership.owner2.name"),
              get("applicant.ownership.owner3.name"),
              get("applicant.ownership.multipleOwners"),
            ]
              .filter(Boolean)
              .join(", "),
          },
          {
            name: "Address of other owners",
            value: [
              get("applicant.ownership.owner1.address"),
              get("applicant.ownership.owner2.address"),
              get("applicant.ownership.owner3.address"),
              get("applicant.ownership.multipleOwners.address"),
            ]
              .filter(Boolean)
              .join(", "),
          },
        ],
      },
      {
        title: "6. Authority employee / member",
        fields: [
          {
            name: "Do any of these statements apply to you?",
            value: get("application.declaration.connection.form"),
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
            value: get("application.about.form"),
          },
          {
            name: "If Yes to an existing use, please state which of the Use Classes the use relates to",
            value: `Use class ${get("property.useClass")}`,
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
            value: get("proposal.use"),
          },
        ],
      },
      {
        title:
          "9. Grounds for Application for a Lawful Development Certificate ",
        fields: [
          {
            name: "Please state under what grounds is the certificate sought",
            value: get("application.basisOfLawfulness"),
          },
          {
            name: "If applicable, please give the reference number of any existing planning permission, lawful development certificate or enforcement notice affecting the application site. Include its date and the number of any condition being breached:",
            value: "", // intentionally blank
          },
          {
            name: "Please state why a Lawful Development Certificate should be granted",
            value: [
              get("application.reason"),
              get("application.resultOverride.reason"),
            ]
              .filter(Boolean)
              .join(" "),
          },
        ],
      },
      {
        title: "10. Information in Support of a Lawful Development Certificate",
        fields: [
          {
            name: "When was the use or activity begun, or the building work substantially completed?",
            value: "Information not provided",
          },
          {
            name: "In the case of an existing use or activity in breach of conditions has there been any interruption:",
            value: get("proposal.completion.continousUse.form"),
          },
          {
            name: "If Yes, please provide details of the dates, duration and any discontinuance of the development which is the subject of this application. If your application is based on the claim that a use or activity has been ongoing for a period of years, please state exactly when any interruption occurred:",
            value: get("proposal.completion.continousUse.description"),
          },
          {
            name: "In the case of an existing use of land, has there been any material change of use of the land since the start of the use for which a certificate is sought?",
            value: "", // intentionally blank
          },
          {
            name: "If yes, provide details",
            value: "", // intentionally blank
          },
          {
            name: "Does the application for a Certificate relate to a residential use where the number of residential units has changed?",
            value: get("proposal.changeNumberOfHomes.form"),
          },

          // All values below intentionally blank

          { name: "New 1 bed houses", value: "" },
          { name: "New 2 bed houses", value: "" },
          { name: "New 3 bed houses", value: "" },
          { name: "New 4+ bed houses", value: "" },
          { name: "New houses, beds unknown", value: "" },
          { name: "Total new houses", value: "" },

          { name: "New 1 bed flats & maisonettes", value: "" },
          { name: "New 2 bed flats & maisonettes", value: "" },
          { name: "New 3 bed flats & maisonettes", value: "" },
          { name: "New 4+ bed flats & maisonettes", value: "" },
          { name: "New flats & maisonettes, beds unknown", value: "" },
          { name: "Total new flats & maisonettes", value: "" },

          { name: "New 1 bed live-work units", value: "" },
          { name: "New 2 bed live-work units", value: "" },
          { name: "New 3 bed live-work units", value: "" },
          { name: "New 4+ bed live-work units", value: "" },
          { name: "New live-work units, beds unknown", value: "" },
          { name: "Total new live-work units", value: "" },

          { name: "New 1 bed cluster flats", value: "" },
          { name: "New 2 bed cluster flats", value: "" },
          { name: "New 3 bed cluster flats", value: "" },
          { name: "New 4+ bed cluster flats", value: "" },
          { name: "New cluster flats, beds unknown", value: "" },
          { name: "Total new cluster flats", value: "" },

          { name: "New 1 bed sheltered housing units", value: "" },
          { name: "New 2 bed sheltered housing units", value: "" },
          { name: "New 3 bed sheltered housing units", value: "" },
          { name: "New 4+ bed sheltered housing units", value: "" },
          { name: "New sheltered housing units, beds unknown", value: "" },
          { name: "Total new sheltered housing units", value: "" },

          { name: "New 1 bed bedsits / studios", value: "" },
          { name: "New 2 bed bedsits / studios", value: "" },
          { name: "New 3 bed bedsits / studios", value: "" },
          { name: "New 4+ bed bedsits / studios", value: "" },
          { name: "New bedsits / studios, beds unknown", value: "" },
          { name: "Total new bedsits / studios", value: "" },

          { name: "Total new homes", value: "" },
          { name: "New social rented homes", value: "" },
          { name: "New intermediate homes", value: "" },
          { name: "New key worker homes", value: "" },

          { name: "Existing 1 bed houses", value: "" },
          { name: "Existing 2 bed houses", value: "" },
          { name: "Existing 3 bed houses", value: "" },
          { name: "Existing 4+ bed houses", value: "" },
          { name: "Existing houses, beds unknown", value: "" },
          { name: "Total existing houses", value: "" },

          { name: "Existing 1 bed flats & maisonettes", value: "" },
          { name: "Existing 2 bed flats & maisonettes", value: "" },
          { name: "Existing 3 bed flats & maisonettes", value: "" },
          { name: "Existing 4+ bed flats & maisonettes", value: "" },
          { name: "Existing flats & maisonettes, beds unknown", value: "" },
          { name: "Total existing flats & maisonettes", value: "" },

          { name: "Existing 1 bed live-work units", value: "" },
          { name: "Existing 2 bed live-work units", value: "" },
          { name: "Existing 3 bed live-work units", value: "" },
          { name: "Existing 4+ bed live-work units", value: "" },
          { name: "Existing live-work units, beds unknown", value: "" },
          { name: "Total existing live-work units", value: "" },

          { name: "Existing 1 bed cluster flats", value: "" },
          { name: "Existing 2 bed cluster flats", value: "" },
          { name: "Existing 3 bed cluster flats", value: "" },
          { name: "Existing 4+ bed cluster flats", value: "" },
          { name: "Existing cluster flats, beds unknown", value: "" },
          { name: "Total existing cluster flats", value: "" },

          { name: "Existing 1 bed sheltered housing units", value: "" },
          { name: "Existing 2 bed sheltered housing units", value: "" },
          { name: "Existing 3 bed sheltered housing units", value: "" },
          { name: "Existing 4+ bed sheltered housing units", value: "" },
          { name: "Existing sheltered housing units, beds unknown", value: "" },
          { name: "Total existing sheltered housing units", value: "" },

          { name: "Existing 1 bed bedsits / studios", value: "" },
          { name: "Existing 2 bed bedsits / studios", value: "" },
          { name: "Existing 3 bed bedsits / studios", value: "" },
          { name: "Existing 4+ bed bedsits / studios", value: "" },
          { name: "Existing bedsits / studios, beds unknown", value: "" },
          { name: "Total existing bedsits / studios", value: "" },

          { name: "Total existing homes", value: "" },
          { name: "Existing social rented homes", value: "" },
          { name: "Existing intermediate homes", value: "" },
          { name: "Existing key worker homes", value: "" },
        ],
      },
      {
        title: "11. Additional Information Requirements of the Mayor of London",
        fields: [
          {
            name: "Do you know the title number of the property?",
            value: get("property.titleNumberKnown.form"),
          },
          {
            name: "Title number",
            value: get("property.titleNumber"),
          },
          {
            name: "Do you know the Energy Performance Certificate reference of the property?",
            value: get("property.EPCKnown.form"),
          },
          {
            name: "Energy Performance Certificate reference",
            value: get("property.EPC.number"),
          },
          {
            name: "Gross internal floor area to be added (sqm)",
            value: get("proposal.extended.area"),
          },
          {
            name: "Number of additional bedrooms",
            value: get("proposal.newBedrooms.number"),
          },
          {
            name: "Number of additional bathrooms",
            value: get("proposal.newBathrooms.number"),
          },
          {
            name: "Does the site have any existing vehicle/cycle parking spaces?",
            value: get("proposal.vehicleParking"),
          },
          {
            name: "Car spaces existing",
            value: get("proposal.cars.number.existing"),
          },
          {
            name: "Car spaces proposed",
            value: get("proposal.cars.number.proposed"),
          },
          {
            name: "Light goods vehicles / public vehicles existing",
            value: get("proposal.vans.number.existing"),
          },
          {
            name: "Light goods vehicles / public vehicles proposed",
            value: get("proposal.vans.number.proposed"),
          },
          {
            name: "Motorcycles existing",
            value: get("proposal.motorcycles.number.existing"),
          },
          {
            name: "Motorcycles proposed",
            value: get("proposal.motorcycles.number.proposed"),
          },
          {
            name: "Disabled parking existing",
            value: get("proposal.cars.disabled.number.existing"),
          },
          {
            name: "Disabled parking proposed",
            value: get("proposal.cars.disabled.number.proposed"),
          },
          {
            name: "Cycle spaces existing",
            value: get("proposal.bicycles.number.existing"),
          },
          {
            name: "Cycle spaces proposed",
            value: get("proposal.bicycles.number.proposed"),
          },
          {
            name: "Bus spaces existing",
            value: get("proposal.buses.number.existing"),
          },
          {
            name: "Bus spaces proposed",
            value: get("proposal.buses.number.proposed"),
          },
          {
            name: "Residential only off-street parking existing",
            value: get("proposal.cars.offStreet.residents.number.existing"),
          },
          {
            name: "Residential only off-street parking proposed",
            value: get("proposal.cars.offStreet.residents.number.proposed"),
          },
          {
            name: "Car club existing",
            value: get("proposal.cars.club.number.existing"),
          },
          {
            name: "Car club proposed",
            value: get("proposal.cars.club.number.proposed"),
          },
          {
            name: "Other existing",
            value: "", // intentionally blank
          },
          {
            name: "Other proposed",
            value: "", // intentionally blank
          },
        ],
      },
      {
        title: "12. Declaration",
        fields: [
          {
            name: "I / We hereby apply for Lawful development: Existing use as described in this form and accompanying plans/drawings and additional information. I / We confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine options of the persons giving them. I / We also accept that: Once submitted, this information will be transmitted to the Local Planning Authority and, once validated by them, be made available as part of a public register and on the authority's website; our system will automatically generate and send you emails in regard to the submission of this application.",
            value: get("application.declaration.accurate.form"),
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
              .filter(Boolean)
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
              .filter(Boolean)
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
            value: getBoolean("proposal.visibleFromPublicRealm") ? "Yes" : "No",
          },
          {
            name: "If the planning authority needs to make an appointment to carry out a site visit, whom should they contact?",
            value: get("applicant.siteContact"),
          },
          { name: "Name", value: get("applicant.siteContact.name") },
          { name: "Phone", value: get("applicant.siteContact.telephone") },
          { name: "Email", value: get("applicant.siteContact.email") },
        ],
      },
    ],
  });
}

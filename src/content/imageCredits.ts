/**
 * Every photograph currently on the site is freely licensed from Wikimedia
 * Commons and carries an attribution requirement. The /credits page renders
 * this list, which is what satisfies the CC BY and CC BY-SA terms.
 *
 * TODO(client): these are stand-ins. None of them show Red Planet's own work,
 * and none are shot in Nigeria. Replace them with project photography and this
 * whole file can be deleted along with the /credits route.
 */
export type ImageCredit = {
  file: string;
  usedFor: string;
  title: string;
  creator: string;
  license: string;
  licenseUrl: string;
  source: string;
};

const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0/";
const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";

export const imageCredits: ImageCredit[] = [
  {
    file: "/img/hero.webp",
    usedFor: "Homepage hero",
    title: "Container crane at container terminal, Rotterdam",
    creator: "Guilhem Vellut",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source:
      "https://commons.wikimedia.org/wiki/File:Container_crane_@_Container_terminal_@_Harbour_Tour_@_Spido_@_Rotterdam_(30530447836).jpg",
  },
  {
    file: "/img/healthcare/hero.webp",
    usedFor: "Healthcare page hero and homepage sector grid",
    title: "Intensive care unit, AZ Sint-Maarten, Mechelen",
    creator: "Ad Meskens",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    source:
      "https://commons.wikimedia.org/wiki/File:Mechelen_AZ_St_Maarten_Intensive_Care_Unit_02.jpg",
  },
  {
    file: "/img/healthcare/icu-project.webp",
    usedFor: "Featured project section",
    title: "Operating theatre, Ipswich Hospital, Queensland",
    creator: "Kgbo",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    source:
      "https://commons.wikimedia.org/wiki/File:Ipswich_Hospital_operating_theatre,_Queensland,_2022_02.jpg",
  },
  {
    file: "/img/agriculture/hero.webp",
    usedFor: "Agriculture page hero and homepage sector grid",
    title: "Maize sprouting early",
    creator: "Jozef020",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    source: "https://commons.wikimedia.org/wiki/File:Maize_sprouting_early_02.jpg",
  },
  {
    file: "/img/mining/hero.webp",
    usedFor: "Mining page hero and homepage sector grid",
    title: "Garzweiler surface mine",
    creator: "Raimond Spekking",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    source: "https://commons.wikimedia.org/wiki/File:Garzweiler_Tagebau-1230.jpg",
  },
  {
    file: "/img/construction/hero.webp",
    usedFor: "Construction page hero and homepage sector grid",
    title: "Tower crane rising at a construction site, Portland, Oregon",
    creator: "PortlandAppraisalBlog",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    source:
      "https://commons.wikimedia.org/wiki/File:Tower_crane_rising_at_hollywoodHUB_construction_site,_Portland,_Oregon.jpg",
  },
  {
    file: "/img/capabilities/trading.webp",
    usedFor: "Capabilities page, trading section",
    title: "Kuantan Port container yard with rubber tyre gantry",
    creator: "Only Truth",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    source:
      "https://commons.wikimedia.org/wiki/File:Kuantan_Port_Container_Yard_with_Rubber_Tyre_Gantry.JPG",
  },
  {
    file: "/img/capabilities/export.webp",
    usedFor: "Capabilities page, export section",
    title: "Distribution centre interior",
    creator: "Nick Saltmarsh",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: "https://commons.wikimedia.org/wiki/File:Distribution_centre_(J_Sainsbury%27s).jpg",
  },
];

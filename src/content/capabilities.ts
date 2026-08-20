import type { Sector } from "./sectors";

export type Capability = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  /** Short line used on the homepage progression band. */
  brief: string;
  strengths: string[];
  application: Record<Sector["slug"], string>;
};

export const capabilities: Capability[] = [
  {
    slug: "trading",
    index: "One",
    title: "General Trading and Merchandise",
    summary:
      "Strategic procurement, sourcing, and supply chain management built around direct relationships with tier-1 manufacturers.",
    brief:
      "Direct OEM relationships, cold chain logistics, customs clearance, and distribution across Sub-Saharan Africa.",
    strengths: [
      "Direct OEM relationships with tier-1 manufacturers",
      "GDP-certified cold chain management",
      "Global sourcing with local delivery",
      "Customs clearance and regulatory navigation",
      "Quality assurance and traceability systems",
    ],
    application: {
      healthcare:
        "Medical equipment, surgical consumables, diagnostic reagents, pharmaceuticals, and biomedical devices.",
      agriculture:
        "Seeds, fertilisers, crop protection products, agricultural equipment, and harvesting tools.",
      mining:
        "Specialised mining equipment, safety gear, operational supplies, and extraction machinery.",
      construction:
        "Building materials, construction equipment, specialised tools, and site safety gear.",
    },
  },
  {
    slug: "consulting",
    index: "Two",
    title: "Business Consulting",
    summary:
      "Strategic planning, operational optimisation, and institutional capacity building applied sector by sector.",
    brief:
      "Feasibility studies, operational optimisation, capacity building, financial modelling, and project management.",
    strengths: [
      "Feasibility studies and financial modelling",
      "Operational efficiency consulting",
      "Capacity building and workforce development",
      "Quality assurance and compliance frameworks",
      "Project and change management",
    ],
    application: {
      healthcare:
        "Hospital planning, clinical facility design, workforce training, and accreditation support.",
      agriculture:
        "Production optimisation, cooperative development, crop diversification, and yield planning.",
      mining:
        "Operational efficiency, safety protocol development, community relations, and cost optimisation.",
      construction:
        "Project planning, cost and timeline management, quality control, and compliance protocols.",
    },
  },
  {
    slug: "export",
    index: "Three",
    title: "Export Services",
    summary:
      "International market access, trade facilitation, and buyer connections across multiple continents.",
    brief:
      "Market access, trade facilitation, buyer networks, compliance management, and logistics coordination.",
    strengths: [
      "Buyer networks across multiple continents",
      "Trade documentation and logistics",
      "Customs and certification compliance",
      "Market intelligence and pricing analysis",
      "Long-term buyer relationship management",
    ],
    application: {
      healthcare:
        "Primarily inbound. International equipment sourcing and import facilitation for domestic and ECOWAS supply.",
      agriculture:
        "Crop export strategy, buyer matching, certification support, and shipping coordination.",
      mining:
        "Mineral export facilitation, tier-1 buyer networks, and commodity pricing intelligence.",
      construction:
        "International material sourcing, contractor coordination, and equipment import facilitation.",
    },
  },
];

export type Differentiator = {
  title: string;
  copy: string;
};

export const differentiators: Differentiator[] = [
  {
    title: "Direct OEM relationships",
    copy: "Partnerships with tier-1 manufacturers across Europe, Asia, and North America remove intermediaries and guarantee authentic equipment at fair prices.",
  },
  {
    title: "Regulatory expertise",
    copy: "NAFDAC, SONCAP, SON, ISO, and NNRA compliance is embedded across every sector engagement rather than outsourced late in a project.",
  },
  {
    title: "Integrated delivery",
    copy: "One company, three core capabilities, four industry specialisations. End-to-end delivery from planning through long-term support, with no vendor coordination burden.",
  },
  {
    title: "Local to global bridge",
    copy: "Lagos-based operations with ECOWAS-wide reach, run by a team that understands both African market realities and international procurement standards.",
  },
];

export type ServiceGroup = {
  title: string;
  items: string[];
};

export type Sector = {
  slug: "healthcare" | "agriculture" | "mining" | "construction";
  /** Nav and card label. */
  name: string;
  /** Card headline. */
  headline: string;
  /** Level 2 positioning line from the messaging hierarchy. */
  positioning: string;
  /** Page hero H1. */
  pageTitle: string;
  /** Pipe-separated capability line under the page H1. */
  pageSubtitle: string;
  /** Hero paragraph. Kept under 30 words. */
  heroCopy: string;
  /** Homepage card paragraph. Kept under 25 words. */
  cardCopy: string;
  valueHeadline: string;
  valueCopy: string;
  services: ServiceGroup[];
  targetMarkets: string[];
  cta: { primary: string; secondary: string };
  image: { src: string; alt: string };
};

export const sectors: Sector[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Healthcare Infrastructure Solutions",
    positioning: "Sub-Saharan Africa's Leading Healthcare Infrastructure Partner",
    pageTitle: "Sub-Saharan Africa's Leading Healthcare Infrastructure Solutions Partner",
    pageSubtitle: "Medical Supply · Medical Consultancy · Biomedical Engineering",
    heroCopy:
      "We do not just supply medical equipment. We architect complete healthcare ecosystems, from facility design through biomedical engineering and 24/7 emergency support.",
    cardCopy:
      "Medical supply, consultancy, and biomedical engineering with direct OEM relationships and 24/7 emergency support.",
    valueHeadline: "Healthcare Excellence Requires Premium Standards",
    valueCopy:
      "Healthcare is life-critical. Every engagement carries uncompromising quality, regulatory precision, and long-term commitment. The integrated model of supply, consultancy, and biomedical engineering is what lets one team carry a hospital project from feasibility study to a signed maintenance agreement.",
    services: [
      {
        title: "Medical Supply",
        items: [
          "Surgical and operating theatre consumables",
          "Infection control and PPE",
          "Diagnostic and laboratory reagents",
          "Patient care and general hospital supplies",
          "GDP-certified cold chain with IoT temperature telemetry",
          "Emergency dispatch for urgent supply needs",
        ],
      },
      {
        title: "Medical Consultancy",
        items: [
          "Hospital planning and feasibility studies",
          "Clinical facility design and workflow layout",
          "Medical technology assessment and life-cycle audits",
          "Quality accreditation and clinical governance",
          "Healthcare workforce capacity building",
        ],
      },
      {
        title: "Biomedical Engineering",
        items: [
          "Diagnostic imaging systems",
          "ICU and critical care equipment",
          "Operating theatre systems",
          "Laboratory and sterilisation infrastructure",
          "Installation, commissioning, and staff training",
          "Preventative maintenance and 24/7 emergency repair",
        ],
      },
    ],
    targetMarkets: [
      "Teaching and specialist hospitals",
      "State and federal health ministries",
      "Private hospital groups and clinics",
      "Diagnostic and laboratory chains",
      "International health development agencies",
    ],
    cta: {
      primary: "Schedule a healthcare consultation",
      secondary: "Discuss equipment needs",
    },
    image: {
      src: "/img/healthcare/hero.webp",
      alt: "Clinical equipment in a hospital critical care unit",
    },
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    headline: "Agricultural Development and Export",
    positioning: "Africa's Integrated Agricultural Development Partner",
    pageTitle: "Africa's Integrated Agricultural Development and Export Solutions Partner",
    pageSubtitle: "Production Consulting · Export Facilitation · Supply Chain Optimisation",
    heroCopy:
      "We connect your crops to global markets through production consulting, export facilitation, and supply chains built for perishable goods.",
    cardCopy:
      "Production consulting, export facilitation, and supply chains connecting growers to premium international buyers.",
    valueHeadline: "From Farm to Global Market",
    valueCopy:
      "Three capabilities applied to agricultural development. Production consulting to lift yields and strengthen cooperatives. Strategic trading to secure quality inputs and reliable delivery. Export services to find buyers, manage certification, and coordinate logistics.",
    services: [
      {
        title: "Production Consulting",
        items: [
          "Crop diversification and production planning",
          "Cooperative development and organisational strengthening",
          "Financial advisory and investment planning",
          "Yield optimisation and sustainable farming practice",
          "Export readiness assessment",
        ],
      },
      {
        title: "Supply Chain and Trading",
        items: [
          "Seed and crop input sourcing",
          "Direct agro-chemical manufacturer relationships",
          "Agricultural equipment procurement",
          "Cold chain logistics for perishables",
          "Export-grade packaging and handling materials",
        ],
      },
      {
        title: "Export Facilitation",
        items: [
          "Crop export strategy and buyer identification",
          "GlobalGAP and organic certification support",
          "Quality assurance and grading standards",
          "Buyer matching and contract negotiation support",
          "Logistics coordination and trade documentation",
        ],
      },
    ],
    targetMarkets: [
      "Smallholder farmer cooperatives",
      "Commercial agricultural enterprises and plantations",
      "Agricultural development agencies and NGOs",
      "Agro-processing businesses",
      "Export-focused farming operations",
    ],
    cta: {
      primary: "Get an agriculture scaling assessment",
      secondary: "Discuss export opportunities",
    },
    image: {
      src: "/img/agriculture/hero.webp",
      alt: "Farmland under cultivation in West Africa",
    },
  },
  {
    slug: "mining",
    name: "Mining",
    headline: "Mining Operations and Market Access",
    positioning: "Africa's Integrated Mining Operations Partner",
    pageTitle: "Africa's Integrated Mining Operations and Market Access Solutions Partner",
    pageSubtitle: "Operational Consulting · Equipment Sourcing · Export and Market Access",
    heroCopy:
      "We optimise mining operations and connect them to global markets, from efficiency consulting to specialised equipment sourcing and mineral export.",
    cardCopy:
      "Operational consulting, specialised equipment sourcing, and export facilitation into tier-1 international buyer networks.",
    valueHeadline: "Mining Excellence From Operations to Export",
    valueCopy:
      "Operational excellence through efficiency consulting, safety protocol development, and cost modelling. Equipment and supply chains that reach remote sites. Global market access through established buyer networks and commodity pricing intelligence.",
    services: [
      {
        title: "Operational Consulting",
        items: [
          "Operational efficiency and extraction optimisation",
          "Health and safety protocol development",
          "Environmental compliance and sustainability planning",
          "Community relations and social impact management",
          "Cost optimisation and financial modelling",
        ],
      },
      {
        title: "Equipment and Supply Chain",
        items: [
          "Specialised mining equipment sourcing",
          "Direct manufacturer relationships",
          "Supply chain logistics for remote sites",
          "Safety gear and operational supplies",
          "Replacement parts inventory management",
        ],
      },
      {
        title: "Export and Market Access",
        items: [
          "Mineral export facilitation",
          "Tier-1 buyer networks across Europe, Asia, and the Americas",
          "International trading standards compliance",
          "Commodity pricing intelligence",
          "Shipping, logistics, and documentation coordination",
        ],
      },
    ],
    targetMarkets: [
      "Commercial mining operators",
      "Mining cooperatives and associations",
      "Mining investment groups",
      "Government mining agencies",
      "Industrial minerals producers",
    ],
    cta: {
      primary: "Discuss mining solutions",
      secondary: "Explore equipment sourcing",
    },
    image: {
      src: "/img/mining/hero.webp",
      alt: "Heavy extraction equipment at an open mining operation",
    },
  },
  {
    slug: "construction",
    name: "Construction",
    headline: "Construction Solutions and Sourcing",
    positioning: "Africa's Integrated Construction Partner",
    pageTitle: "Africa's Integrated Construction Solutions and International Sourcing Partner",
    pageSubtitle: "Project Consulting · Materials and Equipment · International Coordination",
    heroCopy:
      "We simplify complex construction projects through strategic planning, reliable sourcing, and coordination that keeps timelines and budgets intact.",
    cardCopy:
      "Project planning, international material sourcing, and equipment procurement that keeps projects on schedule and on budget.",
    valueHeadline: "Construction Success Through Strategic Solutions",
    valueCopy:
      "Project consulting covering feasibility, cost optimisation, and quality control. Materials and equipment sourced locally and internationally with supplier coordination. International coordination handling imports, customs, and regulatory navigation.",
    services: [
      {
        title: "Project Consulting",
        items: [
          "Project planning and feasibility studies",
          "Cost optimisation and timeline management",
          "Quality control frameworks and compliance",
          "Workforce planning and training",
          "Risk management and contingency planning",
        ],
      },
      {
        title: "Materials and Equipment",
        items: [
          "Building materials sourcing, local and international",
          "Construction equipment procurement and rental",
          "Specialised tools and safety equipment",
          "Supplier coordination and quality assurance",
        ],
      },
      {
        title: "International Coordination",
        items: [
          "International material and equipment sourcing",
          "Contractor networking and coordination",
          "Equipment import facilitation and customs clearance",
          "Regulatory compliance navigation",
          "Supplier relationship management",
        ],
      },
    ],
    targetMarkets: [
      "Construction firms, SME to mid-sized",
      "Real estate development companies",
      "Infrastructure project developers",
      "Government construction agencies",
      "Large-scale project developers",
    ],
    cta: {
      primary: "Plan your construction project",
      secondary: "Discuss material sourcing",
    },
    image: {
      src: "/img/construction/hero.webp",
      alt: "Construction site with structural steel and site coordination underway",
    },
  },
];

export const sectorBySlug = Object.fromEntries(
  sectors.map((s) => [s.slug, s]),
) as Record<Sector["slug"], Sector>;

/** Slugs served by the shared /sectors/[slug] template. Healthcare has a bespoke route. */
export const templatedSectorSlugs = sectors
  .filter((s) => s.slug !== "healthcare")
  .map((s) => s.slug);

export type EquipmentGroup = {
  title: string;
  items: string[];
};

export const equipmentPortfolio: EquipmentGroup[] = [
  {
    title: "Diagnostic imaging",
    items: [
      "Digital X-Ray, DR and CR with PACS integration",
      "Multi-slice CT scanners, 16 / 64 / 128 slice",
      "High-field MRI systems",
      "Doppler ultrasound, portable and stationary",
      "Mammography systems",
      "C-Arm fluoroscopy",
    ],
  },
  {
    title: "ICU and critical care",
    items: [
      "Mechanical ventilators, basic through advanced",
      "Multi-parameter patient monitors",
      "Anaesthesia workstations",
      "Defibrillators, manual and semi-automatic",
      "Syringe and infusion pumps",
      "Neonatal incubators",
    ],
  },
  {
    title: "Operating theatre",
    items: [
      "LED shadowless surgical lights",
      "Modular operating tables, hydraulic and electric",
      "Electrosurgical generators, monopolar and bipolar",
      "Endoscopy towers and instruments",
      "Laparoscopic suites with full video systems",
    ],
  },
  {
    title: "Laboratory and sterilisation",
    items: [
      "Automated clinical chemistry analysers",
      "5-part differential haematology analysers",
      "Blood bank refrigerators",
      "Centrifuges, micro and large capacity",
      "Autoclaves and sterilisation systems",
    ],
  },
];

export type LifecycleStage = {
  name: string;
  scope: string;
};

export const projectLifecycle: LifecycleStage[] = [
  {
    name: "Needs analysis",
    scope:
      "Site assessment, clinical workflow mapping, infrastructure readiness audit covering power, HVAC, and radiation shielding, and financial budgeting.",
  },
  {
    name: "Specification and design",
    scope:
      "Technical specification customisation, optimal OEM platform selection, architectural CAD planning, and bill of quantities.",
  },
  {
    name: "Procurement and shipping",
    scope:
      "Direct OEM order placement, factory acceptance testing at the manufacturer, international freight, customs clearance, and secure warehousing in transit.",
  },
  {
    name: "Civil works and installation",
    scope:
      "Room preparation including lead lining, epoxy flooring, and electrical stabilisation. Equipment positioning, utilities connection, and system integration.",
  },
  {
    name: "Testing and staff training",
    scope:
      "System calibration and safety checks, clinical application training for medical staff, technical handoff to local engineers, and documentation.",
  },
  {
    name: "SLA and life-cycle management",
    scope:
      "Warranty activation, scheduled preventative maintenance visits, continuous software updates, and consumable replenishment.",
  },
];

export type SupportCommitment = {
  title: string;
  copy: string;
};

export const afterSalesSupport: SupportCommitment[] = [
  {
    title: "Installation and commissioning",
    copy: "On-site installation by certified technicians, acceptance testing to OEM specification, and clinical staff training before handover.",
  },
  {
    title: "Preventative maintenance contracts",
    copy: "Quarterly or bi-annual scheduled visits, proactive component replacement ahead of failure, and performance optimisation checks.",
  },
  {
    title: "24/7 emergency repair",
    copy: "Emergency hotline with a guaranteed response under 4 hours within Lagos State and 24 hours nationwide, with backup equipment rental during repairs.",
  },
  {
    title: "Local spare parts warehousing",
    copy: "Genuine replacement parts, motherboards, circuit boards, and transducers stocked in Lagos, removing months-long import delays on a failed component.",
  },
];

export const qualityMandate =
  "Every medical device imported and installed undergoes pre-dispatch testing and post-installation validation prior to final clinical sign-off.";

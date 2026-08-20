/**
 * Rendered as compliance-alignment statements, not accreditation seals.
 * TODO(client): confirm which of these are held certifications vs frameworks
 * the company aligns its processes to. The distinction is material in Nigerian
 * public tendering and must be correct before launch.
 */
export type Certification = {
  abbr: string;
  full: string;
  scope: string;
  note: string;
};

export const certifications: Certification[] = [
  {
    abbr: "NAFDAC",
    full: "National Agency for Food and Drug Administration and Control",
    scope: "Healthcare",
    note: "Medical device registration and chemical import compliance.",
  },
  {
    abbr: "SONCAP",
    full: "Standards Organisation of Nigeria Conformity Assessment Programme",
    scope: "All sectors",
    note: "Conformity assessment for imported electromechanical equipment.",
  },
  {
    abbr: "SON",
    full: "Standards Organisation of Nigeria",
    scope: "All sectors",
    note: "Product standards adherence across imported goods.",
  },
  {
    abbr: "ISO 13485",
    full: "Medical Devices Quality Management Systems",
    scope: "Healthcare",
    note: "Internal quality processes mapped to the standard.",
  },
  {
    abbr: "ISO 9001",
    full: "Quality Management Systems, 2015 revision",
    scope: "All sectors",
    note: "Operational quality management framework.",
  },
  {
    abbr: "NNRA",
    full: "Nigerian Nuclear Regulatory Authority",
    scope: "Healthcare",
    note: "Radiation safety for X-ray, CT, and emitting equipment installation.",
  },
];

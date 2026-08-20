import type { Sector } from "./sectors";

export type CaseStudy = {
  slug: string;
  sector: Sector["slug"];
  title: string;
  client: string;
  scope: string;
  deliverables: string[];
  result: string;
  image: { src: string; alt: string };
};

/**
 * Only case studies with concrete, documented scope ship. The brand document
 * carries one-sentence summaries for agriculture, mining, and construction with
 * no client, no scope, and unsourced percentage claims. Those are held back.
 *
 * TODO(client): supply project scope, timeline, and a named or anonymised client
 * for one agriculture, one mining, and one construction project. The section
 * component already renders any entry added to this array.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "lagos-icu-modernisation",
    sector: "healthcare",
    title: "40-bed ICU and theatre modernisation",
    client: "Specialist healthcare facility, Lagos",
    scope:
      "Complete modernisation and equipping of a 40-bed intensive care unit and three operating theatres.",
    deliverables: [
      "Architectural spatial review with HVAC and medical gas line integration design",
      "Supply and installation of 12 ICU ventilators and multi-parameter monitors",
      "LED theatre lighting and surgical tables across three theatres",
      "Clinical application training for 35 nurses and 8 anaesthesiologists",
      "Three-year comprehensive maintenance agreement with quarterly preventative visits",
    ],
    result:
      "Commissioned two weeks ahead of schedule, with zero downtime recorded across the first 24 months of continuous operation.",
    image: {
      src: "/img/healthcare/icu-project.webp",
      alt: "Intensive care unit bay with ventilator and patient monitoring equipment",
    },
  },
];

export const caseStudiesBySector = (slug: Sector["slug"]) =>
  caseStudies.filter((c) => c.sector === slug);

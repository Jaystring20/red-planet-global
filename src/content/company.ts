export const company = {
  legalName: "Red Planet Global Concepts Limited",
  shortName: "Red Planet Global",
  rc: "RC 1503922",
  tagline: "Connecting Ambitions with Global Opportunities",
  positioning:
    "Africa's Premier Integrated Solutions Partner for Healthcare, Agriculture, Mining, and Construction",
  address: {
    street: "29, William Awodein Drive",
    area: "Oko-Oba Scheme 1",
    city: "Agege",
    state: "Lagos",
    country: "Nigeria",
  },
  phone: "+234 (0) 802 655 3838",
  phoneHref: "+2348026553838",
  hours: "Monday to Friday, 9:00 AM to 5:00 PM WAT",
  /** TODO(client): confirm live domain. Brand doc uses redplanetglobal.com; signage mockup shows redplanet.com. */
  emails: {
    general: "info@redplanetglobal.com",
    healthcare: "healthcare@redplanetglobal.com",
    agriculture: "agriculture@redplanetglobal.com",
    mining: "mining@redplanetglobal.com",
    construction: "construction@redplanetglobal.com",
  },
  responsePromise: "Our team responds within 24 business hours.",
} as const;

export const leadership = [
  {
    name: "Lawal Adeyinka Kafayat",
    role: "Chief Executive Officer and Director",
    bio: "Leads strategic direction, global OEM partnerships, and government relations across all four sector verticals.",
  },
] as const;

/**
 * TODO(client): four further leadership roles are described in the brand document
 * with [Name] placeholders. They are intentionally not rendered until real names,
 * credentials, and headshots are supplied:
 *   - Head of Healthcare Division (certified medical practitioner)
 *   - Chief Biomedical Engineer and Operations (M.Sc., COREN certified)
 *   - Head of Supply Chain and Global Procurement
 *   - Sector heads for Agriculture, Mining, Construction
 */

# Red Planet Global Concepts — Build Handoff

Next.js 16 (App Router) + Tailwind v4. All 15 routes prerender as static HTML.

```bash
npm run dev
```

## What is built

| Route | Notes |
|---|---|
| `/` | 8 sections, 8 distinct layout families |
| `/healthcare` | Deep vertical: 3 divisions, equipment portfolio, 6-stage lifecycle, support, project record, QA |
| `/sectors/agriculture` · `/mining` · `/construction` | One shared template, so the three stay at equal weight by construction |
| `/capabilities` | Trading, consulting, export, each cross-applied to all four sectors |
| `/about` | Story, leadership, regulatory alignment, partnerships |
| `/contact` | Routed inquiry form, `?sector=` prefill |
| `/credits` | Image attribution, `noindex` |
| `sitemap.xml` · `robots.txt` · 404 | Organization JSON-LD carries RC 1503922 and the Lagos address |

## Content lives in data, not JSX

Edit `src/content/*.ts` to change copy. Nothing in the layout needs touching.

- `company.ts` — address, phone, sector inboxes, leadership
- `sectors.ts` — the load-bearing file; drives nav, homepage grid, and all sector pages
- `capabilities.ts`, `healthcare.ts`, `certifications.ts`, `caseStudies.ts`
- `imageCredits.ts` — delete once real photography replaces the stand-ins

## Design decisions that departed from the brand document

**Palette.** The brand document prescribes burgundy primary, navy secondary, and a
different colour theme per sector. The actual logo package is red, black, white, and a
gold RC mark, with no navy, green, or burgundy anywhere. The site is built from the
assets, with one accent locked across every route. Sector differentiation is
photographic. Four colour themes would have read as four websites and undone the
integrated-enterprise positioning the same document asks for.

Tokens are in `src/app/globals.css` under `@theme`.

**Font.** Nexa is the brand font. Outfit is standing in as the closest open geometric
grotesk. When the Nexa licence files arrive, drop the `.woff2` files into
`src/app/fonts/`, swap the `Outfit()` call in `layout.tsx` for `localFont()`, and keep
the `--font-brand` variable name so nothing else changes.

## Not connected yet

**The inquiry form does not send.** With no `SUPABASE_URL` or `RESEND_API_KEY` set, it
shows an honest error and directs people to the phone number rather than faking a
success state. To connect it:

1. Create a Supabase project. Your account currently has only "Mandh Eyewear", which is
   an unrelated client, so nothing was added to it.
2. Apply `supabase/migrations/0001_rp_inquiries.sql`.
3. Verify a sending domain in Resend.
4. Copy `.env.example` to `.env.local` and fill it in.

Validation, per-field errors, the honeypot, the success state, and the error state are
all built and tested.

## What is deliberately empty

These render as soon as data is added, and are left blank rather than invented:

- **Leadership** beyond the CEO. Four roles in the brand document are `[Name]`
  placeholders. Add entries to `leadership` in `src/content/company.ts`.
- **The 25-35% operational improvement and 40%+ farmer income figures.** Unsourced. They
  are off the site until there is a basis for them, because a health ministry will read
  this page.
- **Agriculture, mining, and construction case studies.** The brand document has one
  unattributed sentence each, with no client and no scope. Add to
  `src/content/caseStudies.ts` and they appear.
- **Testimonials and named OEM partner logos.** None exist yet.

**Certifications render as compliance-alignment statements, not accreditation seals.**
Confirm which are held versus aligned-to before launch. In Nigerian public tendering
that distinction can disqualify a bid.

## Photography needs replacing

Free-licence pools could not deliver African-context sector photography at the quality
this site needs. Eight images are in place from Wikimedia Commons as stand-ins. None
show Red Planet's work and none were shot in Nigeria: the port is Rotterdam, the ICU is
Belgian, the theatre is Australian, the mine is German, the crane is in Oregon.

All eight are CC BY or CC BY-SA, which is why `/credits` exists. Replace them with
project photography and both the credits page and `imageCredits.ts` can be deleted.

Two slots have no image at all and use a text-only treatment instead: the consulting
capability, and any people or team photography.

## Verified

Measured across all 10 routes at 1440 and 375:

- Zero em-dashes anywhere on the site
- WCAG AA contrast on every text and interactive element (contrast measured through
  canvas flattening, so `oklab()` and alpha colours resolve correctly)
- No horizontal overflow, no wrapped CTAs
- Eyebrow count within budget on every page (homepage 3 of 3)
- One `h1` per page, no missing alt text
- Nav renders on one line at desktop, 69px tall, burger below `lg`
- Hero fits the first viewport at both widths with both CTAs visible
- Form: `?sector=mining` prefill, server-side validation errors, unconfigured-backend
  error path
- `npm run build` clean, 15 routes static

Not run: Lighthouse and a Fast 3G pass. The Browser pane would not composite frames in
this session, so no screenshots were captured and no visual-only review was possible.
Worth doing both before launch.

## Open questions

1. Nexa licence files?
2. Original logo vectors? The current lockups were keyed out of the WhatsApp JPEGs.
   They are clean, but vectors would be better.
3. Domain: signage mockup shows `redplanet.com`, brand document uses
   `redplanetglobal.com`. Which is real, and are the four sector inboxes provisioned?
4. Source for the 25-35% and 40%+ figures?

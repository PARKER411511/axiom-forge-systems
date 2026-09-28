# Axiom Forge Systems

## A fictional industrial systems concept for an Upwork portfolio

Axiom Forge Systems is a concept website for demonstrating product storytelling, responsive interaction design, and technical-content architecture in a demanding industrial context. It is not a real manufacturer, supplier, certification holder, or customer case-study archive.

### Short project description

Designed and built a premium industrial systems portfolio concept that turns dense product and engineering information into a clear path from application brief to technical handoff. The work combines responsive interface design, local-only form interactions, product comparison, technical resource previews, and concept-safe storytelling for an Upwork portfolio sample.

### Role and scope

**Role:** Product designer and frontend engineer for the portfolio concept.

**Scope:** Information architecture, art direction, responsive UI implementation, product/resource data modeling, comparison interaction, RFQ/contact flows, accessibility refinements, route metadata, social previews, and PDF reference production. No backend intake, customer deployment, certification work, or real client research was included.

### The brief

Create a premium industrial site that can hold dense specification data without feeling like a catalogue. The experience needed to support eight product systems, seven industries, six illustrative projects, technical reference downloads, a structured request-for-quote flow, and a contact handoff—while staying clear on mobile.

### What I shaped

- A restrained editorial visual system using dark graphite, warm orange, generous spacing, and locally loaded variable fonts.
- A precision-led redesign: a shorter equipment hero, an early four-system catalogue rail inspired by compact technical cards, unique cutouts for eight systems, and dedicated environments for all six illustrative projects. The art direction and image plan are in `VISUAL_SYSTEM.md`.
- A product catalogue with URL-backed search, product-family, industry, and application filters. Browser Back/Forward restores the visible result set.
- A three-system comparison for early screening and a searchable reference library with local PDF previews and downloads.
- Product and project detail routes with responsive `next/image` crops, technical specifications, related systems, illustrative technical depth, and route-specific metadata.
- An accessible RFQ flow with model prefill, select-based choices, validation, step announcements, focus/scroll management, draft recovery, attachment guards, review editing, and local copy/download completion.
- A contact flow that prepares a local summary for copy or download without pretending to send data to a backend.
- Distinct Resources and Request a Quote social previews with accurate 1200 × 630 metadata, plus smaller optimized product-sheet PDFs and a worked conceptual pump/system-curve illustration.
- Mobile navigation with Escape handling, focus containment, scrollable short-viewport behavior, and reduced-motion support.
- Industry jump links, related project links, deep-linked footer navigation, a custom 404 route, and concept-safe about/quality language.

### Technical notes

The site uses Next.js 16 App Router, React 19, TypeScript, `next/image`, static route generation for known product/project slugs, and metadata generated from shared data helpers. Content remains local and intentionally inspectable. The request and contact forms are front-end portfolio interactions only; no data is transmitted.

### Evidence and limitations

The performance figures shown inside the fictional project scenarios are narrative placeholders used to demonstrate hierarchy and case-study composition. They are not verified customer or business outcomes. Standards language is framed as an illustrative quality reference, not as certification. Final product, compliance, and operating claims would require source documentation from a real manufacturer.

### Screenshot plan

Capture a small, honest set of views for the portfolio proposal:

1. Desktop home: precision hero, four-system product rail, and Rotterdam scenario entry point.
2. Mobile products: comparison tray with the visible “Swipe to compare” cue and a horizontally scrollable table.
3. Desktop Resources: featured document cover, compact secondary references, and file-size metadata.
4. RFQ flow: project-details step with “Help me select a system” and optional model/quantity choices, followed by the local-only completion state.
5. Rotterdam project detail: conceptual system-curve diagram, annotated equipment view, and commissioning sequence.

Add a small caption to each screenshot noting viewport size and that all company names, outcomes, product values, and form behavior are illustrative demo content.

### Verification

The implementation was checked with:

- Source-file ESLint check (excluding generated build output)
- `npx tsc --noEmit --incremental false`
- `npm run build`

The project intentionally has no backend intake. Verify the deployed URL and capture fresh screenshots before publishing the Upwork case study.

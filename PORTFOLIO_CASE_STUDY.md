# Axiom Forge Systems

## A fictional industrial systems concept for an Upwork portfolio

Axiom Forge Systems is a concept website for demonstrating product storytelling, responsive interaction design, and technical-content architecture in a demanding industrial context. It is not a real manufacturer, supplier, certification holder, or customer case-study archive.

### The brief

Create a premium industrial site that can hold dense specification data without feeling like a catalogue. The experience needed to support eight product systems, seven industries, six illustrative projects, technical reference downloads, a structured request-for-quote flow, and a contact handoff—while staying clear on mobile.

### What I shaped

- A restrained editorial visual system using dark graphite, warm orange, generous spacing, and locally loaded variable fonts.
- A product catalogue with URL-backed search, product-family, industry, and application filters. Browser Back/Forward restores the visible result set.
- Product and project detail routes with responsive `next/image` crops, technical specifications, related systems, illustrative technical depth, and route-specific metadata.
- An accessible RFQ flow with model prefill, select-based choices, validation, step announcements, focus/scroll management, draft recovery, attachment guards, review editing, and local copy/download completion.
- A contact flow that prepares a local summary for copy or download without pretending to send data to a backend.
- Mobile navigation with Escape handling, focus containment, scrollable short-viewport behavior, and reduced-motion support.
- Industry jump links, related project links, deep-linked footer navigation, a custom 404 route, and concept-safe about/quality language.

### Technical notes

The site uses Next.js 16 App Router, React 19, TypeScript, `next/image`, static route generation for known product/project slugs, and metadata generated from shared data helpers. Content remains local and intentionally inspectable. The request and contact forms are front-end portfolio interactions only; no data is transmitted.

### Evidence and limitations

The performance figures shown inside the fictional project scenarios are narrative placeholders used to demonstrate hierarchy and case-study composition. They are not verified customer or business outcomes. Standards language is framed as an illustrative quality reference, not as certification. Final product, compliance, and operating claims would require source documentation from a real manufacturer.

### Verification

The implementation was checked with:

- `npm run lint`
- `npx tsc --noEmit --incremental false`
- `npx next build --webpack`

The project intentionally has no backend or deployment step in this portfolio artifact.

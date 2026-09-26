# Axiom Forge Systems

A portfolio concept for a fictional industrial equipment manufacturer. The company, products, project results, and certifications are fictional.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production check, run `npm run build` and `npm run start`.

## Site structure

- `app/` contains the homepage, catalog, case studies, industries, resources, company, contact, and quote routes.
- `components/` contains shared navigation, cards, and section elements.
- `lib/data.ts` contains the portfolio product, project, resource, industry, and navigation data.
- `public/images/` contains the site imagery, including generated industrial concept photos.

Product filters and the five-step quote flow work in the browser. The quote and contact submissions are simulations; no message, file, or personal data is sent to a server. Resource and datasheet entries are portfolio placeholders and do not link to technical documents.

Built with Next.js App Router, TypeScript, Tailwind CSS, and locally bundled Manrope and Inter fonts.

# Portfolio content and visuals

This continues the existing Next.js / Express / Redis project. The original service catalog, persistent cart, checkout estimate, contact form, newsletter adapter, Docker configuration, and brand assets remain in place.

## Pages

| Route            | Content                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| /                | Portfolio introduction, capabilities, selected work, and about summary         |
| /projects        | Eight searchable and filterable software projects with supplied imagery        |
| /projects/[slug] | Project image gallery, problem, approach, and proposed toolkit                  |
| /showcase        | Six original website previews with industry filters and search                 |
| /showcase/[slug] | Standalone, interactive fictional business website                             |
| /about           | Introduction and working approach                                              |
| /services        | Existing API-backed service catalog and ordering entry point                   |
| /checkout        | Existing server-priced mock checkout                                           |
| /contact         | Existing project inquiry form                                                  |

The header theme control defaults to **White** and offers **Blue** and **Black**. The preference is stored as `kumarthapa-theme` in localStorage and also applies to the service cart. Showcase websites retain their own brand identities.

## Replace a temporary image

1. Add the real image to `client/public/visuals/` (or a new folder under `public/`).
2. Update its entry in `client/src/content/visuals.ts`:

   ```ts
   spa: {
     src: "/visuals/real-spa.jpg",
     alt: "Describe the actual space shown in the photograph",
     position: "center",
     origin: "client-supplied",
   }
   ```

3. Keep the same entry name. Gallery thumbnails and demo pages pick up the replacement automatically.

The optional `position` sets the image crop, such as `"60% 40%"`. The layout owns the dimensions, so changing image resolution does not change the page structure. Use local assets for optimized delivery; HTTPS sources are supported without optimization. Failed images show a styled fallback instead of an empty box.

Room, product, and journey entries in `client/src/content/demo-content.ts` each have their own `visual` field. They can point to any manifest entry or an inline asset object.

## Update project images

Project images live in `client/public/visuals/projects/` and are described by `projectImages` in `client/src/content/visuals.ts`. Each project in `client/src/content/portfolio.ts` requires a primary `visual` and can include more images in `gallery`:

```ts
visual: projectImages.mattressDashboard,
gallery: [projectImages.mattressReports],
```

Each image entry includes `src`, descriptive `alt` text, a `caption`, its native `width` and `height`, `fit: "contain"`, and `origin: "client-supplied"`. Cards preserve the complete image inside a consistent frame. Detail galleries use the original aspect ratio and link to the full-resolution file. Next.js optimizes local images for their displayed size. The old generated dashboard renderer has been removed.

Nine supplied images cover manufacturing (dashboard and reports), asset tracking, fleet, POS billing, inventory, B2B, CRM, and laundry. The former `/projects/rfid-billing-inventory` URL permanently redirects to `/projects/b2b-software`.

Update descriptions and project status when verified details are available. The technology lists remain proposed toolkits; image contents do not establish client relationships or delivery metrics.

## Edit sample content

- `client/src/content/portfolio.ts`: project titles, descriptions, categories, features, technology, and showcase summaries.
- `client/src/content/demo-content.ts`: treatments, menu dishes, room descriptions, sample prices, products, and journeys.
- `client/src/components/showcase/`: each brand has a separate layout and page copy.
- `client/src/app/themes.css`: portfolio White / Blue / Black tokens and shared chrome.
- `client/src/app/portfolio.css`: portfolio layout and project image galleries.
- `client/src/app/showcase.css`: independent demo design systems.
- `server/src/data/catalog.ts`: original service catalog, prices, and local service thumbnail paths.

Demo interactions are local previews: booking forms do not send messages, the retail bag does not accept payments, the hotel does not query live availability, and Orbit does not create accounts. The real portfolio contact and newsletter forms continue to use their existing backend adapters.

## Image provenance

The nine files in `client/public/visuals/projects/` and `business-studio.png` were supplied by the user. Project source images are preserved without cropping or content edits.

Other concept photographs and artwork were created with the built-in image-generation tool in generation mode, with no input images. Original prompts and output filenames are recorded in `client/src/content/visual-prompts.json`; each slug maps to `public/visuals/[slug].png`. The original company logo files and favicon are separate from these concept assets.

## Backend connections

The browser API helper remains `client/src/lib/api.ts`. It calls same-origin `/api/*`. In local development, `client/next.config.ts` forwards those calls to `API_URL` (default `http://127.0.0.1:4000`). Express routes remain in `server/src/routes/index.ts`.

The portfolio and showcases render without the API. Services, checkout quotes, contact delivery, and newsletter signup require the existing API and Redis setup. Actual inquiry and newsletter delivery also require their configured webhook providers. See `RUN_COMMANDS.md` and `README.md`.

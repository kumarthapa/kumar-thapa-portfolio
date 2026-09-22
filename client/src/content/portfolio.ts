import { visuals, type VisualAsset, type VisualKey } from "./visuals";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  eyebrow: string;
  challenge: string;
  approach: string;
  features: string[];
  stack: string[];
  accent: string;
  visual?: VisualAsset;
  dashboard:
    | "manufacturing"
    | "tracking"
    | "fleet"
    | "billing"
    | "inventory"
    | "integrated";
};

// These are presentation concepts, not claims about completed client engagements.
export const projects: Project[] = [
  {
    slug: "rfid-manufacturing",
    title: "RFID Mattress Manufacturing",
    category: "Manufacturing",
    eyebrow: "FROM RAW MATERIAL TO DISPATCH",
    description:
      "A connected view of production, quality checks, and every mattress on the floor.",
    challenge:
      "Paper handovers make it difficult to see which stage an item has reached or trace an issue back to its source.",
    approach:
      "Give each item a unique RFID identity. Surface scan events on a shared production board so operators can follow an item from assembly to dispatch.",
    features: [
      "RFID identification at each workstation",
      "Production stages and quality holds",
      "Batch history and dispatch readiness",
      "Role-based views for operators and managers",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "RFID"],
    accent: "#35b8ff",
    dashboard: "manufacturing",
  },
  {
    slug: "rfid-asset-tracking",
    title: "RFID Asset Tracking",
    category: "Tracking & IoT",
    eyebrow: "EVERY ASSET, ACCOUNTED FOR",
    description:
      "Location, custody, and maintenance history for the equipment your team relies on.",
    challenge:
      "Shared equipment moves between departments, while spreadsheets rarely reflect its latest location or custodian.",
    approach:
      "Connect reader events to an asset register, with a clear history of assignments, returns, and maintenance checks.",
    features: [
      "Reader zones and asset movement history",
      "Check-in and check-out records",
      "Maintenance reminders",
      "Exception review for missing assets",
    ],
    stack: ["Next.js", "MQTT", "PostgreSQL", "RFID"],
    accent: "#2ed3c1",
    dashboard: "tracking",
  },
  {
    slug: "fleet-management",
    title: "Fleet Management",
    category: "Transportation",
    eyebrow: "A CLEARER ROAD AHEAD",
    description:
      "Plan routes, follow vehicle activity, and bring everyday fleet operations into one place.",
    challenge:
      "Dispatchers need a shared view of vehicles, scheduled journeys, and maintenance without switching between disconnected tools.",
    approach:
      "Combine a map-led dispatch workspace with trip records, vehicle profiles, and a practical maintenance calendar.",
    features: [
      "Map-based vehicle and route overview",
      "Driver assignments and trip status",
      "Service schedules and maintenance logs",
      "Vehicle document tracking",
    ],
    stack: ["React", "Node.js", "Maps", "GPS"],
    accent: "#69c8ff",
    dashboard: "fleet",
  },
  {
    slug: "billing-software",
    title: "Billing Software",
    category: "Business Software",
    eyebrow: "LESS ADMIN. MORE BUSINESS.",
    description:
      "A focused billing workspace for invoices, customers, and day-to-day sales.",
    challenge:
      "Small teams lose time repeating customer and product information across invoices and sales records.",
    approach:
      "Bring product selection, customer details, and invoice creation together in a simple workflow, with clear payment states.",
    features: [
      "Itemized invoices and printable receipts",
      "Customer and product directory",
      "Payment status and sales history",
      "Store-level reporting",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "REST API"],
    accent: "#9a99ff",
    dashboard: "billing",
  },
  {
    slug: "inventory-management",
    title: "Inventory Management",
    category: "Management",
    eyebrow: "KNOW WHAT YOU HAVE",
    description:
      "Stock movements, purchase orders, and warehouse visibility in one considered interface.",
    challenge:
      "When receiving, picking, and stock adjustments live in separate records, teams struggle to trust availability.",
    approach:
      "Use a central stock ledger with warehouse locations, reorder thresholds, and an auditable movement history.",
    features: [
      "Stock by warehouse and bin",
      "Purchase orders and receiving",
      "Low-stock alerts and reorder planning",
      "Auditable transfers and adjustments",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Barcode"],
    accent: "#f1ba73",
    dashboard: "inventory",
  },
  {
    slug: "rfid-billing-inventory",
    title: "RFID Billing & Inventory",
    category: "Integrated Solution",
    eyebrow: "ONE CONNECTED OPERATION",
    description:
      "Connect item identification, billing, and stock updates across the retail journey.",
    challenge:
      "A sale, a physical item scan, and a stock change should tell the same story, without manual reconciliation.",
    approach:
      "Connect RFID reads to a shared product catalog and transaction ledger, with a review step before a sale is finalized.",
    features: [
      "RFID-assisted product identification",
      "Reviewed basket and invoice flow",
      "Stock updates linked to transactions",
      "Returns and inventory reconciliation",
    ],
    stack: ["Next.js", "Node.js", "RFID", "PostgreSQL"],
    accent: "#53b5ff",
    dashboard: "integrated",
  },
];

export type Showcase = {
  slug: string;
  brand: string;
  category: string;
  title: string;
  description: string;
  direction: string;
  visual: VisualAsset;
  visualKey: Extract<
    VisualKey,
    "spa" | "restaurant" | "hotel" | "retail" | "business" | "lifestyle"
  >;
  headline: string;
  subtitle: string;
  tags: string[];
};

export const showcases: Showcase[] = [
  {
    slug: "avela-spa",
    brand: "avela",
    category: "Spa & Wellness",
    title: "A little space to slow down.",
    description:
      "A quiet, tactile wellness experience in sage, stone, and soft morning light.",
    direction: "Organic & restorative",
    visual: visuals.spa,
    visualKey: "spa",
    headline: "Come back to yourself.",
    subtitle: "Thoughtful rituals. A gentler pace.",
    tags: ["Wellness", "Editorial", "Booking"],
  },
  {
    slug: "casa-ember",
    brand: "CASA EMBER",
    category: "Restaurant",
    title: "Good food. Better company.",
    description:
      "A warm, unapologetically bold restaurant with a seasonal menu at its heart.",
    direction: "Bold & full of flavour",
    visual: visuals.restaurant,
    visualKey: "restaurant",
    headline: "A seat at our table.",
    subtitle: "Fire, flour & the good things in life.",
    tags: ["Hospitality", "Menu", "Reservations"],
  },
  {
    slug: "stillwater-lodge",
    brand: "STILLWATER",
    category: "Hotel & Hospitality",
    title: "Somewhere worth getting lost.",
    description:
      "An immersive alpine retreat with cinematic views and understated luxury.",
    direction: "Quiet alpine luxury",
    visual: visuals.hotel,
    visualKey: "hotel",
    headline: "Stay a little closer to nature.",
    subtitle: "An intimate retreat in the mountains.",
    tags: ["Travel", "Suites", "Enquiries"],
  },
  {
    slug: "form-and-field",
    brand: "form & field",
    category: "Retail & Store",
    title: "Objects for everyday living.",
    description:
      "A design-led homeware store that gives considered materials room to speak.",
    direction: "Modern & material-led",
    visual: visuals.retail,
    visualKey: "retail",
    headline: "Good design. Lived in.",
    subtitle: "Fewer things. Better things.",
    tags: ["Commerce", "Interiors", "Collection"],
  },
  {
    slug: "orbit-workspace",
    brand: "orbit",
    category: "Business & SaaS",
    title: "Less busywork. More momentum.",
    description:
      "An optimistic workspace product with clear benefits and a playful visual identity.",
    direction: "Clear & confidently playful",
    visual: visuals.business,
    visualKey: "business",
    headline: "Make room for your best work.",
    subtitle: "Your projects, finally in sync.",
    tags: ["SaaS", "Product", "Conversion"],
  },
  {
    slug: "roam-outdoors",
    brand: "ROAM",
    category: "Lifestyle",
    title: "Find your kind of outside.",
    description:
      "An editorial adventure brand built around meaningful days in the outdoors.",
    direction: "Earthy & adventurous",
    visual: visuals.lifestyle,
    visualKey: "lifestyle",
    headline: "Less scrolling. More wandering.",
    subtitle: "Small groups. Big landscapes.",
    tags: ["Adventure", "Storytelling", "Experiences"],
  },
];

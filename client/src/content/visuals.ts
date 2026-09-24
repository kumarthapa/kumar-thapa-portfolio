/** Swap src/alt/position when real photography or screenshots are available. */
export type VisualAsset = {
  src: string;
  alt: string;
  position?: string;
  fit?: "cover" | "contain";
  origin: "generated-concept" | "client-supplied";
};

export type ProjectImage = VisualAsset & {
  width: number;
  height: number;
  caption: string;
};

export const projectImages = {
  mattressDashboard: {
    src: "/visuals/projects/mattress-dashboard.png",
    alt: "KUMARTHAPA mattress production dashboard with stage distribution and bonding, packing, tape edge, and zip cover charts",
    caption: "Production dashboard",
    width: 1672,
    height: 941,
    fit: "contain",
    origin: "client-supplied",
  },
  mattressReports: {
    src: "/visuals/projects/mattress-reports.png",
    alt: "Mattress manufacturing reports with production-stage filters, quality-control status, and export options",
    caption: "Production reports & quality control",
    width: 1672,
    height: 941,
    fit: "contain",
    origin: "client-supplied",
  },
  assetTracking: {
    src: "/visuals/projects/asset-tracking.png",
    alt: "RFID asset tracking dashboard showing readers, recent scans, asset locations, and search filters",
    caption: "RFID scans & asset locations",
    width: 1672,
    height: 941,
    fit: "contain",
    origin: "client-supplied",
  },
  fleet: {
    src: "/visuals/projects/fleet-management.png",
    alt: "Fleet management screen showing a vehicle route from Mumbai to Bengaluru with checkpoints and a trip timeline",
    caption: "Vehicle tracking & trip timeline",
    width: 1672,
    height: 941,
    fit: "contain",
    origin: "client-supplied",
  },
  b2b: {
    src: "/visuals/projects/b2b-software.png",
    alt: "Kumar Thapa B2B software presentation with customer, order, inventory, sales, and mobile dashboards",
    caption: "B2B operations across desktop & mobile",
    width: 1536,
    height: 1024,
    fit: "contain",
    origin: "client-supplied",
  },
  crm: {
    src: "/visuals/projects/crm-software.png",
    alt: "CRM dashboard presentation with lead sources, a sales pipeline, customer activities, and task management",
    caption: "Leads, relationships & sales pipeline",
    width: 1536,
    height: 1024,
    fit: "contain",
    origin: "client-supplied",
  },
  inventory: {
    src: "/visuals/projects/inventory-management.png",
    alt: "Inventory management presentation with warehouse stock, reorder levels, product movement, and low-stock alerts",
    caption: "Stock, warehouses & replenishment",
    width: 1672,
    height: 941,
    fit: "contain",
    origin: "client-supplied",
  },
  laundry: {
    src: "/visuals/projects/laundry-management.png",
    alt: "RFID laundry management presentation with item tracking, the order processing pipeline, and mobile laundry status",
    caption: "RFID laundry tracking & order management",
    width: 1672,
    height: 941,
    fit: "contain",
    origin: "client-supplied",
  },
  billing: {
    src: "/visuals/projects/billing-software.png",
    alt: "Restaurant and apparel retail POS screens with product selection, order totals, and payment options",
    caption: "Restaurant & retail point of sale",
    width: 1536,
    height: 1024,
    fit: "contain",
    origin: "client-supplied",
  },
} satisfies Record<string, ProjectImage>;

export const visuals = {
  lakeRoom: {
    src: "/visuals/hotel-lake-room.png",
    alt: "Oak and linen lodge bedroom opening onto a balcony above an alpine lake",
    origin: "generated-concept",
  },
  forestSuite: {
    src: "/visuals/hotel-forest-suite.png",
    alt: "Warm timber suite with a stone fireplace and a private forest terrace",
    origin: "generated-concept",
  },
  chair: {
    src: "/visuals/retail-chair.png",
    alt: "Natural oak lounge chair with oatmeal bouclé cushions",
    origin: "generated-concept",
  },
  table: {
    src: "/visuals/retail-table.png",
    alt: "Cylindrical solid walnut side table with a round top",
    origin: "generated-concept",
  },
  vase: {
    src: "/visuals/retail-vase.png",
    alt: "Chalk-glazed stoneware vessel with a delicate dried branch",
    origin: "generated-concept",
  },
  lakeside: {
    src: "/visuals/journey-lakeside.png",
    alt: "A gentle walking trail along a mountain lake with meadow wildflowers",
    origin: "generated-concept",
  },
  campsite: {
    src: "/visuals/journey-camp.png",
    alt: "A timber hiking hut in a mountain meadow at golden hour",
    origin: "generated-concept",
  },
  studio: {
    src: "/visuals/business-studio.png",
    alt: "A sunlit studio desk with business dashboards on a laptop and phone, alongside an RFID reader",
    position: "right center",
    origin: "client-supplied",
  },
  spa: {
    src: "/visuals/spa.png",
    alt: "Sunlit limestone spa with an emerald plunge pool and natural linen",
    origin: "generated-concept",
  },
  restaurant: {
    src: "/visuals/restaurant.png",
    alt: "Handmade pasta, fresh basil and focaccia on a candlelit Italian supper table",
    origin: "generated-concept",
  },
  hotel: {
    src: "/visuals/hotel.png",
    alt: "A quiet alpine lodge and reflecting pool beneath mountain peaks",
    origin: "generated-concept",
  },
  retail: {
    src: "/visuals/retail.png",
    alt: "Sculptural oak lounge chair and walnut side table in a sunlit apartment",
    origin: "generated-concept",
  },
  business: {
    src: "/visuals/business.png",
    alt: "Interlocking lavender glass arches and a lime sphere",
    origin: "generated-concept",
  },
  lifestyle: {
    src: "/visuals/lifestyle.png",
    alt: "A hiker in a mustard jacket looking across a mountain lake at sunrise",
    origin: "generated-concept",
  },
} satisfies Record<string, VisualAsset>;

export type VisualKey = keyof typeof visuals;

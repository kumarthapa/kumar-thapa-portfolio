/** Swap src/alt/position when real photography or screenshots are available. */
export type VisualAsset = {
  src: string;
  alt: string;
  position?: string;
  origin: "generated-concept" | "client-supplied";
};

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

import { visuals } from "./visuals";
/** Presentation content for fictional showcase brands. Prices are demo prices. */
export const spaTreatments = [
  {
    name: "The grounding ritual",
    duration: "60 minutes",
    price: 85,
    description:
      "A slow, restorative massage with warm botanical oils and time to simply be.",
  },
  {
    name: "Botanical facial",
    duration: "50 minutes",
    price: 75,
    description:
      "Gentle cleansing, a nourishing plant-based mask, and a soothing facial massage.",
  },
  {
    name: "The unhurried afternoon",
    duration: "120 minutes",
    price: 155,
    description:
      "A full-body ritual, a tailored facial, and a quiet moment by the mineral pool.",
  },
];
export const restaurantMenu = {
  "Small plates": [
    {
      name: "Wood-fired focaccia",
      detail: "Rosemary, sea salt, whipped ricotta",
      price: 8,
    },
    {
      name: "Burrata & late-summer tomatoes",
      detail: "Basil oil, sourdough, cracked pepper",
      price: 14,
    },
    {
      name: "Crispy artichokes",
      detail: "Lemon, parsley, roasted garlic aioli",
      price: 11,
    },
  ],
  "From the kitchen": [
    {
      name: "Slow-cooked tomato pappardelle",
      detail: "Hand-rolled pasta, San Marzano tomato, aged parmesan",
      price: 22,
    },
    {
      name: "Roasted sea bass",
      detail: "White beans, charred lemon, garden herbs",
      price: 29,
    },
    {
      name: "Wild mushroom risotto",
      detail: "Arborio rice, thyme, pecorino",
      price: 24,
    },
  ],
  "Something sweet": [
    {
      name: "Our tiramisu",
      detail: "Espresso-soaked savoiardi, mascarpone, cocoa",
      price: 10,
    },
    {
      name: "Olive oil cake",
      detail: "Roasted seasonal fruit, vanilla crème fraîche",
      price: 9,
    },
    {
      name: "Affogato",
      detail: "Vanilla gelato, a shot of espresso",
      price: 7,
    },
  ],
};
export const lodgeRooms = [
  {
    name: "The Lake Room",
    visual: visuals.lakeRoom,
    detail: "King bed · Private balcony · Lake views",
    price: 240,
    description:
      "Wake with the water. A light-filled room with warm oak finishes and an uninterrupted view.",
  },
  {
    name: "The Forest Suite",
    visual: visuals.forestSuite,
    detail: "King bed · Fireside lounge · Forest terrace",
    price: 320,
    description:
      "A little more space to settle in, with a deep soaking tub and a sheltered terrace among the trees.",
  },
];
export const retailProducts = [
  {
    id: "arc-chair",
    name: "Arc lounge chair",
    visual: visuals.chair,
    material: "Natural oak / Oat bouclé",
    price: 420,
    category: "Seating",
    crop: "25% 55%",
    description:
      "A generous seat, a gently curved frame, and the kind of comfort that invites you to stay.",
  },
  {
    id: "round-table",
    name: "Round side table",
    visual: visuals.table,
    material: "Solid walnut / Natural oil",
    price: 185,
    category: "Tables",
    crop: "63% 65%",
    description:
      "Simple, solid, and quietly useful. A compact companion for your favourite reading corner.",
  },
  {
    id: "earth-vase",
    name: "Earth vessel",
    visual: visuals.vase,
    material: "Stoneware / Chalk glaze",
    price: 48,
    category: "Objects",
    crop: "69% 38%",
    description:
      "An organic silhouette with a tactile, hand-finished surface. Beautiful with a single branch.",
  },
];
export const journeys = [
  {
    name: "The lakeside wander",
    visual: visuals.lakeside,
    type: "Gentle",
    duration: "Half day",
    terrain: "Lakeshore trails",
    description:
      "An easy-paced morning along the water, with a picnic stop and plenty of time to take it all in.",
    price: 65,
  },
  {
    name: "Above the treeline",
    visual: visuals.lifestyle,
    type: "Challenging",
    duration: "Full day",
    terrain: "Mountain ridgelines",
    description:
      "A steady climb into open country. Big views, fresh air, and a well-earned lunch at the summit.",
    price: 120,
  },
  {
    name: "A weekend off-grid",
    visual: visuals.campsite,
    type: "Moderate",
    duration: "Two days",
    terrain: "Forest & mountain",
    description:
      "Follow quiet forest paths to a simple mountain hut. Share a meal, watch the stars, and wake outside.",
    price: 280,
  },
];

export const profile = {
  name: "Kumar Thapa",
  title: "Senior Software Developer",
  focus: "Backend engineering · PHP · Laravel · MySQL",
  summary:
    "Backend-focused software developer with 5+ years of hands-on development experience. I build and maintain business systems, REST APIs, data workflows, and integrations across retail, manufacturing, RFID tracking, restaurant operations, and logistics.",
  email: "kumar9114526@gmail.com",
  // Set your WhatsApp recipient as country code plus number, digits only.
  whatsapp: "917085534532",
  linkedin: "https://www.linkedin.com/in/kumarthapa911",
  github: "https://github.com/kumarthapa",
};

export const profileProjects = [
  {
    title: "Retail & Enterprise Management Platform",
    category: "Retail technology",
    description:
      "Backend workflows for retail operations spanning POS, products, inventory, warehouses, and reporting.",
    contributions: [
      "Implemented tenant-, retailer-, location-, and stock-specific business rules.",
      "Worked with MySQL relationships and reporting queries over operational data.",
      "Integrated Shopify product and inventory synchronization.",
    ],
    stack: ["PHP", "Laravel", "MySQL", "REST APIs", "Shopify API"],
    visualSlug: "b2b-software",
    icon: "store",
  },
  {
    title: "RFID Mattress Manufacturing System",
    category: "Manufacturing · Industrial automation",
    description:
      "Backend and mobile workflows supporting RFID-enabled manufacturing and product tracking.",
    contributions: [
      "Connected Android RFID scanning workflows to APIs for tag identification and event synchronization.",
      "Worked on offline data handling, device registration, and application update delivery.",
      "Supported production and tracking workflows through Laravel APIs and database operations.",
    ],
    stack: ["PHP", "Laravel", "MySQL", "Java", "Native Android", "RFID"],
    visualSlug: "rfid-manufacturing",
    icon: "factory",
  },
  {
    title: "RFID Asset Tracking System",
    category: "Enterprise asset management",
    description:
      "Asset-location workflows that connect RFID reads from mobile devices and readers to backend records.",
    contributions: [
      "Recorded tag identifiers with reader, gate, and location metadata.",
      "Supported latest-location data and asset movement history.",
      "Connected mobile and reader activity with backend event-recording services.",
    ],
    stack: ["PHP", "Laravel", "SQL", "Java", "Android Studio", "RFID"],
    visualSlug: "rfid-asset-tracking",
    icon: "radio",
  },
  {
    title: "Logistics & GPS Tracking Platform",
    category: "Logistics · Fleet management",
    description:
      "Driver and fleet tracking workflows linking mobile GPS collection with backend location data and operations.",
    contributions: [
      "Worked with location history and mobile-to-backend data exchange.",
      "Supported background tracking behavior and GPS accuracy filtering.",
      "Contributed to geofence-related workflows and operational monitoring.",
    ],
    stack: ["PHP", "Laravel", "SQL", "React Native", "GPS / location APIs"],
    visualSlug: "fleet-management",
    icon: "truck",
  },
  {
    title: "Restaurant Management & POS Platform",
    category: "Restaurant technology",
    description:
      "Restaurant operations covering POS transactions, order processing, billing, and kitchen order tickets.",
    contributions: [
      "Maintained backend workflows for transactions, orders, and billing.",
      "Integrated receipt and kitchen-order printing components.",
      "Troubleshot print and transaction handoffs between application services and local devices.",
    ],
    stack: ["PHP", "Laravel", "MySQL", "REST APIs", "Printer integrations"],
    visualSlug: undefined,
    icon: "utensils",
  },
  {
    title: "POS Billing Application",
    category: "Point of sale · Billing",
    description:
      "A point-of-sale and billing application for product selection, invoices, customer records, and sales workflows.",
    contributions: [
      "Built the application interface with React and JavaScript.",
      "Implemented backend request handling and application logic with Express.",
      "Connected billing workflows to SQL-backed records and printing needs.",
    ],
    stack: ["React", "Express", "JavaScript", "SQL", "Bootstrap"],
    visualSlug: "billing-software",
    icon: "receipt",
  },
] as const;

export const profileSkillGroups = [
  {
    title: "Backend & APIs",
    skills: ["PHP", "Laravel", "Express", "REST API development", "Business logic"],
  },
  {
    title: "Data & performance",
    skills: ["MySQL", "SQL", "Relational data modeling", "Query optimization", "Large datasets"],
  },
  {
    title: "Web & mobile",
    skills: ["React", "JavaScript", "Bootstrap", "React Native", "Java", "Native Android", "Android Studio"],
  },
  {
    title: "Integrations & operations",
    skills: ["Shopify API", "Firebase / FCM", "RFID", "GPS workflows", "Printer integrations", "Linux", "Nginx", "Azure", "Redis"],
  },
] as const;

export const profileExperience = {
  company: "Treewalker Technology",
  period: "January 2020 — Present",
  title: "Senior Software Developer",
  progression:
    "Joined through an internship and structured learning, then moved into independent software development around July 2021.",
  responsibilities: [
    "Develop and maintain PHP/Laravel applications for retail, manufacturing, asset tracking, restaurant, and logistics workflows.",
    "Design REST APIs and connect backend services with web, Android, and React Native applications.",
    "Build MySQL data models and SQL operations for transactional workflows, inventory, reporting, and operational records.",
    "Integrate Shopify, Firebase/FCM, RFID, GPS/location, and printer systems; troubleshoot issues across application, database, and Linux server layers.",
  ],
};

export const profileEducation = [
  {
    qualification: "Bachelor of Computer Applications (BCA)",
    institution: "Manipal University Jaipur",
    detail: "Currently pursuing · 2nd year",
  },
  {
    qualification: "Higher Secondary Education · Class XII",
    institution: "GHSS Roing · CBSE",
    detail: "2018",
  },
] as const;

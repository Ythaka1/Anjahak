export type Product = {
  slug: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  longDescription: string;
  specs: string[];
  image: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    slug: "chick-peas",
    name: "Chick Peas",
    category: "Legumes",
    origin: "Kenya & East Africa",
    description:
      "High-protein, export-grade chickpeas sourced from the fertile soils of East Africa.",
    longDescription:
      "Our chickpeas are carefully cultivated across the rich highlands of Kenya and East Africa, selected for their uniform size, vibrant colour, and outstanding nutritional profile. Each batch undergoes rigorous quality inspection before export, ensuring they meet international food safety standards. Ideal for hummus, stews, soups, and direct consumption markets worldwide.",
    specs: [
      "Export grade AA",
      "Moisture ≤14%",
      "Admixture ≤1%",
      "Broken & damaged ≤2%",
      "Available in 50kg bags or bulk containers",
    ],
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=800&q=80",
    featured: true,
  },
  {
    slug: "premium-roselle-hibiscus",
    name: "Premium Roselle Hibiscus",
    category: "Botanicals",
    origin: "Kenya",
    description:
      "Sun-dried deep crimson hibiscus calyces, antioxidant-rich and vibrant in colour.",
    longDescription:
      "Grown under the Kenyan sun at optimal altitudes, our Roselle Hibiscus (Hibiscus sabdariffa) is harvested at peak ripeness and carefully sun-dried to preserve its vivid deep-crimson colour and high antioxidant content. Prized by beverage makers, herbal tea producers, and the food industry across Europe, the Middle East, and Asia.",
    specs: [
      "Sun-dried, deep crimson calyces",
      "Moisture ≤12%",
      "No added colour or preservatives",
      "Available whole calyx or ground powder",
      "Packed in 25kg jute or vacuum poly bags",
    ],
    image:
      "https://i.pinimg.com/1200x/39/16/17/391617a9ffb0d6bad32bca2b07c1924d.jpg",
    featured: true,
  },
  {
    slug: "soy-beans",
    name: "Soy Beans",
    category: "Legumes",
    origin: "East Africa",
    description:
      "High-protein, high-oil-content soy beans ideal for food processing and livestock feed.",
    longDescription:
      "Sourced from select farms across East Africa, our soy beans offer exceptional protein and oil content, making them a preferred choice for food processors, oil mills, and livestock feed manufacturers. Each consignment is cleaned, graded, and tested before dispatch to guarantee consistent quality and safety.",
    specs: [
      "Protein content ≥36%",
      "Oil content ≥18%",
      "Moisture ≤13%",
      "Foreign matter ≤1%",
      "Non-GMO varieties available",
    ],
    image:
      "https://i.pinimg.com/736x/ec/41/49/ec4149dbce4e3572276bcd3da010fb0f.jpg",
    featured: false,
  },
  {
    slug: "cashew-nuts",
    name: "Cashew Nuts",
    category: "Nuts & Seeds",
    origin: "Kenya",
    description:
      "Grade W180–W320 cashew nuts, vacuum packed for freshness and long shelf life.",
    longDescription:
      "Kenya's coastal climate produces some of the finest cashew nuts on the continent. Our cashews are processed in certified facilities, graded to international white whole (W) specifications, and vacuum sealed to lock in freshness. Whether for retail, industrial snack production, or confectionery, our cashews arrive in perfect condition.",
    specs: [
      "Grades: W180 / W240 / W320",
      "Vacuum sealed packaging",
      "Moisture ≤5%",
      "Broken ≤5%",
      "Free of mould, live insects, and foreign matter",
    ],
    image:
      "https://i.pinimg.com/236x/84/b3/78/84b378482e702f3769cab371173e6a3d.jpg",
    featured: true,
  },
  {
    slug: "premium-halal-lamb-goat",
    name: "Premium Halal Lamb & Goat",
    category: "Livestock",
    origin: "Kenya",
    description:
      "Free-range, halal-certified lamb and goat from Kenya's open pastures.",
    longDescription:
      "Raised on Kenya's vast open pastures without growth hormones or antibiotics, our lamb and goat are halal-certified from licensed abattoirs. The meat is known for its lean texture, rich flavour, and superior tenderness — a product of natural, free-range rearing. Available fresh or frozen in custom cuts for the Middle East, Gulf, and European halal markets.",
    specs: [
      "Halal certified (KEBS & HCAK approved)",
      "Free-range, naturally reared",
      "Available fresh or IQF frozen",
      "Custom butchery cuts available",
      "Compliant with EU, GCC, and UAE import standards",
    ],
    image:
      "https://i.pinimg.com/736x/72/55/ea/7255ea25deb4d4e60fa89a27a04c8ce8.jpg",
    featured: true,
  },
  {
    slug: "sunflower-seeds",
    name: "Sunflower Seeds",
    category: "Nuts & Seeds",
    origin: "East Africa",
    description:
      "High-oil-content sunflower seeds with 42–45% oil content, suitable for oil pressing and human consumption.",
    longDescription:
      "Cultivated across the highland farms of East Africa, our sunflower seeds carry an exceptional oil content of 42–45%, making them ideal for oil pressing and industrial extraction. The confectionery grade seeds are available hulled for direct snacking and food manufacturing use, meeting international phytosanitary and food safety standards.",
    specs: [
      "Oil content 42–45%",
      "Moisture ≤9%",
      "Admixture ≤2%",
      "Confectionery and oil-press grades available",
      "Packed in 50kg PP woven bags",
    ],
    image:
      "https://i.pinimg.com/1200x/67/ed/a4/67eda453e41429a63cb98555c7703483.jpg",
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, count);
}

export const categories = [
  "All",
  "Legumes",
  "Nuts & Seeds",
  "Botanicals",
  "Livestock",
] as const;

export type Category = (typeof categories)[number];

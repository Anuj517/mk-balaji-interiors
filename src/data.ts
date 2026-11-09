import {
  Armchair,
  CookingPot,
  House,
  Layers3,
  PanelsTopLeft,
  Sparkles,
  Tv,
  Wallpaper,
  type LucideIcon,
} from "lucide-react";

export const business = {
  name: "MK Balaji Enterprises",
  contact: "M.K. Joshi",
  phones: ["+91 8484035027", "+91 9730998399"],
  address: "LG-02, Grand Central, Chakan, Opposite Vishal Capital, Pune-Nashik Highway.",
  email: "mkbalajiinteriors.2601@gmail.com",
  latitude: 18.7597064,
  longitude: 73.8582694,
  mapUrl:
    "https://www.google.com/maps/place/MK+Balaji+Enterprises/@18.7597115,73.8556891,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c90010da57e3:0x87b8c82107ee87d2!8m2!3d18.7597064!4d73.8582694!16s%2Fg%2F11w1cbtzml?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=18.7597064,73.8582694",
};

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Polygranite Sheets",
    description: "Wall finishes with the look of stone and the character of your space.",
    icon: Layers3,
  },
  {
    title: "PVC Ceiling",
    description: "Clean, modern ceiling finishes for homes and commercial interiors.",
    icon: PanelsTopLeft,
  },
  {
    title: "POP Ceiling",
    description: "Decorative ceiling work shaped around the room and its lighting.",
    icon: Sparkles,
  },
  {
    title: "TV Units",
    description: "Made-to-fit entertainment walls, storage and display shelving.",
    icon: Tv,
  },
  {
    title: "Kitchen Trolleys",
    description: "Practical kitchen storage designed for everyday use.",
    icon: CookingPot,
  },
  {
    title: "WPC Panels",
    description: "Contemporary wall and door panel finishes for interior spaces.",
    icon: Wallpaper,
  },
  {
    title: "Furniture",
    description: "Custom and modular furniture for homes and offices.",
    icon: Armchair,
  },
  {
    title: "Interior Design",
    description: "Thoughtful interior work, brought together from concept to finish.",
    icon: House,
  },
];

export type ProjectCategory =
  | "Living Room"
  | "TV Units"
  | "Ceiling"
  | "Kitchen"
  | "Wall Decoration"
  | "Furniture"
  | "Other Work";

export type Project = {
  page: number;
  title: string;
  category: ProjectCategory;
  imageAlt: string;
  imageSrc?: string;
};

export const projects: Project[] = [
  { page: 21, title: "Wall decoration finish 01", category: "Wall Decoration", imageAlt: "Stone-look wall cladding beside a finished interior wall", imageSrc: "/assets/projects/wall-decoration/wall-decoration-01.webp" },
  { page: 22, title: "Living room interior 01", category: "Living Room", imageAlt: "Completed living room showing wall panels and ceiling finishes", imageSrc: "/assets/projects/living-room/living-room-01.webp" },
  { page: 23, title: "TV feature unit 01", category: "TV Units", imageAlt: "TV feature wall with a marble-look panel and lit display shelving", imageSrc: "/assets/projects/tv-units/tv-units-01.webp" },
  { page: 24, title: "Kitchen interior 01", category: "Kitchen", imageAlt: "Modular kitchen with upper and lower cabinetry and counter", imageSrc: "/assets/projects/kitchen/kitchen-01.webp" },
  { page: 25, title: "Kitchen interior 02", category: "Kitchen", imageAlt: "Kitchen cabinetry with dark stone-look counter and ceiling finish", imageSrc: "/assets/projects/kitchen/kitchen-02.webp" },
  { page: 26, title: "Furniture installation 01", category: "Furniture", imageAlt: "Bedroom with fitted wardrobe featuring mauve panels and gold detailing", imageSrc: "/assets/projects/furniture/furniture-01.webp" },
  { page: 27, title: "Furniture installation 02", category: "Furniture", imageAlt: "Bedroom fitted with a white and burgundy wardrobe", imageSrc: "/assets/projects/furniture/furniture-02.webp" },
  { page: 28, title: "TV feature unit 02", category: "TV Units", imageAlt: "TV unit with a light stone-look panel and wood-look framing", imageSrc: "/assets/projects/tv-units/tv-units-02.webp" },
  { page: 29, title: "TV feature unit 03", category: "TV Units", imageAlt: "TV unit with illuminated stone-look panel and wood-look display shelves", imageSrc: "/assets/projects/tv-units/tv-units-03.webp" },
  { page: 30, title: "Wall decoration finish 02", category: "Wall Decoration", imageAlt: "Room with stone-look feature wall and fitted cabinetry", imageSrc: "/assets/projects/wall-decoration/wall-decoration-02.webp" },
  { page: 31, title: "Wall decoration finish 03", category: "Wall Decoration", imageAlt: "Decorative floral wall installation with wood-look panels", imageSrc: "/assets/projects/wall-decoration/wall-decoration-03.webp" },
  { page: 1, title: "Warm-toned living room", category: "Living Room", imageAlt: "Living room with decorative wall panels and a custom television unit" },
  { page: 3, title: "Fitted kitchen storage", category: "Kitchen", imageAlt: "Contemporary kitchen cabinetry with overhead storage" },
  { page: 8, title: "Dining and display space", category: "Furniture", imageAlt: "Dining room with display shelves and fitted furniture" },
  { page: 9, title: "Ceiling detail", category: "Ceiling", imageAlt: "Ceiling fan set against a detailed ceiling and dark wood panels" },
  { page: 10, title: "Marble-look feature wall", category: "Wall Decoration", imageAlt: "Marble-look feature wall with a television and decorative lighting" },
  { page: 13, title: "Wood and stone TV unit", category: "TV Units", imageAlt: "Custom TV unit combining wood-look panels, shelving and a light stone-look backdrop" },
  { page: 15, title: "Dark stone-look wall", category: "Wall Decoration", imageAlt: "Dark stone-look feature wall with fine contrasting lines" },
  { page: 17, title: "Marble-look interior wall", category: "Wall Decoration", imageAlt: "Bright marble-look wall and adjoining interior panels" },
  { page: 19, title: "Textured TV feature wall", category: "TV Units", imageAlt: "Television set into a dark textured feature wall with a long console" },
  { page: 20, title: "Living room media unit", category: "Living Room", imageAlt: "Living room with a television, lit display shelves and a fitted media console" },
];

export const cataloguePages = Array.from({ length: 11 }, (_, index) => index + 1);
export const projectCategories: Array<"All Projects" | ProjectCategory> = [
  "All Projects",
  "Living Room",
  "TV Units",
  "Ceiling",
  "Kitchen",
  "Wall Decoration",
  "Furniture",
  "Other Work",
];

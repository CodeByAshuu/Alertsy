
// Comprehensive product database for tracking
export interface ProductCategory {
  brands: string[];
  keywords: string[];
  examples: string[];
}

export const productCategories: Record<string, ProductCategory> = {
  sneakers: {
    brands: ["Nike", "Adidas", "Yeezy", "New Balance", "Jordan", "Puma", "Converse", "Reebok", "ASICS", "Vans", "Under Armour", "Balenciaga", "Gucci", "Louis Vuitton", "Dior"],
    keywords: ["dunk", "air force", "jordan", "yeezy", "boost", "air max", "sb", "990", "550", "ultra boost", "foam runner", "blazer", "cortez", "retro"],
    examples: ["Air Jordan 1", "Yeezy 350", "Nike Dunk", "New Balance 550", "Travis Scott", "Off-White"]
  },
  streetwear: {
    brands: ["Supreme", "Off-White", "BAPE", "Fear of God", "Essentials", "Palace", "Stussy", "Kith", "Carhartt", "The North Face", "Chrome Hearts", "Noah", "Cactus Plant", "Anti Social Social Club", "Moncler"],
    keywords: ["box logo", "hoodie", "tee", "jacket", "collab", "essentials", "limited edition", "capsule", "collection", "drop"],
    examples: ["Supreme Box Logo", "Off-White Hoodie", "BAPE Shark", "FOG Essentials", "Palace Tri-Ferg"]
  },
  tech: {
    brands: ["PlayStation", "Xbox", "Nintendo", "Apple", "Samsung", "Google", "NVIDIA", "AMD", "Sony", "Razer", "Logitech", "Sonos", "DJI", "Bose", "Meta"],
    keywords: ["ps5", "xbox", "switch", "iphone", "macbook", "airpods", "galaxy", "rtx", "graphics card", "gpu", "console", "vr", "headset", "earbuds", "pro"],
    examples: ["PlayStation 5", "Xbox Series X", "iPhone 15 Pro", "RTX 4090", "Nintendo Switch OLED", "MacBook Pro"]
  },
  collectibles: {
    brands: ["Funko", "LEGO", "Pokémon", "NBA", "Hot Toys", "Bearbrick", "Takashi Murakami", "KAWS", "Disney", "Marvel", "NECA", "Bandai", "Sideshow", "McFarlane", "Hasbro"],
    keywords: ["pop", "vinyl", "figure", "limited", "collaboration", "exclusive", "collector", "edition", "rare", "series", "chase", "statue", "action figure"],
    examples: ["Funko Pop Exclusive", "KAWS Companion", "Bearbrick 1000%", "LEGO Limited Edition", "Pokemon TCG"]
  }
};

// Extract all brands into a single array for easy lookups
export const allBrands = Object.values(productCategories).reduce(
  (acc, category) => [...acc, ...category.brands],
  [] as string[]
);

// Extract all keywords into a single array for easy lookups
export const allKeywords = Object.values(productCategories).reduce(
  (acc, category) => [...acc, ...category.keywords],
  [] as string[]
);

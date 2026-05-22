export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;        // PKR
  discount?: number;    // percent off
  category: string;
  weight: string;
  image: string;
  rating: number;
  halal: boolean;
  freshness: string;
  featured?: boolean;
  bestseller?: boolean;
  deal?: boolean;
};

// Royalty-free Unsplash food packaging-style imagery. Replace with branded shots when ready.
const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=70`;

export const categories = [
  { slug: "parathas", name: "Frozen Parathas", icon: "🫓" },
  { slug: "nuggets", name: "Nuggets", icon: "🍗" },
  { slug: "fries", name: "Fries", icon: "🍟" },
  { slug: "ready-meals", name: "Ready-to-Cook Meals", icon: "🍱" },
  { slug: "kebabs", name: "Kebabs", icon: "🍢" },
  { slug: "chicken", name: "Chicken Items", icon: "🐔" },
  { slug: "desi", name: "Desi Frozen", icon: "🥘" },
  { slug: "snacks", name: "Snacks", icon: "🥟" },
  { slug: "samosas", name: "Samosas", icon: "🔺" },
  { slug: "rolls", name: "Rolls", icon: "🌯" },
  { slug: "patties", name: "Burger Patties", icon: "🍔" },
  { slug: "family", name: "Family Packs", icon: "👨‍👩‍👧" },
  { slug: "party", name: "Party Packs", icon: "🎉" },
];

export const products: Product[] = [
  { id: "p1", name: "Crispy Chicken Nuggets", description: "Golden, juicy chicken nuggets crafted from 100% halal breast meat. Crispy outside, tender inside.", price: 850, discount: 15, category: "nuggets", weight: "780g", image: img("photo-1562967914-608f82629710"), rating: 4.8, halal: true, freshness: "Flash Frozen", featured: true, bestseller: true, deal: true },
  { id: "p2", name: "Flaky Lachha Paratha", description: "Layered, buttery parathas straight from the tawa to your freezer. Heat & serve in minutes.", price: 480, discount: 10, category: "parathas", weight: "5 pcs", image: img("photo-1626100134240-69155abc4f55"), rating: 4.9, halal: true, freshness: "Bakery Fresh", featured: true, bestseller: true },
  { id: "p3", name: "Spicy Chicken Seekh Kebabs", description: "Char-grilled flavour, slow-marinated overnight in 11 spices.", price: 920, discount: 12, category: "kebabs", weight: "600g", image: img("photo-1599487488170-d11ec9c172f0"), rating: 4.7, halal: true, freshness: "IQF Frozen", featured: true, deal: true },
  { id: "p4", name: "Golden Crunch Fries", description: "Restaurant-style crinkle-cut fries. Pre-fried for perfect crispiness every time.", price: 520, category: "fries", weight: "1kg", image: img("photo-1573080496219-bb080dd4f877"), rating: 4.6, halal: true, freshness: "Flash Frozen", bestseller: true },
  { id: "p5", name: "Chicken Samosa Pack", description: "Hand-folded triangle samosas filled with masala chicken keema.", price: 650, discount: 20, category: "samosas", weight: "20 pcs", image: img("photo-1601050690597-df0568f70950"), rating: 4.8, halal: true, freshness: "Hand Crafted", deal: true, featured: true },
  { id: "p6", name: "Chapli Kebab Patties", description: "Authentic Peshawari chapli kebabs with pomegranate seeds & coriander.", price: 780, category: "kebabs", weight: "8 pcs", image: img("photo-1529692236671-f1f6cf9683ba"), rating: 4.7, halal: true, freshness: "Hand Crafted" },
  { id: "p7", name: "Chicken Malai Boti Roll", description: "Creamy malai chicken wrapped in soft paratha. Heat. Eat. Repeat.", price: 720, discount: 10, category: "rolls", weight: "6 pcs", image: img("photo-1565299585323-38d6b0865b47"), rating: 4.9, halal: true, freshness: "Chef Made", bestseller: true },
  { id: "p8", name: "Premium Beef Burger Patties", description: "100% beef, hand-pressed, juicy. Made for the perfect homemade burger.", price: 1150, discount: 15, category: "patties", weight: "10 pcs", image: img("photo-1568901346375-23c9450c58cd"), rating: 4.8, halal: true, freshness: "IQF Frozen", featured: true, deal: true },
  { id: "p9", name: "Family Party Pack", description: "Nuggets + fries + samosas + rolls. The ultimate feast bundle.", price: 2999, discount: 25, category: "party", weight: "3kg+", image: img("photo-1606755962773-d324e0a13086"), rating: 5.0, halal: true, freshness: "Party Ready", featured: true, deal: true, bestseller: true },
  { id: "p10", name: "Chicken Tikka Ready Meal", description: "Restaurant-grade tikka with rice. Microwave-ready in 5 minutes.", price: 690, category: "ready-meals", weight: "450g", image: img("photo-1601050690597-df0568f70950"), rating: 4.6, halal: true, freshness: "Heat & Serve" },
  { id: "p11", name: "Desi Aloo Tikki", description: "Crispy potato tikkis with a hidden chana filling. Street food, at home.", price: 420, category: "desi", weight: "12 pcs", image: img("photo-1601050690597-df0568f70950"), rating: 4.5, halal: true, freshness: "Hand Crafted" },
  { id: "p12", name: "Chicken Cheese Bites", description: "Crunchy bites stuffed with mozzarella cheese.", price: 880, discount: 10, category: "snacks", weight: "500g", image: img("photo-1606755962773-d324e0a13086"), rating: 4.7, halal: true, freshness: "Flash Frozen", deal: true },
];

export const getProduct = (id: string) => products.find(p => p.id === id);
export const byCategory = (slug: string) => products.filter(p => p.category === slug);

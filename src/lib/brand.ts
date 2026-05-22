export const BRAND = {
  name: "JAN'S Frozen Food",
  tagline: "Tastes Like Fresh. Always.",
  whatsapp: "923000000000", // TODO: replace with company number (intl. format, no +)
  phone: "+92 300 000 0000",
  email: "orders@jansfrozenfood.com",
  address: "Industrial Area, Lahore, Pakistan",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
};

export const formatPKR = (n: number) =>
  `Rs ${Math.round(n).toLocaleString("en-PK")}`;

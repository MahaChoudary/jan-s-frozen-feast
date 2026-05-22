import { BRAND, formatPKR } from "./brand";
import type { CartItem } from "@/store/cart";

export function waLink(text: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function waCartMessage(items: CartItem[], customer?: { name?: string; phone?: string; address?: string }) {
  const lines = [
    `Hello ${BRAND.name}! I'd like to place an order:`,
    "",
    ...items.map((i) => {
      const eff = i.discount ? i.price * (1 - i.discount / 100) : i.price;
      return `• ${i.name} × ${i.qty} — ${formatPKR(eff * i.qty)}`;
    }),
    "",
    `Total: ${formatPKR(items.reduce((a, i) => a + (i.discount ? i.price * (1 - i.discount / 100) : i.price) * i.qty, 0))}`,
    customer?.name ? `Name: ${customer.name}` : "",
    customer?.phone ? `Phone: ${customer.phone}` : "",
    customer?.address ? `Address: ${customer.address}` : "",
    `Payment: Cash on Delivery`,
  ].filter(Boolean);
  return lines.join("\n");
}

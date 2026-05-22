import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const OrderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2).max(80),
    phone: z.string().trim().min(7).max(25),
    email: z.string().trim().email().max(120),
    address: z.string().trim().min(5).max(300),
    city: z.string().trim().min(2).max(80),
    instructions: z.string().max(500).optional().default(""),
  }),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    qty: z.number().int().min(1).max(99),
    price: z.number().nonnegative(),
    discount: z.number().min(0).max(100).optional(),
  })).min(1).max(50),
  subtotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => OrderSchema.parse(data))
  .handler(async ({ data }) => {
    const orderId = `JFF-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const itemsBlock = data.items.map((i) => {
      const eff = i.discount ? i.price * (1 - i.discount / 100) : i.price;
      return `• ${i.name} × ${i.qty} — Rs ${Math.round(eff * i.qty).toLocaleString()}`;
    }).join("\n");

    const emailBody = [
      `NEW ORDER — ${orderId}`,
      `Time: ${timestamp}`,
      ``,
      `Customer: ${data.customer.name}`,
      `Phone: ${data.customer.phone}`,
      `Email: ${data.customer.email}`,
      `Address: ${data.customer.address}, ${data.customer.city}`,
      data.customer.instructions ? `Notes: ${data.customer.instructions}` : ``,
      ``,
      `Items:`,
      itemsBlock,
      ``,
      `Subtotal: Rs ${Math.round(data.subtotal).toLocaleString()}`,
      `Total: Rs ${Math.round(data.total).toLocaleString()}`,
      `Payment: Cash on Delivery`,
      `Status: Pay on Delivery`,
    ].filter(Boolean).join("\n");

    // Optional: wire to Resend or similar. Reads keys at call time.
    const resendKey = process.env.RESEND_API_KEY;
    const companyEmail = process.env.COMPANY_EMAIL || "orders@jansfrozenfood.com";
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "JAN'S Frozen Food <onboarding@resend.dev>",
            to: [companyEmail],
            subject: `New Order ${orderId} — ${data.customer.name}`,
            text: emailBody,
          }),
        });
      } catch (e) {
        console.error("Email send failed", e);
      }
    } else {
      console.log("[ORDER]", emailBody);
    }

    return { ok: true, orderId, timestamp };
  });

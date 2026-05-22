interface VercelRequest {
  method?: string;
  body?: any;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(data: any): void;
  setHeader?(key: string, value: string): void;
}

interface OrderData {
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    instructions?: string;
  };
  items: Array<{
    id: string;
    name: string;
    qty: number;
    price: number;
    discount?: number;
  }>;
  subtotal: number;
  total: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const data: OrderData = req.body;

    // Validate
    if (!data.customer || !data.items || data.items.length === 0) {
      res.status(400).json({ error: "Invalid order data" });
      return;
    }

    // Generate order ID
    const orderId = `JFF-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // Build email content
    const itemsBlock = data.items
      .map((i) => {
        const eff = i.discount ? i.price * (1 - i.discount / 100) : i.price;
        return `• ${i.name} × ${i.qty} — Rs ${Math.round(eff * i.qty).toLocaleString()}`;
      })
      .join("\n");

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
      `Status: Pending confirmation`,
    ]
      .filter(Boolean)
      .join("\n");

    // Send email if configured
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
        console.error("Email send failed:", e);
      }
    } else {
      console.log("[ORDER]", emailBody);
    }

    // Return success with order ID
    res.status(200).json({
      ok: true,
      orderId,
      timestamp,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      error: "Failed to process order",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

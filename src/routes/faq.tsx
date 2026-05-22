import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — JAN'S Frozen Food" },
      { name: "description", content: "Frequently asked questions about JAN'S Frozen Food: delivery, halal, storage, COD and more." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
});

const faqs = [
  { q: "How fresh is your frozen food?", a: "Every product is flash-frozen within hours of preparation, locking in peak freshness, flavour and nutrition. Most products stay fresh in your freezer for up to 6 months." },
  { q: "Where do you deliver?", a: "We currently deliver across major cities in Pakistan with refrigerated transport. Delivery within 24 hours in metro areas. Free delivery on orders over Rs 3,000." },
  { q: "How does Cash on Delivery work?", a: "Place your order online. We'll call to confirm, then deliver to your door. You pay in cash when the order arrives — no upfront payment required." },
  { q: "Is everything halal certified?", a: "Yes. 100% of our ingredients are sourced from certified halal partners, and our facility is regularly audited for compliance." },
  { q: "How should I store the products?", a: "Keep frozen at -18°C or below. Once thawed, do not refreeze. Most products are best consumed within 6 months of the production date." },
  { q: "How do I cook your frozen items?", a: "Each pack includes step-by-step cooking instructions. Most items can be air-fried, pan-fried, oven-baked, or microwaved straight from frozen." },
  { q: "Do you take bulk or corporate orders?", a: "Absolutely. Reach us on WhatsApp or via the Contact page and our team will arrange a custom quote for events, offices, or resale." },
  { q: "How can I become a franchise partner?", a: "Visit our Franchise page or message us on WhatsApp. Our franchise team responds within 48 hours." },
  { q: "What if an item is out of stock?", a: "We'll call to confirm before dispatch and offer a substitute or refund the unavailable item." },
  { q: "How do I get support?", a: "WhatsApp is fastest. You can also email us or use the contact form. Average response under 30 minutes during business hours." },
];

function FAQPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Support</span>
        <h1 className="font-display text-5xl mt-2">Questions, Answered</h1>
      </header>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-5">
            <AccordionTrigger className="font-display text-lg text-left hover:no-underline hover:text-primary">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

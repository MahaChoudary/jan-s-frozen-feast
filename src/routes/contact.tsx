import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { waLink } from "@/lib/whatsapp";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — JAN'S Frozen Food" },
      { name: "description", content: "Reach JAN'S Frozen Food via phone, email or WhatsApp. We're here to help." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const input = "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Contact</span>
        <h1 className="font-display text-5xl mt-2">Let's Talk</h1>
        <p className="text-muted-foreground mt-2">Questions, bulk orders, partnerships — we're here.</p>
      </header>
      <div className="grid lg:grid-cols-2 gap-10">
        <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
          <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
          <textarea required placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} min-h-[140px]`} />
          <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 font-bold glow-red">Send Message</button>
        </form>

        <div className="space-y-4">
          {[
            { Icon: MapPin, t: "Visit Us", v: BRAND.address },
            { Icon: Phone, t: "Call Us", v: BRAND.phone, href: `tel:${BRAND.phone}` },
            { Icon: Mail, t: "Email", v: BRAND.email, href: `mailto:${BRAND.email}` },
          ].map(({ Icon, t, v, href }) => (
            <a key={t} href={href} className="block rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition">
              <Icon className="h-6 w-6 text-primary mb-2" />
              <div className="font-display text-lg">{t}</div>
              <div className="text-sm text-muted-foreground">{v}</div>
            </a>
          ))}
          <a href={waLink("Hi JAN'S! I have a question.")} target="_blank" rel="noreferrer" className="block rounded-2xl bg-primary text-primary-foreground p-6 glow-red">
            <Send className="h-6 w-6 mb-2" />
            <div className="font-display text-xl">Chat on WhatsApp</div>
            <div className="text-sm opacity-90">Fastest way to reach us — instant replies.</div>
          </a>
        </div>
      </div>
    </section>
  );
}

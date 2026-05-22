import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, Mail, MapPin, Send } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND } from "@/lib/brand";
import { waLink } from "@/lib/whatsapp";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-charcoal text-cream noise overflow-hidden">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <Logo className="h-12 w-12" />
            <div>
              <div className="font-display text-xl">JAN'S</div>
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-70">Frozen Food</div>
            </div>
          </Link>
          <p className="text-sm opacity-80 leading-relaxed">
            Premium frozen halal food, flash-frozen at peak freshness and delivered to your door. {BRAND.tagline}
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { Icon: Instagram, href: BRAND.social.instagram },
              { Icon: Facebook, href: BRAND.social.facebook },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 hover:bg-primary inline-flex items-center justify-center transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a href={waLink("Hi JAN'S! I'd like to place an order.")} target="_blank" rel="noreferrer" className="h-10 px-4 rounded-full bg-primary inline-flex items-center gap-2 text-sm font-semibold glow-red">
              <Send className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-base tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {[
              ["/products", "All Products"],
              ["/deals", "Deals & Offers"],
              ["/franchise", "Franchise"],
              ["/about", "About Us"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-primary transition">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {categories.slice(0, 7).map((c) => (
              <li key={c.slug}>
                <Link to="/categories" hash={c.slug} className="hover:text-primary transition">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base tracking-wider mb-4">Get In Touch</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> {BRAND.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {BRAND.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {BRAND.email}</li>
          </ul>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="mt-5 flex"
          >
            <input
              type="email"
              required
              placeholder="Email for offers"
              className="flex-1 rounded-l-full bg-white/5 border border-white/10 px-4 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:border-primary"
            />
            <button className="rounded-r-full bg-primary px-4 text-sm font-semibold">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </div>
    </footer>
  );
}

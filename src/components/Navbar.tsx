import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X, ChevronDown } from "lucide-react";
import { useCart } from "@/store/cart";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { BRAND } from "@/lib/brand";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/deals", label: "Deals" },
  { to: "/franchise", label: "Franchise" },
];
const more = [
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-border/60 py-2" : "py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo className="h-11 w-11 transition group-hover:scale-105" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg tracking-wide">JAN'S</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Frozen Food</div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="px-4 py-2 text-sm font-medium rounded-full transition hover:bg-primary/10 hover:text-primary"
                activeProps={{ className: "text-primary bg-primary/10" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition hover:bg-primary/10 hover:text-primary">
              More <ChevronDown className="h-3 w-3" />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full pt-2 w-48">
                <div className="glass rounded-xl border border-border/60 p-2 shadow-xl">
                  {more.map((m) => (
                    <Link
                      key={m.to}
                      to={m.to}
                      className="block px-3 py-2 rounded-lg text-sm transition hover:bg-primary/10 hover:text-primary"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur transition hover:bg-primary/10 hover:text-primary"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground glow-red">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-card border-l border-border p-6 transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="font-display text-lg">JAN'S</span>
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close" className="h-9 w-9 rounded-full border border-border inline-flex items-center justify-center">
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-1">
            {[...links, ...more].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium transition hover:bg-primary/10 hover:text-primary"
                  activeProps={{ className: "bg-primary/10 text-primary" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${BRAND.phone}`}
            className="mt-6 block text-center px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium glow-red"
          >
            Call to Order
          </a>
        </aside>
      </div>
    </header>
  );
}

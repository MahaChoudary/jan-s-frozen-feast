import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Building2, TrendingUp, Users, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { Embers } from "@/components/Embers";

export const Route = createFileRoute("/franchise")({
  component: FranchisePage,
  head: () => ({
    meta: [
      { title: "Franchise — JAN'S Frozen Food" },
      { name: "description", content: "Partner with JAN'S Frozen Food. Open a franchise outlet in your city with a proven, profitable model." },
      { property: "og:title", content: "Become a JAN'S Franchise Partner" },
    ],
    links: [{ rel: "canonical", href: "/franchise" }],
  }),
});

function FranchisePage() {
  return (
    <>
      <section className="relative bg-fire text-cream noise py-24 overflow-hidden">
        <Embers />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/80">Business Opportunity</span>
          <h1 className="font-display text-5xl sm:text-7xl mt-3 leading-[0.95]">
            Own a <span className="text-gradient-fire">JAN'S</span><br />Franchise
          </h1>
          <p className="mt-5 text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
            Join Pakistan's fastest-growing halal frozen food brand. Proven model, full support, premium product line.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={waLink("Hi JAN'S! I'm interested in a franchise opportunity. Please share details.")} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-bold glow-red">
              Apply on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-bold">
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl">Why Partner With Us</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { Icon: TrendingUp, t: "Proven Growth", d: "50K+ customers, double-digit YoY growth." },
            { Icon: Award, t: "Premium Brand", d: "Trusted halal certification + chef-crafted recipes." },
            { Icon: Building2, t: "Full Setup", d: "Site selection, fit-out, equipment, training." },
            { Icon: Users, t: "Marketing Support", d: "National campaigns + local launch playbook." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="tilt-card rounded-2xl border border-border bg-card p-6">
              <Icon className="h-7 w-7 text-primary mb-3" />
              <h3 className="font-display text-xl">{t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-3xl bg-fire text-cream noise p-10 md:p-14 text-center glow-red relative overflow-hidden">
          <Embers count={10} />
          <div className="relative z-10">
            <h3 className="font-display text-4xl">Ready to start?</h3>
            <p className="mt-3 opacity-85 max-w-lg mx-auto">Tell us about yourself and your city. Our franchise team will get back within 48 hours.</p>
            <a href={waLink("Hi! I'd like to explore a JAN'S franchise.")} target="_blank" rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground text-primary px-7 py-3.5 font-bold">
              Start Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

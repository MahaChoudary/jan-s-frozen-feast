import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Embers } from "@/components/Embers";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — JAN'S Frozen Food" },
      { name: "description", content: "Our story: chef-crafted halal frozen food, flash-frozen at peak freshness." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <>
      <section className="relative bg-fire text-cream noise py-20 overflow-hidden">
        <Embers />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Logo className="h-24 w-24 mx-auto mb-6" />
          <h1 className="font-display text-5xl sm:text-6xl">Our Story</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            JAN'S began with one question: why can't frozen food taste fresh? We answered it.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 space-y-6 text-base leading-relaxed">
        <p>
          What started as a family kitchen in Lahore is now Pakistan's most trusted halal frozen food brand.
          Every recipe is developed by professional chefs, every ingredient is sourced from certified halal partners,
          and every product is flash-frozen within hours of preparation to lock in freshness, flavour, and nutrition.
        </p>
        <p>
          We believe convenience shouldn't compromise quality. Our parathas should taste like the ones your mother
          made. Our kebabs should sizzle like the ones from your favourite Saturday-night dhaba. Our nuggets
          should be crispy enough to make kids fight over them.
        </p>
        <p>
          From our kitchen to your freezer to your table — that's the JAN'S promise. Tastes like fresh. Always.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 pt-6">
          {[["2018", "Founded"], ["50K+", "Customers"], ["13", "Categories"]].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="font-display text-4xl text-gradient-fire">{n}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
        <div className="text-center pt-8">
          <Link to="/products" className="inline-flex rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-bold glow-red">
            Shop our menu
          </Link>
        </div>
      </section>
    </>
  );
}

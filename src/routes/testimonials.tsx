import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
  head: () => ({
    meta: [
      { title: "Testimonials — JAN'S Frozen Food" },
      { name: "description", content: "Real reviews from JAN'S Frozen Food customers across Pakistan." },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
});

const reviews = [
  { n: "Ayesha K.", c: "Lahore", q: "The lachha parathas taste fresher than what I make at home. Obsessed.", r: 5 },
  { n: "Bilal R.", c: "Karachi", q: "Kebabs are restaurant-quality. My kids ask for them every weekend.", r: 5 },
  { n: "Sana M.", c: "Islamabad", q: "Cash on delivery + cold packaging = perfect. 10/10.", r: 5 },
  { n: "Hamza S.", c: "Rawalpindi", q: "Family party pack saved my dinner party. Everyone asked where I ordered from.", r: 5 },
  { n: "Mehwish A.", c: "Faisalabad", q: "Nuggets are crispy even after a week in the freezer. Quality is real.", r: 4 },
  { n: "Usman T.", c: "Multan", q: "Samosas are perfectly spiced. Will reorder.", r: 5 },
  { n: "Zainab F.", c: "Lahore", q: "Customer service is fast on WhatsApp. Order arrived on time, frozen solid.", r: 5 },
  { n: "Asad H.", c: "Karachi", q: "Halal certification matters. Glad to find a brand that takes it seriously.", r: 5 },
  { n: "Nadia I.", c: "Peshawar", q: "Burger patties are juicy. Best frozen patty I've had in PK.", r: 5 },
];

function TestimonialsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Reviews</span>
        <h1 className="font-display text-5xl mt-2">Loved Across Pakistan</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">What our customers say about JAN'S Frozen Food.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((t) => (
          <div key={t.n} className="rounded-2xl border border-border bg-card p-6 tilt-card">
            <div className="flex gap-0.5 mb-3 text-amber-400">
              {Array.from({ length: t.r }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="italic">"{t.q}"</p>
            <div className="mt-4 font-semibold">{t.n} <span className="text-muted-foreground font-normal">— {t.c}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

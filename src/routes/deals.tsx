import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Flame } from "lucide-react";
import { Embers } from "@/components/Embers";

export const Route = createFileRoute("/deals")({
  component: DealsPage,
  head: () => ({
    meta: [
      { title: "Deals & Offers — JAN'S Frozen Food" },
      { name: "description", content: "Limited-time offers on premium halal frozen food. Save big on family and party packs." },
    ],
    links: [{ rel: "canonical", href: "/deals" }],
  }),
});

function DealsPage() {
  const deals = products.filter((p) => p.deal || p.discount);
  return (
    <>
      <section className="relative bg-fire text-cream noise py-20 overflow-hidden">
        <Embers />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em]">
            <Flame className="h-3 w-3 text-primary" /> Hot Deals
          </span>
          <h1 className="font-display text-5xl sm:text-6xl mt-4">Save Big. Eat Better.</h1>
          <p className="mt-3 max-w-xl mx-auto opacity-85">Limited-time offers on customer favourites and family packs.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}

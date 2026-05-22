import { createFileRoute } from "@tanstack/react-router";
import { categories, byCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({
    meta: [
      { title: "Categories — JAN'S Frozen Food" },
      { name: "description", content: "Browse JAN'S frozen food by category: parathas, nuggets, kebabs, rolls, snacks and more." },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
});

function CategoriesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Browse</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-2">All Categories</h1>
      </header>

      <div className="space-y-16">
        {categories.map((c) => {
          const items = byCategory(c.slug);
          if (!items.length) return null;
          return (
            <div key={c.slug} id={c.slug} className="scroll-mt-28">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-3xl flex items-center gap-3">
                  <span>{c.icon}</span> {c.name}
                </h2>
                <span className="text-sm text-muted-foreground">{items.length} items</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

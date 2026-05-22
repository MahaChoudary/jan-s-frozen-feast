import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/store/cart";
import { formatPKR } from "@/lib/brand";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { waLink, waCartMessage } from "@/lib/whatsapp";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Cart — JAN'S Frozen Food" }] }),
});

function CartPage() {
  const { items, setQty, remove, clear, subtotal } = useCart();
  const sub = subtotal();
  const delivery = sub > 0 && sub < 3000 ? 200 : 0;
  const total = sub + delivery;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 inline-flex items-center justify-center mb-6">
          <ShoppingBag className="h-9 w-9 text-primary" />
        </div>
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Browse our menu and add something delicious.</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold glow-red">
          Browse products <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-4">
          {items.map((i) => {
            const eff = i.discount ? i.price * (1 - i.discount / 100) : i.price;
            return (
              <div key={i.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                <img src={i.image} alt={i.name} className="h-24 w-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg leading-tight">{i.name}</h3>
                      <span className="text-xs text-muted-foreground">{i.weight}</span>
                    </div>
                    <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="h-9 w-9 inline-flex items-center justify-center hover:text-primary"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm font-semibold">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="h-9 w-9 inline-flex items-center justify-center hover:text-primary"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="font-display text-xl text-gradient-fire">{formatPKR(eff * i.qty)}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">Clear cart</button>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6 h-fit sticky top-24">
          <h2 className="font-display text-2xl mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPKR(sub)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{delivery === 0 ? "FREE" : formatPKR(delivery)}</span></div>
            <div className="h-px bg-border my-3" />
            <div className="flex justify-between font-display text-2xl"><span>Total</span><span className="text-gradient-fire">{formatPKR(total)}</span></div>
          </div>
          <Link to="/checkout" className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 font-bold glow-red">
            Checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={waLink(waCartMessage(items))} target="_blank" rel="noreferrer" className="mt-3 w-full inline-flex items-center justify-center rounded-full border border-border py-3 font-semibold">
            Order on WhatsApp
          </a>
          <p className="mt-4 text-xs text-muted-foreground text-center">Cash on Delivery available • Free over Rs 3,000</p>
        </aside>
      </div>
    </section>
  );
}

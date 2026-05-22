import { waLink } from "@/lib/whatsapp";
import { Send } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hi JAN'S! I'd like to order from your website.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-3 pr-5 py-3 font-semibold shadow-2xl glow-red animate-[glow-pulse_2.5s_ease-in-out_infinite]"
      aria-label="Order on WhatsApp"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
        <Send className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline text-sm">Order on WhatsApp</span>
    </a>
  );
}

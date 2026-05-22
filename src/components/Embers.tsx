// Decorative fire ember particles for hero
export function Embers({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 8) * 0.6;
        const size = 4 + (i % 5);
        const dur = 3 + (i % 4);
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: `radial-gradient(circle, var(--ember), transparent 70%)`,
              animation: `ember ${dur}s ease-in ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

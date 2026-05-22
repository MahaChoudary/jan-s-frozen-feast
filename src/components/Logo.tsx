import logo from "@/assets/logo.png";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="JAN'S Frozen Food"
      className={`${className} rounded-full object-cover ring-2 ring-primary/40 shadow-[0_0_20px_-4px_var(--primary)]`}
    />
  );
}

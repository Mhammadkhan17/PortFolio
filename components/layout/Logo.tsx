import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="DEAIDEV home"
      className={`inline-flex items-center gap-3 text-chalk ${className}`}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-9 items-stretch border-2 border-chalk"
      >
        <span className="flex items-center gap-1.5 border-r-2 border-chalk bg-orange px-2 text-[13px] font-extrabold tracking-[0.02em] text-ink">
          <span className="h-1.5 w-1.5 rounded-full border border-ink" />
          DE
        </span>
        <span className="flex items-center bg-tar px-2 text-[13px] font-extrabold tracking-[0.02em] text-chalk">
          AIDEV
        </span>
      </span>
      <span className="data hidden text-steel lg:inline">RIG / 01</span>
    </Link>
  );
}

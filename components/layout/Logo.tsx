import Link from "next/link";

function StampMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-9 w-9 flex-none items-center justify-center border-2 border-chalk bg-orange ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        className="h-[22px] w-[22px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#151515"
          fillRule="evenodd"
          d="M12 8h22c13 0 22 10 22 24s-9 24-22 24H12V8Zm12 14a10 10 0 1 0 20 0 10 10 0 0 0-20 0Z"
        />
      </svg>
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="DEAIDEV home"
      className={`inline-flex items-center gap-3 text-chalk ${className}`}
    >
      <StampMark />
      <span className="flex flex-col leading-none">
        <span className="text-[1.125rem] font-extrabold tracking-[-0.04em] text-chalk">
          DEAIDEV
        </span>
        <span className="data mt-0.5 hidden text-steel lg:inline">
          RIG / 01
        </span>
      </span>
    </Link>
  );
}

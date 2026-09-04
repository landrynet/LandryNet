"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function LiveSearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams.toString());
      if (value.trim()) nextParams.set("q", value.trim());
      else nextParams.delete("q");
      nextParams.delete("page");
      const nextUrl = nextParams.toString() ? `${pathname}?${nextParams}` : pathname;
      if (nextUrl !== `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`) router.replace(nextUrl, { scroll: false });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [pathname, router, searchParams, value]);

  return (
    <label className="site-search">
      <span className="sr-only">Recherche</span>
      <input value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} type="search" />
      <span className="site-search__hint">Recherche instantanée</span>
    </label>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activefilter = searchParams.get("capacity") ?? "all";

  function handlefilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-900 flex">
      <Button
        filter="all"
        handlefilter={handlefilter}
        activefilter={activefilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handlefilter={handlefilter}
        activefilter={activefilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handlefilter={handlefilter}
        activefilter={activefilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handlefilter={handlefilter}
        activefilter={activefilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handlefilter, children, activefilter }) {
  return (
    <button
      onClick={() => handlefilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        activefilter === filter ? "bg-primary-700" : ""
      }`}
    >
      {children}
    </button>
  );
}

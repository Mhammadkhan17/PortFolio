"use client";

import { useEffect, useState } from "react";

export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] border-t-2 border-ink bg-yellow px-4 py-3 text-center text-sm font-bold text-ink"
      role="status"
    >
      OFFLINE — some content may be unavailable.
    </div>
  );
}

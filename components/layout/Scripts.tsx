"use client";

import { useEffect } from "react";

export function Scripts() {
  useEffect(() => {
    // Suppress R3F v9's THREE.Clock deprecation warning (internal to @react-three/fiber)
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("THREE.Clock: This module has been deprecated")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    // Safari 100vh fix
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    // Offline indicator
    const updateOnlineStatus = () => {
      const banner = document.getElementById("offline-banner");
      if (banner) {
        if (!navigator.onLine) {
          banner.classList.add("visible");
        } else {
          banner.classList.remove("visible");
        }
      }
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      console.warn = originalWarn;
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return null;
}

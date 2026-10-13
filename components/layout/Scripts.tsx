"use client";

import { useEffect } from "react";

export function Scripts() {
  useEffect(() => {
    // Suppress R3F v9's THREE.Clock deprecation warning (internal to @react-three/fiber)
    // and harmless GPU shader precision warnings from ANGLE/DirectX
    const originalWarn = console.warn;
    const suppressedPatterns = [
      "THREE.Clock: This module has been deprecated",
      "THREE.WebGLProgram: Program Info Log",
    ];
    console.warn = (...args: unknown[]) => {
      const first = args[0];
      if (
        typeof first === "string" &&
        suppressedPatterns.some((p) => first.includes(p))
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

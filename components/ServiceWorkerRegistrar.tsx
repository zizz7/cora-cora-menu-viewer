"use client";

import { useEffect } from "react";
import { BASE_PATH } from "@/lib/basePath";

/**
 * Registers the Service Worker with graceful error handling.
 * On failure, logs to console and the app continues without offline caching.
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    async function register() {
      try {
        await navigator.serviceWorker.register(`${BASE_PATH}/sw.js`);
      } catch (err) {
        console.log(
          "Service Worker registration failed — app continues without offline caching:",
          err
        );
      }
    }

    register();
  }, []);

  return null;
}

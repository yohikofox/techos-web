"use client";

import { useEffect } from "react";

export default function FetchServiceWorkerRegister() {
  const registerServiceWorker = async () => {
    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register(
          new URL("@/workers/fetch.sw.ts", import.meta.url),
          {
            scope: "/",
          }
        );
        const worker = registration.active;
        worker?.addEventListener("message", (event) => {
          console.info("Received message from service worker", event);
        });
        console.info("Registration successful, scope is:", registration.scope);
      }
    } catch (error) {
      console.info("Service worker registration failed, error:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      console.info("load");
    });
    registerServiceWorker();
  }, []);

  return <></>;
}

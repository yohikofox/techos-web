"use client";

import { useEffect } from "react";

export default function RegisterNotificationWorker() {
  const registerServiceWorker = async (nid: string) => {
    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register(
          new URL("@/workers/notification.sw.ts", import.meta.url)
        );
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: nid,
          });
          //TODO: export to server action

          await fetch(
            `${process.env.NEXT_PUBLIC_FRONT_URL}/api/notification/subscription/subscribe`,
            {
              method: "POST",
              body: JSON.stringify(subscription),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );
        }
        const worker = registration.active;

        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.source !== worker) return;
          console.info("Received a message from service worker: ", event.data);
        });

        console.info("Registration successful, scope is:", registration.scope);
      }
    } catch (error) {
      console.info("Service worker registration failed, error:", error);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/notification/register`, {
      method: "GET",
    })
      .then((res) =>
        res.json().then((data) => {
          registerServiceWorker(data.api_key);
        })
      )
      .catch((err) => console.warn(err));
  }, []);

  return <></>;
}

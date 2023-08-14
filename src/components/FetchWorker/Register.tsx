'use client'
import { useEffect } from "react"

export interface NotificationWorkerProps {
}

export default function RegisterNotificationWorker(props: NotificationWorkerProps) {

  const registerServiceWorker = async (nid: string) => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register(new URL('@/workers/sw.ts', import.meta.url))

        const worker = registration.active

        navigator.serviceWorker.addEventListener('message', event => {
          if (event.source !== worker) return
          console.log('Received a message from service worker: ', event.data.data);
        })

        console.log('Registration successful, scope is:', registration.scope);
      }
    } catch (error) {
      console.log('Service worker registration failed, error:', error);
    }
  }

  return (
    <>yo</>
  )
}
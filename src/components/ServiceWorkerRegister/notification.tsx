'use client'
import { useEffect } from "react"

export interface NotificationWorkerProps {
}

export default function RegisterNotificationWorker(props: NotificationWorkerProps) {

  const registerServiceWorker = async (nid: string) => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register(new URL('@/workers/notification.sw.ts', import.meta.url))
        let subscription = await registration.pushManager.getSubscription()

        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: nid
          })

          await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/notification/subscription/subscribe`, {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          })
        }
        const worker = registration.active

        navigator.serviceWorker.addEventListener('message', event => {
          if (event.source !== worker) return
          console.log('Received a message from service worker: ', event.data);
        })

        console.log('Registration successful, scope is:', registration.scope);
      }
    } catch (error) {
      console.log('Service worker registration failed, error:', error);
    }
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/notification/register`, {
      method: 'GET'
    })
      .then(res => res.json()
        .then(data => {
          registerServiceWorker(data.api_key)
        }))
      .catch(err => console.warn(err))
  }, [])


  return (
    <></>
  )
}
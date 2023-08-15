'use client'

import { useEffect } from "react"

export default function FetchServiceWorkerRegister() {

  const registerServiceWorker = async () => {
    try {


      if ('serviceWorker' in navigator) {

        const registration = await navigator.serviceWorker.register(new URL('@/workers/fetch.sw.ts', import.meta.url), {
          scope: '/'
        })
        const worker = registration.active
        worker?.addEventListener('message', (event) => {
          console.log('Received message from service worker', event)
        })
        console.log('Registration successful, scope is:', registration.scope);
      }
    } catch (error) {
      console.log('Service worker registration failed, error:', error);
    }
  }

  useEffect(() => {
    window.addEventListener('load', () => {
      console.log('load')
    })
    registerServiceWorker()
  }, [])

  return (<></>)
}
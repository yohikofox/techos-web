'use client'

import { useEffect, useState } from "react"
import DisplayTracking from "./displayTracking"
import classNames from 'classnames';

interface TrackingWorkerProps {
  data: any
  className?: string
  title?: string
  initialData?: any
}

export { DisplayTracking };
export type { TrackingWorkerProps }


export default function TrackingWorker({ data, className, title, initialData }: TrackingWorkerProps) {
  const [counter, setCounter] = useState(initialData?.viewCount || 0)
  useEffect(() => {
    const worker = new Worker(new URL('@/components/TrackingWorker/worker.ts', import.meta.url))
    worker.onmessage = (event) => {
      setCounter(event.data.viewCount)
      // console.log('🍏 Message received from worker: ', event.data);
    }

    worker.onerror = (event) => {
      if (event instanceof Event) {
        console.log('🍎 Error message received from worker: ', event);
        return event;
      }

      console.log('🍎 Unexpected error: ', event);
      throw event;
    }

    worker.postMessage(data);

    return () => {
      worker.terminate();
    };
  }, [setCounter, data])


  return (
    <>
      <DisplayTracking className={className} counter={counter} title={title} />
    </>
  )
}

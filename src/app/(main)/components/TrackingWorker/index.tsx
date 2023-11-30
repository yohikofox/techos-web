'use client'

import { Dispatch, useEffect, useState } from "react"
import DisplayTracking from "./displayTracking"
import classNames from 'classnames';
import useTrackingWorker from "./useTrackingWorker";

interface TrackingWorkerProps {
  data: any
  className?: string
  title?: string
  initialData?: any
}

export { DisplayTracking };
export type { TrackingWorkerProps }


export default function TrackingWorker({ data, className, title, initialData }: TrackingWorkerProps) {

  const [counter] = useTrackingWorker({ data, initialData: initialData?.viewCount })

  return (
    <>
      <DisplayTracking className={className} counter={counter} title={title} />
    </>
  )
}

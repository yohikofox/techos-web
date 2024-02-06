"use client";

import DisplayTracking from "./displayTracking";
import useTrackingWorker from "./useTrackingWorker";

interface TrackingWorkerProps {
  data: unknown;
  className?: string;
  title?: string;
  initialData?: {
    viewCount: number;
  };
}

export { DisplayTracking };
export type { TrackingWorkerProps };

export default function TrackingWorker({
  data,
  className,
  title,
  initialData,
}: TrackingWorkerProps) {
  const [counter] = useTrackingWorker({
    data,
    initialData: initialData?.viewCount,
  });

  return (
    <>
      <DisplayTracking className={className} counter={counter} title={title} />
    </>
  );
}

import { Dispatch, useEffect, useState } from "react";

export interface TrackingWorkerProps {
  data: unknown;
  initialData?: number;
}

/**
 * ### useTrackingWorker
 * This hook is used to create a worker to track the number of views of a page
 * > _Declare Hooks with const function style to avoid to create `this` context_
 * @param data
 * @param count
 * @returns [number, Dispatch<number>]
 */

const useTrackingWorker = ({
  data,
  initialData,
}: TrackingWorkerProps): [number, Dispatch<number>] => {
  const [counter, setCounter] = useState(
    initialData !== undefined ? initialData : 0
  );
  useEffect(() => {
    const worker = new Worker(
      new URL(
        "@/app/(main)/components/TrackingWorker/worker.ts",
        import.meta.url
      )
    );
    worker.onmessage = (event) => {
      setCounter(event.data.viewCount);
      console.debug("🍏 Message received from worker: ", event.data);
    };

    worker.onerror = (event) => {
      if (event instanceof Event) {
        console.info("🍎 Error message received from worker: ", event);
        return event;
      }

      console.info("🍎 Unexpected error: ", event);
      throw event;
    };

    worker.postMessage(data);

    return () => {
      worker.terminate();
    };
  }, [setCounter, data]);

  return [counter, setCounter];
};

export default useTrackingWorker;

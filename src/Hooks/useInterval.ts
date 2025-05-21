import { useEffect, useRef } from "react";

export function useInterval(
  callback: () => void,
  delay: number,
  initialDelay?: number
) {
  const callbackRef = useRef(callback);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reschedule = useRef((_ms?: number) => {});

  callbackRef.current = callback;

  useEffect(() => {
    if (delay > 0) {
      let id: NodeJS.Timeout | undefined;
      function tick() {
        callbackRef.current();
        id = setTimeout(tick, delay);
      }
      reschedule.current = (ms?: number) => {
        clearInterval(id);
        id = setTimeout(tick, ms || delay);
      }
      id = setTimeout(tick, initialDelay || delay);
      return () => clearInterval(id);
    } else throw new Error("Delay must be a number greater than 0");
  }, [delay, initialDelay]);

  return {reschedule: reschedule.current};
}

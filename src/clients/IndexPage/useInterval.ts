import { DependencyList, useEffect, useRef } from "react";

export function useInterval(
  callback: () => void, interval: number, dependencies: DependencyList = []
) {
  const intervalRef = useRef<NodeJS.Timer>();
  useEffect(() => {
    intervalRef.current = setInterval(callback, interval);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, dependencies);
}
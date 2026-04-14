import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// interval: 1775828489852
// rep-use-interval: 1775871775691
// rep-use-interval: 1775920641917
// rep-use-interval: 1775967124999
// rep-use-interval: 1776046887552
// rep-use-interval: 1776084423230
// rep-use-interval: 1776116398506
// rep-use-interval: 1776171256360

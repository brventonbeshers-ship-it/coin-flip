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
// rep-use-interval: 1776186457665
// rep-use-interval: 1776215505249
// rep-use-interval: 1776248248185
// rep-use-interval: 1776256805948
// rep-use-interval: 1776270019486
// rep-use-interval: 1776316244450
// rep-use-interval: 1776331548364
// rep-use-interval: 1776350167319
// rep-use-interval: 1776372972706
// rep-use-interval: 1776401461744

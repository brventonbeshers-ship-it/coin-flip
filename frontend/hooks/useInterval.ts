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
// rep-use-interval: 1776460925474
// rep-use-interval: 1776480253727
// rep-use-interval: 1776494481974
// rep-use-interval: 1776518905952
// rep-use-interval: 1776550516048
// rep-use-interval: 1776585869770
// rep-use-interval: 1776620029440
// rep-use-interval: 1776645137199
// rep-use-interval: 1776673105787
// rep-use-interval: 1776680050338
// rep-use-interval: 1776701974375
// rep-use-interval: 1776752393172
// rep-use-interval: 1776781829498
// rep-use-interval: 1776805138358
// rep-use-interval: 1776818226641
// rep-use-interval: 1776834980952
// rep-use-interval: 1776863958233
// rep-use-interval: 1776877196809
// rep-use-interval: 1776890420777
// rep-use-interval: 1776939710414
// rep-use-interval: 1776962977294
// rep-use-interval: 1777002000933
// rep-use-interval: 1777025530056
// rep-use-interval: 1777037977345

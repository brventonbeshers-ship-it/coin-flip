import { useCallback, useRef } from "react";

export function useSound(enabled = true) {
  const audioCtx = useRef<AudioContext | null>(null);

  const playRoll = useCallback(() => {
    if (!enabled) return;
    if (!audioCtx.current) {
      audioCtx.current = new AudioContext();
    }
    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 600;
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, [enabled]);

  return { playRoll };
}

// sound: 1775828433164
// rep-use-sound: 1775871884316
// rep-use-sound: 1775920597596
// rep-use-sound: 1775966954016
// rep-use-sound: 1776047122015
// rep-use-sound: 1776063416358
// rep-use-sound: 1776084266981
// rep-use-sound: 1776116388952
// rep-use-sound: 1776144045727
// rep-use-sound: 1776171114855
// rep-use-sound: 1776186436572
// rep-use-sound: 1776215663002
// rep-use-sound: 1776248059640
// rep-use-sound: 1776256794193
// rep-use-sound: 1776269955093
// rep-use-sound: 1776316186267
// rep-use-sound: 1776331413380
// rep-use-sound: 1776350219926
// rep-use-sound: 1776401389685

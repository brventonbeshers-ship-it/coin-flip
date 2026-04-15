import { useState, useCallback } from "react";
import { connectWallet } from "@/lib/stacks";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(() => {
    connectWallet(({ stacks }) => setAddress(stacks));
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return { address, connected: !!address, connect, disconnect };
}

// wallet: 1775828293997
// rep-use-wallet: 1775871948968
// rep-use-wallet: 1775920708528
// rep-use-wallet: 1775967147148
// rep-use-wallet: 1776046852761
// rep-use-wallet: 1776063439719
// rep-use-wallet: 1776084532782
// rep-use-wallet: 1776116443794
// rep-use-wallet: 1776144050941
// rep-use-wallet: 1776171272320
// rep-use-wallet: 1776186558013
// rep-use-wallet: 1776215679935

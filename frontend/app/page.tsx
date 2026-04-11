"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  connectWallet,
  fetchTotalFlips,
  fetchUserFlips,
  fetchUserLastSide,
  fetchLeaderboard,
  sendFlip,
} from "@/lib/stacks";
import { CoinDisplay } from "@/components/CoinDisplay";
import { formatNumber, shortenAddress, sideLabel } from "@/lib/utils";

interface FloatingNum {
  id: number;
  x: number;
  y: number;
  value: string;
}

interface LeaderEntry {
  who: string;
  flips: number;
}

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [myFlips, setMyFlips] = useState(0);
  const [lastSide, setLastSide] = useState(0);
  const [globalFlips, setGlobalFlips] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [flipping, setFlipping] = useState(false);
  const [rings, setRings] = useState<number[]>([]);
  const [floats, setFloats] = useState<FloatingNum[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef(0);

  const loadData = useCallback(async () => {
    const [total, lb] = await Promise.all([fetchTotalFlips(), fetchLeaderboard()]);
    setGlobalFlips(total);
    setLeaderboard(lb);
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [loadData]);

  useEffect(() => {
    if (address) {
      Promise.all([fetchUserFlips(address), fetchUserLastSide(address)]).then(
        ([flips, side]) => {
          setMyFlips(flips);
          setLastSide(side);
        }
      );
    }
  }, [address]);

  const handleConnect = () => {
    connectWallet(({ stacks }) => {
      setAddress(stacks);
    });
  };

  const handleFlip = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!address) return;

      const pseudoSide = Math.random() > 0.5 ? 1 : 2;
      setMyFlips((count) => count + 1);
      setGlobalFlips((count) => count + 1);
      setLastSide(pseudoSide);

      setFlipping(true);
      setTimeout(() => setFlipping(false), 700);

      const ringId = ++idRef.current;
      setRings((current) => [...current, ringId]);
      setTimeout(() => {
        setRings((current) => current.filter((id) => id !== ringId));
      }, 600);

      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) {
        const floatId = ++idRef.current;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setFloats((current) => [
          ...current,
          { id: floatId, x, y, value: sideLabel(pseudoSide) },
        ]);
        setTimeout(() => {
          setFloats((current) => current.filter((item) => item.id !== floatId));
        }, 800);
      }

      sendFlip(address).then((success) => {
        if (success) {
          setTimeout(loadData, 5000);
          setTimeout(() => {
            fetchUserLastSide(address).then(setLastSide);
          }, 5000);
          return;
        }

        setMyFlips((count) => count - 1);
        setGlobalFlips((count) => count - 1);
        setLastSide(0);
      });
    },
    [address, loadData]
  );

  const connected = !!address;
  const displayLeaderboard: LeaderEntry[] = [...leaderboard];

  while (displayLeaderboard.length < 10) {
    displayLeaderboard.push({ who: "-", flips: 0 });
  }

  return (
    <main className="min-h-screen flex flex-col items-center relative grid-bg">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] left-[2%] w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle,rgba(121,242,192,0.13)_0%,rgba(121,242,192,0.04)_42%,transparent_72%)]" />
        <div className="absolute bottom-[-8%] right-[-4%] w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(216,255,243,0.1)_0%,rgba(216,255,243,0.03)_40%,transparent_72%)]" />
        <div className="absolute top-[36%] left-[42%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(45,159,134,0.08)_0%,transparent_60%)]" style={{ animation: "pulse-glow 7s infinite ease-in-out" }} />

        <div className="particle" style={{ left: "10%", bottom: "0%", animationDelay: "0s" }} />
        <div className="particle" style={{ left: "20%", bottom: "5%", animationDelay: "1.5s" }} />
        <div className="particle" style={{ left: "35%", bottom: "0%", animationDelay: "3s" }} />
        <div className="particle-gold particle" style={{ left: "55%", bottom: "10%", animationDelay: "0.5s" }} />
        <div className="particle" style={{ left: "70%", bottom: "0%", animationDelay: "2s" }} />
        <div className="particle-gold particle" style={{ left: "85%", bottom: "5%", animationDelay: "4s" }} />
        <div className="particle" style={{ left: "45%", bottom: "0%", animationDelay: "5s" }} />
        <div className="particle-gold particle" style={{ left: "15%", bottom: "8%", animationDelay: "6s" }} />
        <div className="particle" style={{ left: "60%", bottom: "0%", animationDelay: "2.5s" }} />
        <div className="particle-gold particle" style={{ left: "90%", bottom: "3%", animationDelay: "3.5s" }} />
      </div>

      <header className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#79f2c0] to-[#d8fff3] flex items-center justify-center text-sm font-bold text-[#0b1b1f]">
            C
          </div>
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-[#79f2c0]">C</span>
            <span className="text-[#92f5ca]">o</span>
            <span className="text-[#abf7d5]">i</span>
            <span className="text-[#c3fbe1]">n</span>
            <span className="text-[#d8fff3]"> Flip</span>
          </span>
        </div>

        <button
          onClick={handleConnect}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
            connected
              ? "glass-card text-[#79f2c0] border-[#79f2c0]/20"
              : "bg-gradient-to-r from-[#79f2c0] to-[#d8fff3] text-[#0b1b1f] hover:opacity-90"
          }`}
        >
          {connected ? shortenAddress(address) : "Connect Wallet"}
        </button>
      </header>

      <div className="mt-6 text-center relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-1">
          Global Flips
        </p>
        <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#79f2c0] to-[#d8fff3] bg-clip-text text-transparent">
          {formatNumber(globalFlips)}
        </p>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 my-8 relative z-10">
        <div className="flex flex-col items-center">
          {connected && lastSide > 0 && (
            <div className="mb-6">
              <CoinDisplay side={lastSide} size="lg" />
              <p className="mt-3 text-center text-xs uppercase tracking-[0.28em] text-white/45">
                Last side: <span className="text-[#79f2c0]">{sideLabel(lastSide)}</span>
              </p>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="orbit-dot" />
              <div className="orbit-dot-2" />
            </div>

            <div className="coin-glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

            {rings.map((id) => (
              <div
                key={id}
                className="coin-ring absolute inset-0 rounded-full border-2 border-[#79f2c0]/35"
              />
            ))}

            {floats.map((item) => (
              <div
                key={item.id}
                className="float-number absolute text-[#d8fff3] font-bold text-xl"
                style={{ left: item.x, top: item.y }}
              >
                {item.value}
              </div>
            ))}

            <button
              ref={btnRef}
              onClick={handleFlip}
              disabled={!connected}
              className={`relative w-48 h-48 md:w-60 md:h-60 rounded-full cursor-pointer bg-gradient-to-br from-[#79f2c0]/12 to-[#d8fff3]/8 border-2 border-[#79f2c0]/28 flex items-center justify-center transition-all duration-100 select-none shadow-[0_0_60px_rgba(121,242,192,0.12),inset_0_0_60px_rgba(121,242,192,0.05)] ${
                connected
                  ? "hover:border-[#79f2c0]/60 hover:shadow-[0_0_84px_rgba(121,242,192,0.2),inset_0_0_60px_rgba(121,242,192,0.08)] active:scale-95"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <div className={flipping ? "coin-spin" : "coin-bob"}>
                <CoinDisplay side={lastSide || 1} size="lg" />
              </div>
            </button>
          </div>

          {connected && (
            <div className="text-center mt-8 space-y-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-1">
                  Your Flips
                </p>
                <p className="text-3xl font-bold text-white/90">
                  {formatNumber(myFlips)}
                </p>
              </div>
            </div>
          )}

          {!connected && (
            <p className="text-white/20 text-sm mt-6">Connect wallet to start flipping</p>
          )}
        </div>

        <div className="w-full max-w-sm lg:w-[360px]">
          <div className="glass-card p-6">
            <h2 className="text-sm uppercase tracking-[0.2em] text-white/30 mb-5 text-center">
              Leaderboard
            </h2>

            <div className="space-y-1.5">
              {displayLeaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`lb-row flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                    index === 0 && entry.flips > 0
                      ? "bg-gradient-to-r from-[#79f2c0]/9 to-transparent border border-[#79f2c0]/16"
                      : index === 1 && entry.flips > 0
                        ? "bg-gradient-to-r from-[#d8fff3]/7 to-transparent border border-[#d8fff3]/12"
                        : index === 2 && entry.flips > 0
                          ? "bg-gradient-to-r from-[#2d9f86]/8 to-transparent border border-[#2d9f86]/14"
                          : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 text-sm font-bold ${
                        index === 0
                          ? "text-[#79f2c0]"
                          : index === 1
                            ? "text-[#d8fff3]"
                            : index === 2
                              ? "text-[#2d9f86]"
                              : "text-white/20"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-mono text-white/60">
                      {entry.who === "-" ? "---" : shortenAddress(entry.who)}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      index === 0 && entry.flips > 0
                        ? "text-[#79f2c0]/90"
                        : index === 1 && entry.flips > 0
                          ? "text-[#d8fff3]/90"
                          : index === 2 && entry.flips > 0
                            ? "text-[#2d9f86]/90"
                            : "text-white/60"
                    }`}
                  >
                    {entry.flips > 0 ? formatNumber(entry.flips) : "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
// rep-page-ui: 1775871630913
// rep-page-ui: 1775920796804

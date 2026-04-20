import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coin Flip | On-Chain Heads or Tails",
  description: "Flip a coin on Stacks, track your streak, and climb the on-chain leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="talentapp:project_verification"
          content="339522e4ad326f99317b38126a4fa2fb098f599bbb8f11f58c75c469eb4cc46afa008d5b172140beae3ad6452d40a6cbab558b4f8ed1af068d141952e938fed1"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
// rep-layout-meta: 1775871833615
// rep-layout-meta: 1775920749600
// rep-layout-meta: 1775966901318
// rep-layout-meta: 1776047110453
// rep-layout-meta: 1776063207047
// rep-layout-meta: 1776084529588
// rep-layout-meta: 1776116536807
// rep-layout-meta: 1776144282410
// rep-layout-meta: 1776171018553
// rep-layout-meta: 1776186626950
// rep-layout-meta: 1776215528164
// rep-layout-meta: 1776248164736
// rep-layout-meta: 1776256898048
// rep-layout-meta: 1776270101511
// rep-layout-meta: 1776315860865
// rep-layout-meta: 1776331410182
// rep-layout-meta: 1776350211560
// rep-layout-meta: 1776372904768
// rep-layout-meta: 1776401518403
// rep-layout-meta: 1776432007230
// rep-layout-meta: 1776460866613
// rep-layout-meta: 1776480285354
// rep-layout-meta: 1776494313594
// rep-layout-meta: 1776519034362
// rep-layout-meta: 1776550736542
// rep-layout-meta: 1776585919011
// rep-layout-meta: 1776619890333
// rep-layout-meta: 1776644989589

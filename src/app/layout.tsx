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
  title: "DeFine — DeFi Risk Observability",
  description: "Prevention - first risk observability for DeFi wallets. DeFine converts on-chain state into actionable risk signals and explainable alerts.",
  metadataBase: new URL("https://define.is"),
  openGraph: {
    title: "DeFine - DeFi Risk Observability",
    description: "Prevention-first risk observability for DeFi wallets.",
    url: "https://define.is",
    siteName: "DeFine",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeFine - DeFi Risk Observability",
    description:
      "Prevention-first risk observability for DeFi wallets.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

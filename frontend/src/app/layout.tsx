import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { NEXT_PUBLIC_URL } from "../config";

import "./global.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/app/theme-provider";

import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const font = Mulish({ subsets: ["latin"] });
const OnchainProviders = dynamic(() => import("src/components/OnchainProviders"), {
  ssr: false,
});

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "NairaToCrypto",
  description: "Convert naira to crypto in seconds through bank transfer",
  openGraph: {
    title: "Convert naira to crypto in seconds through bank transfer",
    description: "Built with OnchainKit",
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <OnchainProviders>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </OnchainProviders>
      </body>
    </html>
  );
}

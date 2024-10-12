import type { Metadata } from "next";
import { Mulish } from "next/font/google";


import "./global.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "@/components/ui/toaster"
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
    description: "Built with OnchainKit for Base Africa Buildathon 2024",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <OnchainProviders>
          {children}
          <Footer />
        </OnchainProviders>
            <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ReactNode, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nabil Spann Portfolio",
  description: "Nabil Spann's Ubuntu Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Script src="webvm/serviceWorker.js" />
      <Script src="webvm/xterm.js" />
      <Script src="webvm/xterm-addon-fit.js" />
      <Script src="webvm/xterm-addon-web-links.js" />
      <Script src="webvm/network.js" />
      <Script src="https://cheerpxdemos.leaningtech.com/publicdeploy/20240722_146/cx.js" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

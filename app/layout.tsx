import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StylesConnect",
  description: "Shop Bespoke & Ready-made designs from local designers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${inter.variable} font-jost antialiased`}>
        {children}
      </body>
    </html>
  );
}

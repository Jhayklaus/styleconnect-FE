import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { DevAuthToggle } from "@/components/auth/DevAuthToggle";
import { GlobalModals } from "@/components/GlobalModals";

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
        <AuthProvider>
          {children}
          <GlobalModals />
          <DevAuthToggle />
        </AuthProvider>
      </body>
    </html>
  );
}

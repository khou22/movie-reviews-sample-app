import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "700"] });

export const metadata: Metadata = {
  title: `Kevin's Movie Reviews`,
  description: "Sample movie reviews app to demonstrate Codeium and MongoDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

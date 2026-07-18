import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Nadoumi — Scholarships & Study in China",
  description:
    "Discover fully-funded scholarships and world-class programs at China's most prestigious institutions. Sichuan Nadoumi Education Consulting Co., Ltd.",
  keywords: [
    "scholarships",
    "study in China",
    "CSC scholarship",
    "Chinese universities",
    "international students",
    "Nadoumi",
  ],
  authors: [{ name: "Nadoumi" }],
  openGraph: {
    title: "Nadoumi — Scholarships & Study in China",
    description:
      "Discover fully-funded scholarships and world-class programs at China's most prestigious institutions.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased selection:bg-orange-100 selection:text-orange-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

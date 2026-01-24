import type { Metadata } from "next";
import { Inter, Libre_Baskerville, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700', '400'], // Note: 400 italic is also available but let's stick to basics
  variable: "--font-libre",
  subsets: ["latin"],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  weight: ['400', '700'],
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
});

export const metadata: Metadata = {
  title: "Darshana | Hindu Philosophy Learning",
  description: "Systematic study of Vedanta and Yoga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${libreBaskerville.variable} ${notoSerifDevanagari.variable} antialiased bg-parchment text-ink`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


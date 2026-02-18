import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  variable: "--font-libre",
  subsets: ["latin"],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  weight: ['400', '700'],
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
});

// themeColor belongs in the viewport export (metadata.themeColor is deprecated in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#852E47',
};

export const metadata: Metadata = {
  title: "Darshana | Hindu Philosophy Learning",
  description: "Systematic study of Vedanta and Yoga",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Darshana",
  },
  // apple-touch-icon for iOS home screen
  icons: {
    apple: '/icons/icon-512x512.svg',
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
        className={`${inter.variable} ${libreBaskerville.variable} ${notoSerifDevanagari.variable} antialiased bg-parchment text-ink`}
      >
        {/* Providers contains BillingProvider > UserProgressProvider > ChatProvider.
            BottomNav and AiChatOverlay are also rendered inside Providers so they
            share the same context instances as the page content.
            The old double-mount of UserProgressProvider here has been removed. */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

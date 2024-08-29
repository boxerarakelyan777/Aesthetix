import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../../components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "../../components/Footer";
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: "LookMate: AI Outfit Stylist & Wardrobe Assistant",
  description: "LookMate is your personal AI stylist, transforming your wardrobe into endless outfit possibilities. Whether you're heading to class, a night out, or just hanging with friends, LookMate instantly suggests the perfect outfit based on your clothing, weather conditions, and upcoming events. Upload your wardrobe, set your style preferences, and let LookMate do the rest – saving you time and keeping you stylish every day. Join the waitlist now and be among the first to experience the future of fashion!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''} />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

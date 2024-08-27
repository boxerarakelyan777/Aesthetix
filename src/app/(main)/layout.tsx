import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../../components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "../../components/Footer";
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
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import React from 'react';
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter } from "next/font/google";
import Sidebar from '../../components/Sidebar';
import TopNavBar from '../../components/TopNavBar';
import "../globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(
  { params }: { params: { slug: string[] } }
): Promise<Metadata> {
  const path = params.slug ? `/${params.slug.join('/')}` : '/dashboard';

  let pageTitle = "AI Outfit Stylist & Wardrobe Assistant";

  switch (path) {
    case '/dashboard':
      pageTitle = "Dashboard";
      break;
    case '/wardrobe':
      pageTitle = "My Wardrobe";
      break;
    case '/outfit-generator':
      pageTitle = "Outfit Generator";
      break;
    case '/saved-outfits':
      pageTitle = "Saved Outfits";
      break;
    case '/community':
      pageTitle = "Community";
      break;
    case '/challenges':
      pageTitle = "Challenges";
      break;
    // Add more cases for other pages as needed
  }

  return {
    title: pageTitle,
    description: "Your personal AI stylist, transforming your wardrobe into endless outfit possibilities.",
  };
}

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-midnight-black text-soft-white`}>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <TopNavBar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-midnight-black">
                <div className="container mx-auto px-6 py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}


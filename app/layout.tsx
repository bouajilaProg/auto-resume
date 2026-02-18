import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileBlocker from "@/components/MobileBlocker";
import Providers from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "autoResume",
  description: "resume builder for efficient developers",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Providers>
          {/* 1. Mobile Blocker: Only shows on screens smaller than 768px (md) */}
          <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center md:hidden bg-gray-900 text-white">
            <MobileBlocker />
          </div>

          {/* 2. Main App: Only renders its layout on screens 768px (md) and up */}
          <div className="hidden md:flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

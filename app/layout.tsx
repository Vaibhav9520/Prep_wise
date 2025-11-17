import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";

import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlaceMate AI - AI-Powered Interview Preparation",
  description: "Ace your next interview with AI-powered mock interviews, instant feedback, and personalized questions. Join thousands of successful candidates who landed their dream jobs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.className} antialiased`}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}

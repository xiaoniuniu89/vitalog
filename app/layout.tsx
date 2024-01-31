import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ApplicationContextProvider } from "@/context/ApplicationContext";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vita Log",
  description: "A note taking app to track your daily diet in a simple way.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ApplicationContextProvider>
        <html lang="en">
          <body>
            <Navbar />
            {children}
          </body>
        </html>
      </ApplicationContextProvider>
    </ClerkProvider>
  );
}

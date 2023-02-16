import { Inter as FontSans } from "@next/font/google";
import { TailwindIndicator } from "../components/tailwind-indicator";
import { cn } from "../utils/cn";

import "../styles/globals.css";

import { MainNav } from "../components/mainNav";
import { getCurrentUser } from "lib/getSession";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: "CreatorHub",
    template: "%s | CreatorHub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getCurrentUser();

  return (
    <html
      lang="en"
      className={cn(
        "bg-darkPurple font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
    >
      <head />
      <body className="flex flex-col md:flex-row">
        <TailwindIndicator />

        <MainNav session={session} />
        {children}
      </body>
    </html>
  );
}

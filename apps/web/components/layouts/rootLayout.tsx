import { Inter as FontSans } from "@next/font/google";

import { getCurrentUser } from "lib/getSession";
import { TailwindIndicator } from "@components/tailwind-indicator";
import { MainNav } from "@components/mainNav";
import { cn } from "utils/cn";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

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

export default function RootLayout({ children }: RootLayoutProps) {
  const { data: session } = useSession();
  return (
    <html
      lang="en"
      className={cn(
        "bg-darkPurple font-sans text-slate-900 antialiased",
        fontSans.variable,
        fontSans.className
      )}
    >
      <head />
      <body className="flex flex-col md:flex-row">
        <TailwindIndicator />

        <MainNav session={session as Session} />
        {children}
      </body>
    </html>
  );
}

export const getRootLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

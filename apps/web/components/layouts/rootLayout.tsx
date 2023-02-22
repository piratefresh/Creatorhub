import { Inter as FontSans } from "@next/font/google";
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
    <main
      className={cn(
        "flex flex-col bg-darkPurple md:flex-row",
        fontSans.variable,
        fontSans.className
      )}
    >
      <TailwindIndicator />

      <MainNav session={session as Session} />
      {children}
    </main>
  );
}

export const getRootLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

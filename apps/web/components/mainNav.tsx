"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { SideMenu } from "ui";
import { signOut } from "next-auth/react";
import { type Session } from "next-auth";
import { MENU_ITEMS, MENU_FOOTER_DATA } from "../config/MainNav";
import Link from "next/link";

export const MainNav = ({ session }: { session: Session }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <nav>
      <div className="hidden gap-6 md:flex">
        <SideMenu
          items={MENU_ITEMS}
          footerItems={MENU_FOOTER_DATA}
          session={session}
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between space-x-2 p-5 md:hidden">
        <Link href="/">
          <h1 className="text-display-sm text-white">CreatorHub</h1>
        </Link>
        <button className="" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          {!showMobileMenu && <Bars3Icon className="h-5 w-5 text-white" />}
        </button>
      </div>
      {showMobileMenu && (
        <div className="fixed top-0 z-50">
          <SideMenu
            className="w-screen"
            items={MENU_ITEMS}
            footerItems={MENU_FOOTER_DATA}
            session={session}
            onClose={() => setShowMobileMenu(!showMobileMenu)}
            signOut={signOut}
          />
        </div>
      )}
    </nav>
  );
};

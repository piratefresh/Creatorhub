"use client";
import { Bars3Icon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { SideMenu } from "ui";
import { MENU_ITEMS, MENU_FOOTER_DATA, session } from "../config/MainNav";

export const MainNav = () => {
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
        <h1 className="text-display-sm text-white">CreatorHub</h1>
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
          />
        </div>
      )}
    </nav>
  );
};

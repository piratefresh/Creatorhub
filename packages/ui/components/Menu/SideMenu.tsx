import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Accordion } from "../Accordion";
import { Avatar } from "../Avatar/Avatar";
import { Input } from "../Input";
import { Label } from "../Label";
import s from "./SideMenu.module.css";

export type MenuItemProps = {
  label: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  children?: MenuItemProps[];
};

interface SideMenuProps {
  items: MenuItemProps[];
  footerItems: MenuItemProps[];
  // Add next-auth session type later
  session: any;
}

export const SideMenu = ({ items, footerItems, session }: SideMenuProps) => {
  return (
    <div className="relative h-screen max-w-sm p-5">
      <div className={s.overlay} />
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-display-sm text-white">CreatorHub</h1>
          <div className="flex flex-col">
            <Label htmlFor="search">Search</Label>
            <Input
              name="search"
              addonBefore={
                <div className="rounded-y-lg flex items-center rounded-l-lg border border-r-0 py-1 pl-4">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
                </div>
              }
              //   Might add filter later here
              //   addonAfter={
              //     <div className="rounded-y-lg flex items-center rounded-r-lg border border-l-0 py-1 pr-4">
              //       <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
              //     </div>
              //   }
            />
          </div>
          <ul className="flex flex-col gap-8">
            {items.map((item) => {
              if (!item.children)
                return (
                  <Link className="cursor-pointer" href={item.href}>
                    <li className="flex items-center gap-2 p-1 text-text-md text-gray-100">
                      {item.icon}
                      {item.label}
                    </li>
                  </Link>
                );

              return (
                <Accordion
                  items={[
                    {
                      title: item.label,
                      children: item.children.map((child, i) => (
                        <Link className="cursor-pointer" href={child.href}>
                          <li className="flex items-center gap-2 py-4 pl-1 text-text-md text-gray-100">
                            {child.icon}
                            {child.label}
                          </li>
                        </Link>
                      )),
                      id: item.label as string,
                    },
                  ]}
                />
              );
            })}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-8">
            {footerItems.map((item) => (
              <Link className="cursor-pointer" href={item.href}>
                <li className="flex items-center gap-2 p-1 text-text-md text-gray-100">
                  {item.icon}
                  {item.label}
                </li>
              </Link>
            ))}

            <div className="h-[1px] border-t border-gray-800" />
            <div className="flex gap-2">
              <Avatar src={session.user.imageUrl} />
              <div className="flex flex-col">
                <span className="text-gray-100">{session.user.name}</span>
                <span className="text-gray-300">{session.user.email}</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

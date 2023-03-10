import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Accordion } from "../Accordion";
import { Avatar } from "../Avatar/Avatar";
import { Input } from "../Input";
import { Label } from "../Label";
import s from "./SideMenu.module.css";
import cn from "clsx";

export type MenuItemProps = {
  label: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  children?: MenuItemProps[];
};

interface SideMenuProps {
  className?: string;
  items: MenuItemProps[];
  footerItems: MenuItemProps[];
  // Add next-auth session type later
  session: any;
  // For mobile close
  onClose?: () => void;
}

export const SideMenu = ({
  items,
  footerItems,
  session,
  className,
  onClose,
}: SideMenuProps) => {
  return (
    <div className={cn(className, "h-screen bg-darkPurple")}>
      <div className={s.overlay} />
      <div className="flex h-full flex-col justify-between p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-display-sm text-white">CreatorHub</h1>
            <div className="flex md:hidden">
              <XMarkIcon
                className="h-5 w-5 cursor-pointer text-gray-100"
                onClick={onClose}
              />
            </div>
          </div>

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
                  <Link
                    className="cursor-pointer"
                    href={item.href}
                    key={item.href}
                  >
                    <li className="flex items-center gap-2 p-1 text-text-md text-gray-100">
                      <div className="icon">{item.icon}</div>

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
                        <Link
                          className="cursor-pointer"
                          href={child.href}
                          key={child.href}
                        >
                          <li className="flex items-center gap-2 py-4 pl-1 text-text-md text-gray-100">
                            <div className="icon">{child.icon}</div>
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
              <Link className="cursor-pointer" href={item.href} key={item.href}>
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

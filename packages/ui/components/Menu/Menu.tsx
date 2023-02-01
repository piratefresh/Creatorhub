import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import * as Menubar from "@radix-ui/react-menubar";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export type MenuItemProps = {
  label: React.ReactNode;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  type?: string;
  children?: MenuItemProps[];
};
export interface MenuLinksProps extends MenuItemProps {
  children?: MenuItemProps[];
  session?: any;
}

export interface MenuProps {
  menuLinks: MenuLinksProps[];
  session: any;
}

export const Menu = ({ menuLinks, session }: MenuProps) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <Menubar.Root className="flex items-center justify-between gap-10 bg-gray-25 p-4 text-primary-600 shadow-md md:justify-between md:rounded-md">
      <div className="flex items-center gap-2">
        <Image src="/images/logotheinn.svg" alt="logo" width={32} height={32} />
        <h1 className="text-md font-bold text-gray-900">
          {isMobile ? `MobileMenu` : "Desktop Menu"}
        </h1>
      </div>

      <div className="md: flex flex-auto justify-end gap-8 md:flex-1 md:justify-start">
        {menuLinks.map((link) => (
          <MenuLink
            key={link.href}
            label={link.label}
            href={link.href}
            children={link.children}
            description={link.description}
            type={link.type}
            session={session}
          />
        ))}
      </div>

      <MenuUser session={session} />
    </Menubar.Root>
  );
};

function MenuLink({
  label,
  href,
  children,
  description,
  type,
  session,
}: MenuLinksProps) {
  return (
    <Menubar.Menu>
      {children ? (
        <Link href={href}>
          <Menubar.Trigger className="text-md font-semibold text-gray-500 hover:text-gray-900">
            <h3 className="text-md font-semibold">{label}</h3>
          </Menubar.Trigger>
        </Link>
      ) : (
        <Link href={href}>
          <button className="text-md font-semibold text-gray-500 hover:text-gray-900">
            <h3 className="text-md font-semibold">{label}</h3>
          </button>
        </Link>
      )}

      <Menubar.Portal>
        <Menubar.Content
          className="flex h-[calc(100vh-70px)] w-screen min-w-[200px] flex-col justify-center gap-2 overflow-y-auto overflow-x-hidden bg-white pt-20 shadow-lg md:h-full md:w-auto md:rounded-b-md md:pt-4"
          sideOffset={20}
        >
          {children?.map((item: MenuLinksProps) => {
            return (
              <MenuChild
                label={item.label}
                href={item.href}
                children={item.children}
                description={item.description}
                icon={item.icon}
              />
            );
          })}

          <MenuMobileUser session={session} />
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}

function MenuChild({
  label,
  href,
  children,
  description,
  icon,
}: MenuLinksProps) {
  return (
    <div className="flex flex-col px-4 py-3">
      <Menubar.Sub>
        <Menubar.SubTrigger>
          <Link href={href}>
            <div className="flex flex-row gap-4">
              {icon && icon}
              <div>
                <h3 className="text-md font-semibold">{label}</h3>
                <p className="break-words">{description}</p>
              </div>
            </div>
          </Link>
        </Menubar.SubTrigger>

        {children?.map((link: MenuLinksProps) => (
          <MenuChild
            key={link.href}
            label={link.label}
            href={link.href}
            children={link.children}
            description={link.description}
            icon={link.icon}
          />
        ))}
      </Menubar.Sub>
    </div>
  );
}

function MenuUser({ session }: { session: any }) {
  if (session)
    return (
      <div className="hidden md:flex md:items-center md:gap-8">
        <a>
          <button>
            <BellIcon className="h-6 w-6 text-gray-500 hover:scale-105 hover:text-gray-900" />
          </button>
        </a>

        <Link href="/messaging/thread">
          <button>
            <ChatBubbleBottomCenterIcon className="h-6 w-6 text-gray-500 hover:scale-105 hover:text-gray-900" />
          </button>
        </Link>
        <Link href="/settings">
          <button>
            <Cog6ToothIcon className="h-6 w-6 text-gray-500 hover:scale-105 hover:text-gray-900" />
          </button>
        </Link>
        <Link href={`/user/${session.id}`}>
          <button>
            <Image
              className="inline-block h-8 w-8 rounded-full hover:scale-105"
              height={60}
              width={60}
              src={session.user.imageUrl}
              alt={`${session.user.name}`}
            />
          </button>
        </Link>
        <Link href="/auth/signout">
          <button className="text-md rounded-md text-white">Sign Out</button>
        </Link>
      </div>
    );
  return (
    <div className="hidden items-center gap-8 md:flex">
      <Link href="/auth/signin">
        <button className="text-md rounded-md bg-primary-50  p-2 font-semibold text-primary-700">
          Log In
        </button>
      </Link>
      <Link href="/auth/signup">
        <button className="text-md rounded-md bg-primary-600 p-2 font-semibold text-white">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
function MenuMobileUser({ session }: { session: any }) {
  if (session)
    return (
      <div className="flex flex-col gap-4 px-4 py-3 md:hidden">
        <Menubar.Separator className="bg-gray-50" style={{ height: "1px" }} />

        <Menubar.Item>
          <button className="flex items-center gap-4">
            <BellIcon className="h-6 w-6" />
            Notifications
          </button>
        </Menubar.Item>
        <Menubar.Item className="flex items-center gap-4">
          <Link href="/messaging/thread">
            <ChatBubbleBottomCenterIcon className="h-6 w-6" />
            <button>Messages</button>
          </Link>
        </Menubar.Item>
        <Menubar.Item>
          <Link href="/settings">
            <button className="flex items-center gap-4">
              <Cog6ToothIcon className="h-6 w-6" />
              Account
            </button>
          </Link>
        </Menubar.Item>
        <Menubar.Item>
          <Link href={`/user/${session.id}`}>
            <button className="flex items-center gap-2">
              <Image
                className="inline-block h-8 w-8 rounded-full"
                height={60}
                width={60}
                src={session.user.imageUrl}
                alt={`${session.user.name}`}
              />
              {session.user.name}
            </button>
          </Link>
        </Menubar.Item>
        <Menubar.Item className="">
          <Link href="/auth/signout">
            <button className="text-md flex w-full justify-center rounded-md bg-primary-600 p-2 font-semibold text-white hover:bg-primary-100 hover:text-primary-600">
              Log Out
            </button>
          </Link>
        </Menubar.Item>
      </div>
    );
  return (
    <div className="flex flex-col gap-4 px-4 py-3 md:hidden">
      <Menubar.Item className="">
        <button className="text-md flex w-full justify-center rounded-md bg-primary-600 p-2 font-semibold text-white hover:bg-primary-100 hover:text-primary-600">
          Sign Up
        </button>
      </Menubar.Item>
      <Menubar.Item>
        <button className="text-md w-full justify-center  rounded-md bg-primary-50 p-2 font-semibold text-primary-700 hover:border hover:border-primary-600 hover:bg-primary-600 hover:bg-transparent">
          Log In
        </button>
      </Menubar.Item>
    </div>
  );
}

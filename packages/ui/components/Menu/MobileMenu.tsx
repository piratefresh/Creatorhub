import * as Menubar from "@radix-ui/react-menubar";
import Image from "next/image";
import {
  Bars3Icon,
  DocumentPlusIcon,
  SwatchIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Database as DatabaseIcon, Book as BookIcon } from "react-feather";
import Link from "next/link";

type MenuItemProps = {
  label: React.ReactNode;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  children?: MenuItemProps[];
};
interface MenuLinksProps extends MenuItemProps {
  children?: MenuItemProps[];
}

interface MenuProps {
  menuLinks: MenuLinksProps[];
}

const MENU_DATA: MenuLinksProps[] = [
  {
    label: "Campaigns",
    href: "/",
    children: [
      {
        label: "Find Campaigns",
        description: "Find campaigns to join other players",
        href: "/campaigns/findcampaigns",
        icon: "/images/campaignsicon.svg",
      },
      {
        label: "Create Campaigns",
        description: "Looking for players for your campaign",
        href: "/campaigns/createcampaign/general",
      },
    ],
  },
  {
    label: "Homebrew",
    href: "/homebrew",
    children: [
      {
        label: "Game Systems",
        description: "Explore player made game systems",
        href: "/homebrew/gamesystems",
      },
      {
        label: "items",
        description: "Explore other peoples custom made items",
        href: "/homebrew/items",
      },
      {
        label: "npc's",
        description: "Explore other peoples custom made npc's",
        href: "/homebrew/npcs",
      },
      {
        label: "skills",
        description: "Explore other peoples custom made skills",
        href: "/homebrew/npcs",
      },
    ],
  },
];

const MOBILE_MENU_DATA: MenuLinksProps[] = [
  {
    label: <Bars3Icon className="h-5 w-5" />,
    href: "/",
    children: [
      {
        label: "Campaigns",
        href: "/",
        children: [
          {
            label: "Find Campaigns",
            description: "Find campaigns to join other players",
            href: "/campaigns/findcampaigns",
            icon: <DatabaseIcon className="h-5 w-5" />,
          },
          {
            label: "Create Campaigns",
            description: "Looking for players for your campaign",
            href: "/campaigns/createcampaign/general",
            icon: <DocumentPlusIcon className="h-5 w-5" />,
          },
        ],
      },
      {
        label: "Homebrew",
        href: "/homebrew",
        children: [
          {
            label: "Game Systems",
            description: "Explore player made game systems",
            href: "/homebrew/gamesystems",
            icon: <BookIcon className="h-5 w-5" />,
          },
          {
            label: "Items",
            description: "Explore other peoples custom made items",
            href: "/homebrew/items",
            icon: <SwatchIcon className="h-5 w-5" />,
          },
          {
            label: "Npc's",
            description: "Explore other peoples custom made npc's",
            href: "/homebrew/npcs",
            icon: <UserGroupIcon className="h-5 w-5" />,
          },
          {
            label: "Skills",
            description: "Explore other peoples custom made skills",
            href: "/homebrew/npcs",
            icon: <WrenchScrewdriverIcon className="h-5 w-5" />,
          },
        ],
      },
    ],
  },
];

export const MobileMenu = ({ menuLinks = MOBILE_MENU_DATA }: MenuProps) => {
  return (
    <Menubar.Root className="flex items-center justify-between gap-10 rounded-md bg-gray-25 p-4 text-primary-600 shadow-md">
      <div className="flex items-center gap-2">
        <Image src="/images/logotheinn.svg" alt="logo" width={32} height={32} />
        <h1 className="text-md font-bold text-gray-900">MobileMenu</h1>
      </div>
      {menuLinks.map((link) => (
        <MenuLink
          key={link.href}
          label={link.label}
          href={link.href}
          children={link.children}
          description={link.description}
        />
      ))}
    </Menubar.Root>
  );
};

function MenuLink({ label, href, children, description }: MenuLinksProps) {
  return (
    <Menubar.Menu>
      <Menubar.Trigger className="text-md font-semibold text-gray-500">
        <h3 className="text-md font-semibold">{label}</h3>
      </Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content
          className="flex min-w-[200px] flex-col justify-center gap-2 overflow-x-hidden rounded-md bg-white shadow-lg md:w-screen"
          alignOffset={40}
          sideOffset={20}
        >
          {children ? (
            children.map((item: MenuLinksProps) => {
              return (
                <MenuChild
                  label={item.label}
                  href={item.href}
                  children={item.children}
                  description={item.description}
                  icon={item.icon}
                />
              );
            })
          ) : (
            <Menubar.Item className="py-8 px-10">{label}</Menubar.Item>
          )}

          <Menubar.Separator className="bg-gray-50" style={{ height: "1px" }} />
          <Menubar.Item className="flex flex-col gap-4 p-4">
            <button className="text-md rounded-md bg-primary-600 p-2 font-semibold text-white">
              Sign Up
            </button>
            <button className="text-md rounded-md bg-primary-50  p-2 font-semibold text-primary-700">
              Log In
            </button>
          </Menubar.Item>
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
    <div className="flex flex-col p-4">
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

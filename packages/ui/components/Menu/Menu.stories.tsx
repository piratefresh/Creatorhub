import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { MenuLinksProps, Menu } from "./Menu";
import {
  Bars3Icon,
  Cog6ToothIcon,
  DocumentPlusIcon,
  LifebuoyIcon,
  RectangleStackIcon,
  Square3Stack3DIcon,
  SwatchIcon,
  TvIcon,
  UserGroupIcon,
  UserIcon,
  WrenchIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Database as DatabaseIcon, Book as BookIcon } from "react-feather";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SideMenu } from "./SideMenu";

const MENU_DATA: MenuLinksProps[] = [
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
      {
        label: "Members",
        href: "members",
      },
    ],
  },
];

const SIDE_MENU_DATA: MenuLinksProps[] = [
  {
    icon: <TvIcon className="h-5 w-5" />,
    label: "Find Projects",
    href: "/findprojects",
  },
  {
    icon: <WrenchIcon className="h-5 w-5" />,
    label: "Create Project",
    href: "/createproject",
  },
  {
    icon: <RectangleStackIcon className="h-5 w-5" />,
    label: "My Projects",
    href: "/myprojects",
  },
  {
    icon: <UserIcon className="h-5 w-5" />,
    label: "Find Talent",
    href: "/findtalent",
  },

  {
    icon: <Square3Stack3DIcon className="h-5 w-5" />,
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Blog",
        href: "/resources/blog",
        icon: <BookIcon className="h-5 w-5" />,
      },
    ],
  },
];
const SIDE_MENU_FOOTER_DATA: MenuLinksProps[] = [
  {
    icon: <LifebuoyIcon className="h-5 w-5" />,
    label: "Support",
    href: "/support",
  },
  {
    icon: <Cog6ToothIcon className="h-5 w-5" />,
    label: "Settings",
    href: "/settings",
  },
];

const session = {
  id: "2131231",
  user: {
    name: "John Doe",
    email: "johndoe@gmail.com",
    imageUrl: "https://source.unsplash.com/random",
  },
};

const meta: Meta<typeof Menu> = {
  title: "Menu",
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Primary: Story = {
  args: {},
  parameters: {},
  render: (args) => {
    const isMobile = useMediaQuery("(max-width: 900px)");
    return (
      <Menu
        menuLinks={
          isMobile ? MENU_DATA : (MENU_DATA[0].children as MenuLinksProps[])
        }
        session={session}
      />
    );
  },
};
export const SideMenuPrimary: Story = {
  args: {},
  parameters: {},
  render: (args) => {
    const isMobile = useMediaQuery("(max-width: 900px)");
    return (
      <SideMenu
        items={SIDE_MENU_DATA}
        footerItems={SIDE_MENU_FOOTER_DATA}
        session={session}
      />
    );
  },
};

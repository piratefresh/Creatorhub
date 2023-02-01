import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { MenuLinksProps, Menu } from "./Menu";
import {
  Bars3Icon,
  DocumentPlusIcon,
  SwatchIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Database as DatabaseIcon, Book as BookIcon } from "react-feather";
import { useMediaQuery } from "../../hooks/useMediaQuery";

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

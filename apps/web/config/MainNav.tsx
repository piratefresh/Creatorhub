import {
  Bars3Icon,
  BookmarkSquareIcon,
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
import { MenuLinksProps } from "ui";

export const MENU_ITEMS: MenuLinksProps[] = [
  {
    icon: (
      <TvIcon className="h-5 w-5" style={{ width: "20px", height: "20px" }} />
    ),
    label: "Find Projects",
    href: "/findprojects",
  },
  {
    icon: (
      <WrenchIcon
        className="h-5 w-5"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    label: "Create Project",
    href: "/createproject",
  },
  {
    icon: (
      <RectangleStackIcon
        className="h-5 w-5"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    label: "My Projects",
    href: "/myprojects",
  },
  {
    icon: (
      <UserIcon className="h-5 w-5" style={{ width: "20px", height: "20px" }} />
    ),
    label: "Find Talent",
    href: "/findtalent",
  },

  {
    icon: (
      <Square3Stack3DIcon
        className="h-5 w-5"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Blog",
        href: "/resources/blog",
        icon: (
          <BookmarkSquareIcon
            className="h-5 w-5"
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
    ],
  },
];

export const MENU_FOOTER_DATA: MenuLinksProps[] = [
  {
    icon: (
      <LifebuoyIcon
        className="h-5 w-5"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    label: "Support",
    href: "/support",
  },
  {
    icon: (
      <Cog6ToothIcon
        className="h-5 w-5"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    label: "Settings",
    href: "/settings",
  },
];

export const session = {
  id: "2131231",
  user: {
    name: "John Doe",
    email: "johndoe@gmail.com",
    imageUrl: "https://source.unsplash.com/random",
  },
};

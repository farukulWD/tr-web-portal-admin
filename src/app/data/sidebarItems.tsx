import { DashboardIcon } from "@radix-ui/react-icons";
import { ISidebarItem } from "../types/globalTypes";

export const sidebarItem: ISidebarItem[] = [
  {
    icon: <DashboardIcon />,
    key: "Dashboard",
    type: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <DashboardIcon />,
    key: "User Management",
    type: "User Management",
    children: [
      {
        icon: <DashboardIcon />,
        key: "Create User",
        type: "Create User",
        path: "/dashboard/create-user",
      },
      {
        icon: <DashboardIcon />,
        key: "Create Admin",
        type: "Create Admin",
        path: "/dashboard/create-admin",
      },
    ],
  },
];

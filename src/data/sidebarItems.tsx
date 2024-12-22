import { DashboardIcon } from "@radix-ui/react-icons";
import { ISidebarItem } from "../app/types/globalTypes";
import { navData } from "@/types/navData";

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
      {
        icon: <DashboardIcon />,
        key: "Create Dealer",
        type: "Create Dealer",
        path: "/dashboard/create-dealer",
      },
    ],
  },
  {
    icon: <DashboardIcon />,
    key: "Product Management",
    type: "Product Management",
    children: [
      {
        icon: <DashboardIcon />,
        key: "All Product ",
        type: "All Product",
        path: "/dashboard/all-product",
      },
      {
        icon: <DashboardIcon />,
        key: "Add Product",
        type: "Add Product",
        path: "/dashboard/add-product",
      },
      {
        icon: <DashboardIcon />,
        key: "Edit Product",
        type: "Edit Product",
        path: "/dashboard/edit-product",
      },
    ],
  },
  {
    icon: <DashboardIcon />,
    key: "Order Management",
    type: "Order Management",
    children: [
      {
        icon: <DashboardIcon />,
        key: "All Order",
        type: "All Order",
        path: "/dashboard/all-order",
      },
      {
        icon: <DashboardIcon />,
        key: "Pending DO",
        type: "Pending DO",
        path: "/dashboard/pending-do",
      },
    ],
  },
];
export const data: navData[] = [
  {
    title: "Administration",
    url: "#",
    items: [
      {
        title: "Order Management",
        url: "#",
        items: [
          {
            title: "All Order",
            url: "/dashboard/admin/administration/order-management/all-order",
          },
          {
            title: "Pending DO",
            url: "/dashboard/admin/administration/order-management/pending-do",
          },
        ],
      },
      {
        title: "Damage Entry",
        url: "/dashboard/dealer/damage-entry",
      },
      {
        title: "Incentive",
        url: "/dashboard/dealer/incentive",
      },
      {
        title: "Product List",
        url: "/dashboard/dealer/product-list",
      },
      {
        title: "Undelivered",
        url: "/dashboard/dealer/undelivered",
      },
      {
        title: "View Order",
        url: "/dashboard/dealer/view-order",
      },
    ],
  },
  {
    title: "Accounts",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/dashboard/accounts/profile",
      },
      {
        title: "Bank Info",
        url: "/dashboard/accounts/bank-info",
        // isActive: true,
      },
      {
        title: "Change Password",
        url: "/dashboard/accounts/change-password",
      },
      {
        title: "Credit Info",
        url: "/dashboard/accounts/credit-info",
      },
      {
        title: "MR Info",
        url: "/dashboard/accounts/mr-info",
      },
      {
        title: "Nishchinto Fund",
        url: "/dashboard/accounts/nishchinto-fund",
      },
    ],
  },
];

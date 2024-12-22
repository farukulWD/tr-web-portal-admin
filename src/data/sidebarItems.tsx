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
        title: "Product Management",
        url: "#",
        items: [
          {
            title: "All Product",
            url: "/dashboard/admin/administration/product-management/all-product",
          },
          {
            title: "Add Product",
            url: "/dashboard/admin/administration/product-management/add-product",
          },

          {
            title: "Edit Product",
            url: "/dashboard/admin/administration/product-management/edit-product",
          },
        ],
      },
    ],
  },
];

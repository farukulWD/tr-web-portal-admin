import { navData } from "@/types/navData";

export const sideBarData: navData[] = [
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
        ],
      },
      {
        title: "User Management",
        url: "#",
        items: [
          {
            title: "All User",
            url: "/dashboard/admin/administration/user-management/all-user",
          },

          {
            title: "Add User",
            url: "/dashboard/admin/administration/user-management/add-user",
          },
        ],
      },
    ],
  },
];

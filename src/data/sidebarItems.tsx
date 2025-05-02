import { navData } from "@/types/navData";

export const sideBarData: navData[] = [
  {
    title: "Administration",
    url: "#",
    items: [
      {
        title: "Orders",
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
        title: "Undelivered",
        url: "#",
        items: [
          {
            title: "All Undelivered",
            url: "/dashboard/admin/administration/undelivered-management/all-undelivered",
          }
        ],
      },
      {
        title: "Products",
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
        title: "Users",
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
      {
        title: "Dealers",
        url: "#",
        items: [
          {
            title: "All Dealer",
            url: "/dashboard/admin/administration/dealer-management/all-dealers",
          },
        ],
      },
      {
        title: "Transactions",
        url: "#",
        items: [
          {
            title: "All Transaction",
            url: "/dashboard/admin/administration/transaction-management/all-transaction",
          },
        ],
      },
      {
        title: "NP",
        url: "#",
        items: [
          {
            title: "All NP",
            url: "/dashboard/admin/administration/np-management/all-np",
          },
          {
            title: "Create NP",
            url: "/dashboard/admin/administration/np-management/create-np",
          },
        ],
      },
    ],
  },
];

import { icon } from "leaflet";
import { MenuItem } from "./menu.model";
import { identifierName } from "@angular/compiler";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "MENUITEMS.DASHBOARD.TEXT",
    icon: "ri-home-gear-fill",
    subItems: [
      {
        id: 3,
        label: "Packaging",
        link: "/analytics",
        parentId: 2,
      },
    ],
  },
  // {
  //   id: 8,
  //     label: 'MENUITEMS.APPS.TEXT',
  //     icon: 'ri-apps-line',
  //     subItems: [
  //       {
  //         id: 9,
  //         label: 'MENUITEMS.APPS.LIST.CALENDAR',
  //         link: '/calendar',
  //         parentId: 8
  //       },
  //       {
  //         id: 10,
  //         label: 'MENUITEMS.APPS.LIST.CHAT',
  //         link: '/chat',
  //         parentId: 8
  //       },
  //       {
  //         id: 11,
  //         label: 'MENUITEMS.APPS.LIST.EMAIL',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 13,
  //             label: 'MENUITEMS.APPS.LIST.MAILBOX',
  //             link: '/mailbox',
  //             parentId: 11
  //           },
  //           {
  //             id: 14,
  //             label: 'MENUITEMS.APPS.LIST.MAILTEMPLATES',
  //             parentId: 11,
  //             subItems: [
  //               {
  //                 id: 13,
  //                 label: 'MENUITEMS.APPS.LIST.BASICACTION',
  //                 link: '/email-basic',
  //                 parentId: 14
  //               },
  //               {
  //                 id: 13,
  //                 label: 'MENUITEMS.APPS.LIST.ECOMMERCEACTION',
  //                 link: '/email-ecommerce',
  //                 parentId: 14
  //               },
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         id: 12,
  //         label: 'MENUITEMS.APPS.LIST.ECOMMERCE',
  //         link: '/mailbox',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 13,
  //             label: 'MENUITEMS.APPS.LIST.PRODUCTS',
  //             link: '/ecommerce/products',
  //             parentId: 12
  //           },
  //           {
  //             id: 14,
  //             label: 'MENUITEMS.APPS.LIST.PRODUCTDETAILS',
  //             link: '/ecommerce/product-detail/1',
  //             parentId: 12
  //           },
  //           {
  //             id: 15,
  //             label: 'MENUITEMS.APPS.LIST.CREATEPRODUCT',
  //             link: '/ecommerce/add-product',
  //             parentId: 12
  //           },
  //           {
  //             id: 16,
  //             label: 'MENUITEMS.APPS.LIST.ORDERS',
  //             link: '/ecommerce/orders',
  //             parentId: 12
  //           },
  //           {
  //             id: 17,
  //             label: 'MENUITEMS.APPS.LIST.ORDERDETAILS',
  //             link: '/ecommerce/order-details',
  //             parentId: 12
  //           },
  //           {
  //             id: 18,
  //             label: 'MENUITEMS.APPS.LIST.CUSTOMERS',
  //             link: '/ecommerce/customers',
  //             parentId: 12
  //           },
  //           {
  //             id: 19,
  //             label: 'MENUITEMS.APPS.LIST.SHOPPINGCART',
  //             link: '/ecommerce/cart',
  //             parentId: 12
  //           },
  //           {
  //             id: 20,
  //             label: 'MENUITEMS.APPS.LIST.CHECKOUT',
  //             link: '/ecommerce/checkout',
  //             parentId: 12
  //           },
  //           {
  //             id: 21,
  //             label: 'MENUITEMS.APPS.LIST.SELLERS',
  //             link: '/ecommerce/sellers',
  //             parentId: 12
  //           },
  //           {
  //             id: 22,
  //             label: 'MENUITEMS.APPS.LIST.SELLERDETAILS',
  //             link: '/ecommerce/seller-details',
  //             parentId: 12
  //           }
  //         ]
  //       },
  //       {
  //         id: 23,
  //         label: 'MENUITEMS.APPS.LIST.PROJECTS',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 24,
  //             label: 'MENUITEMS.APPS.LIST.LIST',
  //             link: '/projects/list',
  //             parentId: 23
  //           },
  //           {
  //             id: 25,
  //             label: 'MENUITEMS.APPS.LIST.OVERVIEW',
  //             link: '/projects/overview',
  //             parentId: 23
  //           },
  //           {
  //             id: 26,
  //             label: 'MENUITEMS.APPS.LIST.CREATEPROJECT',
  //             link: '/projects/create',
  //             parentId: 23
  //           }
  //         ]
  //       },
  //       {
  //         id: 27,
  //         label: 'MENUITEMS.APPS.LIST.TASK',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 28,
  //             label: 'MENUITEMS.APPS.LIST.KANBANBOARD',
  //             link: '/tasks/kanban',
  //             parentId: 27
  //           },
  //           {
  //             id: 29,
  //             label: 'MENUITEMS.APPS.LIST.LISTVIEW',
  //             link: '/tasks/list-view',
  //             parentId: 27
  //           },
  //           {
  //             id: 30,
  //             label: 'MENUITEMS.APPS.LIST.TASKDETAILS',
  //             link: '/tasks/details',
  //             parentId: 27
  //           }
  //         ]
  //       },
  //       {
  //         id: 31,
  //         label: 'MENUITEMS.APPS.LIST.CRM',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 32,
  //             label: 'MENUITEMS.APPS.LIST.CONTACTS',
  //             link: '/crm/contacts',
  //             parentId: 31
  //           },
  //           {
  //             id: 33,
  //             label: 'MENUITEMS.APPS.LIST.COMPANIES',
  //             link: '/crm/companies',
  //             parentId: 31
  //           },
  //           {
  //             id: 34,
  //             label: 'MENUITEMS.APPS.LIST.DEALS',
  //             link: '/crm/deals',
  //             parentId: 31
  //           },
  //           {
  //             id: 35,
  //             label: 'MENUITEMS.APPS.LIST.LEADS',
  //             link: '/crm/leads',
  //             parentId: 31
  //           }
  //         ]
  //       },
  //       {
  //         id: 36,
  //         label: 'MENUITEMS.APPS.LIST.CRYPTO',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 37,
  //             label: 'MENUITEMS.APPS.LIST.TRANSACTIONS',
  //             link: '/crypto/transactions',
  //             parentId: 36
  //           },
  //           {
  //             id: 38,
  //             label: 'MENUITEMS.APPS.LIST.BUY&SELL',
  //             link: '/crypto/buy-sell',
  //             parentId: 36
  //           },
  //           {
  //             id: 38,
  //             label: 'MENUITEMS.APPS.LIST.ORDERS',
  //             link: '/crypto/orders',
  //             parentId: 36
  //           },
  //           {
  //             id: 39,
  //             label: 'MENUITEMS.APPS.LIST.MYWALLET',
  //             link: '/crypto/wallet',
  //             parentId: 36
  //           },
  //           {
  //             id: 40,
  //             label: 'MENUITEMS.APPS.LIST.ICOLIST',
  //             link: '/crypto/ico',
  //             parentId: 36
  //           },
  //           {
  //             id: 41,
  //             label: 'MENUITEMS.APPS.LIST.KYCAPPLICATION',
  //             link: '/crypto/kyc',
  //             parentId: 36
  //           }
  //         ]
  //       },
  //       {
  //         id: 42,
  //         label: 'MENUITEMS.APPS.LIST.INVOICES',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 43,
  //             label: 'MENUITEMS.APPS.LIST.LISTVIEW',
  //             link: '/invoices/list',
  //             parentId: 42
  //           },
  //           {
  //             id: 44,
  //             label: 'MENUITEMS.APPS.LIST.DETAILS',
  //             link: '/invoices/details',
  //             parentId: 42
  //           },
  //           {
  //             id: 45,
  //             label: 'MENUITEMS.APPS.LIST.CREATEINVOICE',
  //             link: '/invoices/create',
  //             parentId: 42
  //           }
  //         ]
  //       },
  //       {
  //         id: 46,
  //         label: 'MENUITEMS.APPS.LIST.SUPPORTTICKETS',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 47,
  //             label: 'MENUITEMS.APPS.LIST.LISTVIEW',
  //             link: '/tickets/list',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.TICKETDETAILS',
  //             link: '/tickets/details',
  //             parentId: 46
  //           }
  //         ]
  //       },
  //       {
  //         id: 46,
  //         label: 'MENUITEMS.APPS.LIST.NFTMARKETPLACE',
  //         parentId: 8,
  //         subItems: [
  //           {
  //             id: 47,
  //             label: 'MENUITEMS.APPS.LIST.MARKETPLACE',
  //             link: '/marletplace/marketplace',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.EXPLORENOW',
  //             link: '/marletplace/explore',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.LIVEAUCTION',
  //             link: '/marletplace/auction',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.ITEMDETAILS',
  //             link: '/marletplace/item-details',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.COLLECTIONS',
  //             link: '/marletplace/collections',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.CREATORS',
  //             link: '/marletplace/creators',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.RANKING',
  //             link: '/marletplace/raking',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.WALLETCONNECT',
  //             link: '/marletplace/wallet',
  //             parentId: 46
  //           },
  //           {
  //             id: 48,
  //             label: 'MENUITEMS.APPS.LIST.CREATENFT',
  //             link: '/marletplace/create',
  //             parentId: 46
  //           },
  //         ]
  //       },
  //       {
  //         id: 49,
  //         label: 'MENUITEMS.APPS.LIST.FILEMANAGER',
  //         link: '/file-manager',
  //         parentId: 8,
  //       },
  //       {
  //         id: 50,
  //         label: 'MENUITEMS.APPS.LIST.TODO',
  //         link: '/todo',
  //         parentId: 8,
  //       },
  //       {
  //         id: 51,
  //         label: 'MENUITEMS.APPS.LIST.JOBS',
  //         parentId: 8,
  //         badge: {
  //           variant: 'bg-success',
  //           text: 'MENUITEMS.DASHBOARD.BADGE',
  //         },
  //         subItems: [
  //           {
  //             id: 52,
  //             label: 'MENUITEMS.APPS.LIST.STATISTICS',
  //             link: '/jobs/statistics',
  //             parentId: 51
  //           },
  //           {
  //             id: 53,
  //             label: 'MENUITEMS.APPS.LIST.JOBLISTS',
  //             subItems: [
  //               {
  //                 id: 54,
  //                 label: 'MENUITEMS.APPS.LIST.LIST',
  //                 link: '/jobs/list',
  //                 parentId: 53
  //               },
  //               {
  //                 id: 55,
  //                 label: 'MENUITEMS.APPS.LIST.GRID',
  //                 link: '/jobs/grid',
  //                 parentId: 53
  //               },
  //               {
  //                 id: 56,
  //                 label: 'MENUITEMS.APPS.LIST.OVERVIEW',
  //                 link: '/jobs/overview',
  //                 parentId: 53
  //               }
  //             ]
  //           },
  //           {
  //             id: 57,
  //             label: 'MENUITEMS.APPS.LIST.CANDIDATELISTS',
  //             subItems: [
  //               {
  //                 id: 58,
  //                 label: 'MENUITEMS.APPS.LIST.LISTVIEW',
  //                 link: '/jobs/listview',
  //                 parentId: 57
  //               },
  //               {
  //                 id: 59,
  //                 label: 'MENUITEMS.APPS.LIST.GRIDVIEW',
  //                 link: '/jobs/gridview',
  //                 parentId: 57
  //               }
  //             ]
  //           },
  //           {
  //             id: 60,
  //             label: 'MENUITEMS.APPS.LIST.APPLICATION',
  //             link: '/jobs/application',
  //             parentId: 51
  //           },
  //           {
  //             id: 61,
  //             label: 'MENUITEMS.APPS.LIST.NEWJOB',
  //             link: '/jobs/newjob',
  //             parentId: 51
  //           },
  //           {
  //             id: 62,
  //             label: 'MENUITEMS.APPS.LIST.COMPANIESLIST',
  //             link: '/jobs/companies-list',
  //             parentId: 51
  //           },
  //           {
  //             id: 63,
  //             label: 'MENUITEMS.APPS.LIST.JOBCATEGORIES',
  //             link: '/jobs/job-categories',
  //             parentId: 51
  //           },
  //         ]
  //       },
  //       {
  //         id: 64,
  //         label: 'MENUITEMS.APPS.LIST.APIKEY',
  //         link: '/apikey',
  //         parentId: 8,
  //         badge: {
  //           variant: 'bg-success',
  //           text: 'MENUITEMS.DASHBOARD.BADGE',
  //         },
  //       },
  //     ]
  //   },
  {
    id: 54,
    label: "INPUT",
    isTitle: true,
  },
  {
    id: 55,
    label: "Supplier",
    icon: "ri-slack-line",
    subItems: [
      {
        id: 56,
        label: "Upload",
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: "Document",
            link: "/pdf",
            parentId: 56,
          },
          {
            id: 58,
            label: "Logo & status",
            link: "/supplier-info",
            parentId: 56,
          }
          //     {
          //       id: 58,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
          //       link: '/auth/signin/cover',
          //       parentId: 56
          //     },
          //   ]
          // },
          // {
          //   id: 59,
          //   label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNUP',
          //   parentId: 49,
          //   subItems: [
          //     {
          //       id: 60,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
          //       link: '/auth/signup/basic',
          //       parentId: 59
          //     },
          //     {
          //       id: 61,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
          //       link: '/auth/signup/cover',
          //       parentId: 59
          //     },
          //   ]
          // },
          // {
          //   id: 62,
          //   label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDRESET',
          //   parentId: 49,
          //   subItems: [
          //     {
          //       id: 63,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
          //       link: '/auth/pass-reset/basic',
          //       parentId: 62
          //     },
          //     {
          //       id: 64,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
          //       link: '/auth/pass-reset/cover',
          //       parentId: 62
          //     },
          //   ]
          // },
          // {
          //   id: 62,
          //   label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDCREATE',
          //   parentId: 49,
          //   subItems: [
          //     {
          //       id: 63,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
          //       link: '/auth/pass-create/basic',
          //       parentId: 62
          //     },
          //     {
          //       id: 64,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
          //       link: '/auth/pass-create/cover',
          //       parentId: 62
          //     },
          //   ]
          // },
          // {
          //   id: 65,
          //   label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
          //   parentId: 49,
          //   subItems: [
          //     {
          //       id: 66,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
          //       link: '/auth/lockscreen/basic',
          //       parentId: 65
          //     },
          //     {
          //       id: 67,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
          //       link: '/auth/lockscreen/cover',
          //       parentId: 65
          //     },
          //   ]
          // },
          // {
          //   id: 68,
          //   label: 'MENUITEMS.AUTHENTICATION.LIST.LOGOUT',
          //   parentId: 49,
          //   subItems: [
          //     {
          //       id: 69,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
          //       link: '/auth/logout/basic',
          //       parentId: 68
          //     },
          //     {
          //       id: 70,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
          //       link: '/auth/logout/cover',
          //       parentId: 68
          //     },
          //   ]
          // },
          // {
          //   id: 71,
          //   label: 'MENUITEMS.AUTHENTICATION.LIST.SUCCESSMESSAGE',
          //   parentId: 49,
          //   subItems: [
          //     {
          //       id: 72,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
          //       link: '/auth/success-msg/basic',
          //       parentId: 71
          //     },
          //     {
          //       id: 73,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
          //       link: '/auth/success-msg/cover',
          //       parentId: 71
          //     },
          //   ]
          // },
          // {
          //   id: 74,
          //   label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
          //   parentId: 49,
          //   subItems: [
          //     {
          //       id: 75,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
          //       link: '/auth/twostep/basic',
          //       parentId: 74
          //     },
          //     {
          //       id: 76,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
          //       link: '/auth/twostep/cover',
          //       parentId: 74
          //     },
          //   ]
          // },
          // {
          //   id: 77,
          //   label: 'MENUITEMS.AUTHENTICATION.LIST.ERRORS',
          //   parentId: 49,
          //   subItems: [
          //     {
          //       id: 78,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.404BASIC',
          //       link: '/auth/errors/404-basic',
          //       parentId: 77
          //     },
          //     {
          //       id: 79,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.404COVER',
          //       link: '/auth/errors/404-cover',
          //       parentId: 77
          //     },
          //     {
          //       id: 80,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.404ALT',
          //       link: '/auth/errors/404-alt',
          //       parentId: 77
          //     },
          //     {
          //       id: 81,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.500',
          //       link: '/auth/errors/page-500',
          //       parentId: 77
          //     },
          //     {
          //       id: 81,
          //       label: 'MENUITEMS.AUTHENTICATION.LIST.OFFLINE',
          //       link: '/auth/errors/offline',
          //       parentId: 77
          //     },
        ],
      },
    ],
  },
  {
    id: 55,
    label: "Material",
    icon: "ri-table-line",
    subItems: [
      {
        id: 56,
        label: "Document",
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: "PDF",
            link: "/crm",
            parentId: 56,
          },
        ],
      },
    ],
  },
  {
    id: 55,
    label: "Procurement",
    icon: "ri-store-2-fill",
    subItems: [
      {
        id: 56,
        label: "Document",
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: "PDF",
            link: "/crm",
            parentId: 56,
          },
        ],
      },
    ],
  },
  {
    id: 55,
    label: "Technical",
    icon: "ri-mini-program-line",
    subItems: [
      {
        id: 56,
        label: "Document",
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: "PDF",
            link: "/crm",
            parentId: 56,
          },
        ],
      },
    ],
  },
  {
    id: 55,
    label: "Logistics",
    icon: "ri-truck-line",
    subItems: [
      {
        id: 56,
        label: "Document",
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: "PDF",
            link: "/crm",
            parentId: 56,
          },
        ],
      },
    ],
  },
  {
    id: 55,
    label: "Process",
    icon: "ri-loader-3-line",
    subItems: [
      {
        id: 56,
        label: "Document",
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: "PDF",
            link: "/crm",
            parentId: 56,
          },
        ],
      },
    ],
  },
  {
    id: 55,
    label: "System",
    icon: "ri-settings-2-line",
    subItems: [
      {
        id: 56,
        label: "Document",
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: "PDF",
            link: "/crm",
            parentId: 56,
          },
        ],
      },
    ],
  },

  {
    id: 169,
    label: "MENUITEMS.ICONS.TEXT",
    icon: "bx bx-buoy",
    subItems: [
      {
        id: 170,
        label: "MENUITEMS.ICONS.LIST.REMIX",
        link: "/icons/remix",
        parentId: 169,
      },
      {
        id: 171,
        label: "MENUITEMS.ICONS.LIST.BOXICONS",
        link: "/icons/boxicons",
        parentId: 169,
      },
      {
        id: 172,
        label: "MENUITEMS.ICONS.LIST.MATERIALDESIGN",
        link: "/icons/materialdesign",
        parentId: 169,
      },
      {
        id: 173,
        label: "MENUITEMS.ICONS.LIST.LINEAWESOME",
        link: "/icons/lineawesome",
        parentId: 169,
      },
      {
        id: 174,
        label: "MENUITEMS.ICONS.LIST.FEATHER",
        link: "/icons/feather",
        parentId: 169,
      },
      {
        id: 174,
        label: "MENUITEMS.ICONS.LIST.CRYPTOSVG",
        link: "/icons/icons-crypto",
        parentId: 169,
        badge: {
          variant: "bg-danger",
          text: "MENUITEMS.DASHBOARD.BADGE",
        },
      },
    ],
  },
  //   {
  //     id: 175,
  //     label: 'MENUITEMS.MAPS.TEXT',
  //     icon: 'map-pin',
  //     subItems: [
  //       {
  //         id: 176,
  //         label: 'MENUITEMS.MAPS.LIST.GOOGLE',
  //         link: '/maps/google',
  //         parentId: 175
  //       },
  //       {
  //         id: 178,
  //         label: 'MENUITEMS.MAPS.LIST.LEAFLET',
  //         link: '/maps/leaflet',
  //         parentId: 175
  //       }
  //     ]
  //   },
  //   {
  //     id: 179,
  //     label: 'MENUITEMS.MULTILEVEL.TEXT',
  //     icon: 'share-2',
  //     subItems: [
  //       {
  //         id: 180,
  //         label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
  //         parentId: 179
  //       },
  //       {
  //         id: 181,
  //         label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
  //         subItems: [
  //           {
  //             id: 182,
  //             label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
  //             parentId: 181,
  //           },
  //           {
  //             id: 183,
  //             label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
  //             parentId: 181,
  //           }
  //         ]
  //       },
  //     ]
  //   }
];

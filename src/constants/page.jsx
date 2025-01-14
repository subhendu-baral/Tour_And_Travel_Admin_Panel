import {
  Gauge,
  Users,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const navmenu = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Gauge,
      isActive: false,
      group:'dashboard'
    },
    {
      title: "User Management",
    //   url: "#",
      icon: Users,
      group:'user',
      items: [
        {
          title: "Manage Users",
          url: "/admin/user/all-users",
        },
        {
          title: "Manage Roles",
          url: "/admin/user/roles",
        },
        {
          title: "Manage Permissions",
          url: "/admin/user/permissions",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]

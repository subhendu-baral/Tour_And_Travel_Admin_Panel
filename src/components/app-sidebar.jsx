"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  PlusCircle,
  ListOrdered,
  Users,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  User,
  BookUser,
  ChartNetwork
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },

//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }

import { navmenu } from "@/constants/page";

export function AppSidebar({ ...props }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState({
    tours: true,
    users: true,
    settings: false,
  });

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Map className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Tour Admin</span>
                  <span className="text-xs text-muted-foreground">
                    Management Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/dashboard"}
              >
                <Link href="/admin/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Tours Management */}
        <SidebarGroup>
          <Collapsible
            open={openGroups.tours}
            onOpenChange={() => toggleGroup("tours")}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer">
                <span>Tour Management</span>
                <ChevronDown
                  className={cn(
                    "ml-auto h-4 w-4 transition-transform",
                    openGroups.tours ? "rotate-180" : ""
                  )}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/admin/tours"}
                    >
                      <Link href="/admin/tours">
                        <ListOrdered className="h-4 w-4" />
                        <span>All Tours</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/admin/add-tour"}
                    >
                      <Link href="/admin/tour/add-tour">
                        <PlusCircle className="h-4 w-4" />
                        <span>Add New Tour</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/tour-categories">
                        <Map className="h-4 w-4" />
                        <span>Categories</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/tour-reviews">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reviews</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/admin/tour-reviews/pending">
                            Pending Reviews
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/admin/tour-reviews/approved">
                            Approved Reviews
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/admin/tour-reviews/rejected">
                            Rejected Reviews
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* User Management */}
        <SidebarGroup>
          <Collapsible
            open={openGroups.users}
            onOpenChange={() => toggleGroup("users")}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer">
                <span>User Management</span>
                <ChevronDown
                  className={cn(
                    "ml-auto h-4 w-4 transition-transform",
                    openGroups.users ? "rotate-180" : ""
                  )}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/user/all-users">
                        <Users className="h-4 w-4" />
                        <span>All Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/roles">
                        <BookUser className="h-4 w-4" />
                        <span>Roles</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/permissions">
                        <ChartNetwork className="h-4 w-4" />
                        <span>Permissions</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <Collapsible
            open={openGroups.settings}
            onOpenChange={() => toggleGroup("settings")}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer">
                <span>Settings</span>
                <ChevronDown
                  className={cn(
                    "ml-auto h-4 w-4 transition-transform",
                    openGroups.settings ? "rotate-180" : ""
                  )}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/settings/general">
                        <Settings className="h-4 w-4" />
                        <span>General Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/settings/appearance">
                        <Settings className="h-4 w-4" />
                        <span>Appearance</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Help */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/help">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Admin User"
                  />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Admin User</span>
                  <span className="text-xs text-muted-foreground">
                    admin@example.com
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/admin/profile">
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/admin/logout">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

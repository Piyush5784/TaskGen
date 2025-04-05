"use client";

import {
  ArrowUpCircleIcon,
  BellIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  Loader,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  fetchAllOrganisations,
  fetchSelectedOrganisation,
} from "@/store/slices/organisation/org-functions";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import CheckOrganisationStatus from "./check-org";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { AppDispatch } from "@/store";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderIcon,
    },
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      icon: ListIcon,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: UsersIcon,
    },
  ],
  navSecondary: [
    {
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: BellIcon,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "/dashboard/get-help",
      icon: HelpCircleIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { status, data: user } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllOrganisations());
      await dispatch(fetchSelectedOrganisation());
    };
    fetchData();
  }, [dispatch]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div>
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">
                  {status === "authenticated" ? (
                    <CheckOrganisationStatus />
                  ) : (
                    <Loader />
                  )}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

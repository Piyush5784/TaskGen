import { MailIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { QuickCreate } from "./quick-create-dialog";
import Link from "next/link";
import SidebarLink from "./sidebar-link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 ">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <QuickCreate />
            <Button
              asChild
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <Link href={"/dashboard/notifications"}>
                <MailIcon />
                <span className="sr-only">Inbox</span>
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarLink items={items} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

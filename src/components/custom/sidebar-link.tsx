"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import clsx from "clsx";

interface SidebarLinkProps {
  items: {
    url: string;
    icon?: React.ComponentType;
    title: string;
  }[];
}

const SidebarLink = ({ items }: SidebarLinkProps) => {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem
          key={item.title}
          className="hover:bg-white/10  rounded-md"
        >
          <SidebarMenuButton asChild tooltip={item.title}>
            <Link
              href={item.url}
              className={clsx("", {
                "bg-foreground/10": pathname === item.url,
              })}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default SidebarLink;

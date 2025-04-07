import { SidebarTrigger } from "@/components/ui/sidebar";
import BreadcrumbsHeader from "./BreadCrumb-header";
import { Separator } from "../ui/separator";

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <BreadcrumbsHeader />
      </div>
    </header>
  );
}

import { ChartAreaInteractive } from "@/components/custom/chart-area";
import { DataTable } from "@/components/custom/data-table";
import { SectionCards } from "@/components/custom/section-cards";
import { SiteHeader } from "@/components/custom/side-header";
import { AppSidebar } from "@/components/custom/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "@/lib/data.json";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
                {/* <SectionCards /> */}
                <div className="px-4 lg:px-6">
                  {/* <ChartAreaInteractive /> */}
                </div>
                {/* <DataTable data={data} /> */}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>{" "}
    </SidebarProvider>
  );
}

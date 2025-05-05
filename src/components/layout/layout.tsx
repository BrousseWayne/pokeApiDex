import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Breadcrumbs } from "./breadcrumbs";
import { AppSidebar } from "./sidebar";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="app-layout">
        <AppSidebar />
        <div className="content-area">
          <div className="app-header">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          <main className="app-content">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

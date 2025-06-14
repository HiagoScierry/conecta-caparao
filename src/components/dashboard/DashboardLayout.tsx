
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

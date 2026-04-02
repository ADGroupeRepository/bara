import { ModuleNav } from "@/components/layout/module-nav/module-nav"
import { SidebarProvider } from "@/components/layout/sidebar/sidebar-context"

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white dark:bg-slate-950 overflow-hidden">
        <ModuleNav />
        <div className="flex-1 min-w-0 h-full overflow-hidden">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

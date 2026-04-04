"use client"

import { ModuleSideNav } from "@/components/layout/sidebar/module-side-nav"
import { useSidebar } from "@/components/layout/sidebar/sidebar-context"
import type { ModuleConfig } from "@/lib/modules"

export function GenericModuleLayout({
  module,
  children,
}: {
  readonly module: ModuleConfig
  readonly children: React.ReactNode
}) {
  const { isLandingMode } = useSidebar()

  return (
    <div className="flex flex-1 h-screen overflow-hidden min-w-0">
      {!isLandingMode && <ModuleSideNav module={module} />}
      <main className="flex-1 flex flex-col h-screen relative min-w-0">
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden h-full w-full">
          {children}
        </div>
      </main>
    </div>
  )
}

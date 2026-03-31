"use client"

import { ModuleSideNav } from "@/components/layout/sidebar/module-side-nav"
import type { ModuleConfig } from "@/lib/modules"

export function GenericModuleLayout({
  module,
  children,
}: {
  readonly module: ModuleConfig
  readonly children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      <ModuleSideNav module={module} />
      <main className="flex-1 flex flex-col h-screen relative">
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto h-full w-full">{children}</div>
      </main>
    </div>
  )
}

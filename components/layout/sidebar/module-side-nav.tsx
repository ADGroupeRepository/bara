"use client"

import Link from "next/link"
import Image from "next/image"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModuleSidebarLinks } from "./module-sidebar-links"
import type { ModuleConfig } from "@/lib/modules"

interface ModuleSideNavProps {
  module: ModuleConfig
}

export function ModuleSideNav({ module }: ModuleSideNavProps) {
  return (
    <>
      <div className="h-screen min-w-[250px]" />

      <nav className="fixed left-[72px] top-0 z-30 h-screen min-w-[250px] overflow-y-auto border-r bg-background px-4 py-4">
        <div className="flex h-full flex-col">
          <Link href={`/${module.slug}`} className="flex items-center gap-x-2">
            <Image
              src="/logo.png"
              width={160}
              height={160}
              alt="Commission Nationale de la Francophonie"
              priority
            />
          </Link>

          {module.primaryAction && (
            <div className="py-4">
              <Link href={module.primaryAction.href}>
                <Button size="lg" className="h-11 w-full font-semibold">
                  <PlusCircle className="size-5" />
                  {module.primaryAction.label}
                </Button>
              </Link>
            </div>
          )}

          <ModuleSidebarLinks module={module} />
        </div>
      </nav>
    </>
  )
}

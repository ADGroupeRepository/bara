"use client"

import { GenericModuleLayout } from "@/components/layout/generic-module-layout"
import { getModuleBySlug } from "@/lib/modules"

const moduleConfig = getModuleBySlug("ged")!

export default function GedLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return <GenericModuleLayout module={moduleConfig}>{children}</GenericModuleLayout>
}

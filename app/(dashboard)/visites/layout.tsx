"use client"

import { GenericModuleLayout } from "@/components/layout/generic-module-layout"
import { getModuleBySlug } from "@/lib/modules"

const moduleConfig = getModuleBySlug("visites")!

export default function VisitesLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return <GenericModuleLayout module={moduleConfig}>{children}</GenericModuleLayout>
}

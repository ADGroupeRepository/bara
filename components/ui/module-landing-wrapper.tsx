"use client"

import { useEffect } from "react"
import { useSidebar } from "@/components/layout/sidebar/sidebar-context"
import { ModuleLandingPage } from "./module-landing-page"
import { moduleLandingData } from "@/lib/module-landing-data"
import { ModuleIcons } from "@/components/layout/sidebar/icons"

interface ModuleLandingWrapperProps {
  readonly moduleSlug: string
  readonly children: React.ReactNode
}

export function ModuleLandingWrapper({
  moduleSlug,
  children,
}: ModuleLandingWrapperProps) {
  const { isLandingMode, setIsLandingMode } = useSidebar()
  const content = moduleLandingData[moduleSlug]
  const Icon = ModuleIcons[moduleSlug]

  // Automatically activate landing mode when this root page is visited
  useEffect(() => {
    // Only set to true if it's currently false (e.g. initial navigation to root)
    // Actually, we usually want it true when hitting the /module root.
    setIsLandingMode(true)
  }, [setIsLandingMode])

  if (isLandingMode && content && Icon) {
    return (
      <ModuleLandingPage
        moduleName={content.moduleName}
        description={content.description}
        benefits={content.benefits}
        icon={Icon}
        onAccess={() => setIsLandingMode(false)}
      />
    )
  }

  return <>{children}</>
}

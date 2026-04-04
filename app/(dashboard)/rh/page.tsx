"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"
import { ModuleLandingWrapper } from "@/components/ui/module-landing-wrapper"

export default function RhPage() {
  return (
    <ModuleLandingWrapper moduleSlug="rh">
      <ModuleHomepage
        moduleName="Ressources Humaines"
        searchPlaceholder="Rechercher un collaborateur..."
        description="Gérez le personnel, les congés et l'organisation de votre structure"
        accentColor="violet"
      />
    </ModuleLandingWrapper>
  )
}

"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"
import { ModuleLandingWrapper } from "@/components/ui/module-landing-wrapper"

export default function GedPage() {
  return (
    <ModuleLandingWrapper moduleSlug="ged">
      <ModuleHomepage
        moduleName="Gestion Documentaire"
        searchPlaceholder="Rechercher un document..."
        description="Stockez, organisez et partagez vos documents en toute sécurité"
        accentColor="emerald"
      />
    </ModuleLandingWrapper>
  )
}

"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"
import { ModuleLandingWrapper } from "@/components/ui/module-landing-wrapper"

export default function ProjetsPage() {
  return (
    <ModuleLandingWrapper moduleSlug="projets">
      <ModuleHomepage
        moduleName="Gestion de Projets"
        searchPlaceholder="Rechercher un projet..."
        description="Planifiez, suivez et collaborez sur vos projets d'équipe"
        accentColor="indigo"
      />
    </ModuleLandingWrapper>
  )
}

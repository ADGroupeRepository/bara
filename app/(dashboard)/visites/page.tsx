"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"
import { ModuleLandingWrapper } from "@/components/ui/module-landing-wrapper"

export default function VisitesPage() {
  return (
    <ModuleLandingWrapper moduleSlug="visites">
      <ModuleHomepage
        moduleName="Gestion des Visites"
        searchPlaceholder="Rechercher une visite..."
        description="Planifiez et suivez vos visites terrain et déplacements"
        accentColor="teal"
      />
    </ModuleLandingWrapper>
  )
}

"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"
import { ModuleLandingWrapper } from "@/components/ui/module-landing-wrapper"

export default function ReferentielPage() {
  return (
    <ModuleLandingWrapper moduleSlug="referentiel">
      <ModuleHomepage
        moduleName="Référentiel de Données"
        searchPlaceholder="Rechercher dans le référentiel..."
        description="Consultez et gérez les données de référence de votre organisation"
        accentColor="amber"
      />
    </ModuleLandingWrapper>
  )
}

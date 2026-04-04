"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"
import { ModuleLandingWrapper } from "@/components/ui/module-landing-wrapper"

export default function AchatsPage() {
  return (
    <ModuleLandingWrapper moduleSlug="achats">
      <ModuleHomepage
        moduleName="Gestion des Achats"
        searchPlaceholder="Rechercher une commande..."
        description="Suivez vos commandes, fournisseurs et budgets d'achat"
        accentColor="orange"
      />
    </ModuleLandingWrapper>
  )
}

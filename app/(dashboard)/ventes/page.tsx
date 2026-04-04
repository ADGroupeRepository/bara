"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"
import { ModuleLandingWrapper } from "@/components/ui/module-landing-wrapper"

export default function VentesPage() {
  return (
    <ModuleLandingWrapper moduleSlug="ventes">
      <ModuleHomepage
        moduleName="Gestion des Ventes"
        searchPlaceholder="Rechercher un devis ou une facture..."
        description="Gérez vos devis, factures, clients et suivi commercial"
        accentColor="rose"
      />
    </ModuleLandingWrapper>
  )
}

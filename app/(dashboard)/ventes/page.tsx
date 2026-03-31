"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"

export default function VentesPage() {
  return (
    <ModuleHomepage
      moduleName="Gestion des Ventes"
      searchPlaceholder="Rechercher un devis ou une facture..."
      description="Gérez vos devis, factures, clients et suivi commercial"
      accentColor="rose"
    />
  )
}

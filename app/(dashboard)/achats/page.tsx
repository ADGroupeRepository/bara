"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"

export default function AchatsPage() {
  return (
    <ModuleHomepage
      moduleName="Gestion des Achats"
      searchPlaceholder="Rechercher une commande..."
      description="Suivez vos commandes, fournisseurs et budgets d'achat"
      accentColor="orange"
    />
  )
}

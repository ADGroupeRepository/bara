"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"

export default function ReferentielPage() {
  return (
    <ModuleHomepage
      moduleName="Référentiel de Données"
      searchPlaceholder="Rechercher dans le référentiel..."
      description="Consultez et gérez les données de référence de votre organisation"
      accentColor="amber"
    />
  )
}

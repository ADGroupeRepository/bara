"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"

export default function ProjetsPage() {
  return (
    <ModuleHomepage
      moduleName="Gestion de Projets"
      searchPlaceholder="Rechercher un projet..."
      description="Planifiez, suivez et collaborez sur vos projets d'équipe"
      accentColor="indigo"
    />
  )
}

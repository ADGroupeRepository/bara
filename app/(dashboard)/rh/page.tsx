"use client"

import { ModuleHomepage } from "@/components/ui/module-homepage"

export default function RhPage() {
  return (
    <ModuleHomepage
      moduleName="Ressources Humaines"
      searchPlaceholder="Rechercher un employé..."
      description="Gérez le personnel, les congés et l'organisation de votre structure"
      accentColor="violet"
    />
  )
}

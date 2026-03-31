"use client"

import { PagePlaceholder } from "@/components/ui/page-placeholder"
import { Settings } from "lucide-react"

export default function RhSettingsPage() {
  return (
    <PagePlaceholder
      title="Paramètres RH"
      description="Configurez les règles de gestion du personnel, les types de congés et les paramètres de paie."
      icon={Settings}
    />
  )
}

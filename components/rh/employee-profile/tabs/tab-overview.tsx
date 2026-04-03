"use client"

import {
  Calendar,
  MapPin,
  Globe,
  Users,
  Heart,
  Phone,
  Mail,
  Home,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import type { EmployeeProfile } from "../mock-data"

type TabOverviewProps = {
  readonly employee: EmployeeProfile
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  readonly icon: React.ElementType
  readonly label: string
  readonly value: string | number | undefined
}) {
  if (!value && value !== 0) return null
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

export function TabOverview({ employee }: TabOverviewProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Informations Personnelles */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Personnelles</CardTitle>
          <CardDescription>Identité et état civil</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InfoRow icon={Users} label="Civilité" value={employee.civilite} />
          <InfoRow icon={Users} label="Genre" value={employee.genre} />
          <InfoRow
            icon={Calendar}
            label="Date de naissance"
            value={employee.dateNaissance}
          />
          <InfoRow
            icon={MapPin}
            label="Lieu de naissance"
            value={employee.lieuNaissance}
          />
          <InfoRow
            icon={Globe}
            label="Nationalité"
            value={employee.nationalite}
          />
          <InfoRow
            icon={Heart}
            label="Situation matrimoniale"
            value={employee.situationMatrimoniale}
          />
          <InfoRow
            icon={Users}
            label="Nombre d'enfants"
            value={employee.nombreEnfants}
          />
        </CardContent>
      </Card>

      {/* Coordonnées */}
      <Card>
        <CardHeader>
          <CardTitle>Coordonnées</CardTitle>
          <CardDescription>Adresse et informations de contact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow
            icon={Home}
            label="Adresse"
            value={[employee.adresse, employee.ville, employee.pays]
              .filter(Boolean)
              .join(", ")}
          />
          {employee.codePostal && (
            <InfoRow icon={MapPin} label="Code postal" value={employee.codePostal} />
          )}

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow
              icon={Phone}
              label="Téléphone personnel"
              value={employee.telephonePersonnel}
            />
            <InfoRow
              icon={Phone}
              label="Téléphone professionnel"
              value={employee.telephoneProfessionnel}
            />
            <InfoRow
              icon={Mail}
              label="Email personnel"
              value={employee.emailPersonnel}
            />
            <InfoRow
              icon={Mail}
              label="Email professionnel"
              value={employee.emailProfessionnel}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

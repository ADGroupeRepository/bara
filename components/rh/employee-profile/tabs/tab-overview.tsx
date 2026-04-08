"use client"

import {
  Calendar,
  MapPin,
  Globe,
  Users,
  User,
  ShieldCheck,
  Briefcase,
  Building2,
  Trophy,
  FileText,
  Hash,
  Clock,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { EmployeeProfile } from "../mock-data"

type TabOverviewProps = {
  readonly employee: EmployeeProfile
}

function InfoRow({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  readonly icon: React.ElementType
  readonly label: string
  readonly value: string | number | undefined
  readonly subValue?: string
}) {
  if (!value && value !== 0) return null
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
        {subValue && (
          <p className="mt-0.5 text-[10px] text-muted-foreground">{subValue}</p>
        )}
      </div>
    </div>
  )
}

export function TabOverview({ employee }: TabOverviewProps) {
  return (
    <ScrollArea className="h-full">
      <div className="grid gap-6 lg:grid-cols-2 pb-6">
        {/* Informations Personnelles */}
        <Card className="shadow-none border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground tracking-tight">Informations Personnelles</CardTitle>
            <CardDescription className="text-muted-foreground">Identité et accès plateforme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow icon={User} label="Nom" value={employee.nom} />
              <InfoRow icon={User} label="Prénom" value={employee.prenom} />
              <InfoRow
                icon={Calendar}
                label="Date d'adhésion"
                value={employee.dateEmbauche}
              />
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <div className="mt-1">
                    <Badge
                      variant={
                        employee.statut === "Actif" ? "default" : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {employee.statut}
                    </Badge>
                  </div>
                </div>
              </div>
              <InfoRow icon={Users} label="Civilité" value={employee.civilite} />
              <InfoRow icon={Users} label="Genre" value={employee.genre} />
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
            </div>
          </CardContent>
        </Card>

        {/* Informations professionnelles */}
        <Card className="shadow-none border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground tracking-tight">Informations professionnelles</CardTitle>
            <CardDescription className="text-muted-foreground">Poste, structure et contrat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow
                icon={Building2}
                label="Entreprise"
                value="CNF - Compagnie Nationale"
              />
              <InfoRow icon={Hash} label="Matricule" value={employee.matricule} />
              <InfoRow
                icon={Briefcase}
                label="Rôle / Poste"
                value={employee.poste}
              />
              <InfoRow
                icon={MapPin}
                label="Branche / Site"
                value={employee.site}
              />
              <InfoRow
                icon={Building2}
                label="Département"
                value={employee.departement}
              />
              {employee.superieurHierarchique && (
                <div className="flex items-start gap-3">
                  <Avatar className="mt-0.5 h-8 w-8 shrink-0 rounded-md">
                    <AvatarFallback className="rounded-md bg-muted text-[10px] font-medium text-muted-foreground">
                      {employee.superieurHierarchique
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      Supérieur hiérarchique
                    </p>
                    <p className="truncate text-sm font-medium text-foreground">
                      {employee.superieurHierarchique}
                    </p>
                  </div>
                </div>
              )}
              <InfoRow icon={Trophy} label="Grade" value={employee.grade} />
              <InfoRow
                icon={FileText}
                label="Type de contrat"
                value={employee.typeContrat}
              />
              <InfoRow
                icon={Clock}
                label="Période d'essai"
                value={employee.periodeEssai}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}

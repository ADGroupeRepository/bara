"use client"

import {
  Briefcase,
  Building2,
  Calendar,
  CreditCard,
  Smartphone,
  Banknote,
  Clock,
  UserCheck,
  Hash,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


import type { EmployeeProfile } from "../mock-data"

type TabContractProps = {
  readonly employee: EmployeeProfile
}

function InfoItem({
  label,
  value,
}: {
  readonly label: string
  readonly value: string | undefined
}) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}

export function TabContract({ employee }: TabContractProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Informations Professionnelles */}
        <Card>
          <CardHeader>
            <CardTitle>Informations Professionnelles</CardTitle>
            <CardDescription>
              Poste, contrat et rattachement hiérarchique
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Hash className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Matricule</p>
                <p className="text-sm font-medium font-mono">{employee.matricule}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Poste</p>
                <p className="text-sm font-medium">{employee.poste}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Département</p>
                <p className="text-sm font-medium">{employee.departement}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Supérieur hiérarchique</p>
                <p className="text-sm font-medium">{employee.superieurHierarchique}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date d&apos;embauche</p>
                <p className="text-sm font-medium">{employee.dateEmbauche}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Période d&apos;essai</p>
                <p className="text-sm font-medium">{employee.periodeEssai}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rémunération */}
        <Card>
          <CardHeader>
            <CardTitle>Rémunération</CardTitle>
            <CardDescription>Salaire, primes et avantages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs text-muted-foreground">Salaire de base</p>
              <p className="text-2xl font-semibold">
                {employee.salaireBase}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  {employee.devise} / {employee.frequencePaiement.toLowerCase()}
                </span>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                label="Indemnité de transport"
                value={employee.indemniteTransport ? `${employee.indemniteTransport} ${employee.devise}` : undefined}
              />
              <InfoItem
                label="Prime de logement"
                value={employee.primeLogement ? `${employee.primeLogement} ${employee.devise}` : undefined}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Méthodes de paiement */}
      <Card>
        <CardHeader>
          <CardTitle>Méthodes de Paiement</CardTitle>
          <CardDescription>
            Coordonnées bancaires et modes de versement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {employee.methodesPaiement.map((method) => {
              const isMobile = method.mode === "Mobile Money"
              function getPaymentIcon() {
                if (isMobile) return Smartphone
                if (method.mode === "Espèces") return Banknote
                return CreditCard
              }
              const Icon = getPaymentIcon()
              const key = `${method.mode}-${method.banque || method.operateur || ''}`

              return (
                <div
                  key={key}
                  className="flex items-start gap-4 rounded-lg border p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{method.mode}</p>
                      {method.estPrincipal && (
                        <Badge variant="secondary" className="text-[10px]">
                          Principal
                        </Badge>
                      )}
                    </div>
                    {method.banque && (
                      <p className="text-xs text-muted-foreground">
                        {method.banque}
                      </p>
                    )}
                    {method.numeroCompte && (
                      <p className="truncate font-mono text-xs text-muted-foreground">
                        {method.numeroCompte}
                      </p>
                    )}
                    {method.operateur && (
                      <p className="text-xs text-muted-foreground">
                        {method.operateur} — {method.telephone}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

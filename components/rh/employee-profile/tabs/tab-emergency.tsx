"use client"

import { Phone, User, Home, Mail } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import type { EmployeeProfile } from "../mock-data"

type TabEmergencyProps = {
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

export function TabEmergency({ employee }: TabEmergencyProps) {
  return (
    <div className="space-y-6">
      {/* Coordonnées */}
      <Card>
        <CardHeader>
          <CardTitle>Coordonnées</CardTitle>
          <CardDescription>Adresse et informations de contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <InfoRow
                icon={Home}
                label="Adresse"
                value={[employee.adresse, employee.ville, employee.pays]
                  .filter(Boolean)
                  .join(", ")}
                subValue={
                  employee.codePostal
                    ? `Code postal: ${employee.codePostal}`
                    : undefined
                }
              />
            </div>

            <Separator className="md:hidden" />

            <div className="grid gap-4 sm:grid-cols-2 md:col-span-2">
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
          </div>
        </CardContent>
      </Card>

      {/* Contacts d'urgence */}
      {employee.contactsUrgence.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Phone className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium">Aucun contact d&apos;urgence</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Aucun contact d&apos;urgence n&apos;a été renseigné pour ce
              collaborateur.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Contacts d&apos;urgence</CardTitle>
            <CardDescription>
              Personnes à contacter en cas d&apos;urgence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {employee.contactsUrgence.map((contact) => (
                <div
                  key={`${contact.nom}-${contact.telephone}`}
                  className="flex items-start gap-4 rounded-lg border p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{contact.nom}</p>
                      <Badge variant="outline" className="text-xs">
                        {contact.relation}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{contact.telephone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

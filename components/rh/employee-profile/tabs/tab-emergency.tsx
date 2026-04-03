"use client"

import { Phone, User } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import type { EmployeeProfile } from "../mock-data"

type TabEmergencyProps = {
  readonly employee: EmployeeProfile
}

export function TabEmergency({ employee }: TabEmergencyProps) {
  if (employee.contactsUrgence.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Phone className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium">Aucun contact d&apos;urgence</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Aucun contact d&apos;urgence n&apos;a été renseigné pour ce collaborateur.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
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
  )
}

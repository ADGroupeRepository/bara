"use client"

import { Activity, ShieldCheck } from "lucide-react"

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

type TabNotesProps = {
  readonly employee: EmployeeProfile
}

export function TabNotes({ employee }: TabNotesProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Notes Internes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes Internes</CardTitle>
          <CardDescription>
            Commentaires et observations sur le collaborateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          {employee.notesInternes ? (
            <div className="rounded-lg bg-muted p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {employee.notesInternes}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Aucune note interne renseignée.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Santé & Aptitude */}
      <Card>
        <CardHeader>
          <CardTitle>Santé & Aptitude</CardTitle>
          <CardDescription>
            Informations médicales et déclaration de handicap
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Aptitude médicale
              </p>
              <Badge
                variant={
                  employee.aptitudeMedicale === "Apte" ? "default" : "secondary"
                }
                className="mt-1"
              >
                {employee.aptitudeMedicale}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Handicap déclaré</p>
                <p className="text-xs text-muted-foreground">
                  Situation de handicap reconnu
                </p>
              </div>
            </div>
            <Badge variant={employee.handicapDeclare ? "default" : "outline"}>
              {employee.handicapDeclare ? "Oui" : "Non"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

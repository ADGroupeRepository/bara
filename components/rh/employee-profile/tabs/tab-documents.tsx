"use client"

import {
  FileText,
  Download,
  Shield,
  GraduationCap,
  Award,
  Languages,
  Sparkles,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import type { EmployeeProfile } from "../mock-data"

type TabDocumentsProps = {
  readonly employee: EmployeeProfile
}

export function TabDocuments({ employee }: TabDocumentsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pièces d'identité */}
        <Card>
          <CardHeader>
            <CardTitle>Pièces d&apos;identité</CardTitle>
            <CardDescription>
              Numéros d&apos;identification officiels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Shield className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">N° CNI / Passeport</p>
                <p className="font-mono text-sm font-medium">
                  {employee.numeroCni}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expire le {employee.dateExpirationCni}
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">N° Sécurité sociale</p>
                <p className="font-mono text-sm font-medium">
                  {employee.numeroSecuriteSociale}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Numéro fiscal (IFU)</p>
                <p className="font-mono text-sm font-medium">
                  {employee.numeroFiscal}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parcours Académique */}
        <Card>
          <CardHeader>
            <CardTitle>Parcours Académique</CardTitle>
            <CardDescription>
              Niveau d&apos;études et diplômes obtenus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{employee.diplome}</p>
                <p className="text-xs text-muted-foreground">
                  {employee.etablissement} — {employee.anneeObtention}
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Niveau d&apos;études</p>
              <Badge variant="outline" className="mt-1">
                {employee.niveauEtudes}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents joints */}
      <Card>
        <CardHeader>
          <CardTitle>Documents joints</CardTitle>
          <CardDescription>
            Fichiers téléchargés dans le dossier du collaborateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          {employee.documents.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun document téléchargé.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-3">
              {employee.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{doc.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.fileSize} · {doc.uploadedAt}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compétences & Langues */}
      <Card>
        <CardHeader>
          <CardTitle>Compétences & Langues</CardTitle>
          <CardDescription>
            Compétences clés, langues parlées et certifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {employee.competences.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Compétences
              </div>
              <div className="flex flex-wrap gap-1.5">
                {employee.competences.map((c) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {employee.langues.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Languages className="h-3.5 w-3.5" />
                  Langues
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {employee.langues.map((l) => (
                    <Badge key={l} variant="outline">
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {employee.certifications.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Award className="h-3.5 w-3.5" />
                  Certifications
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {employee.certifications.map((c) => (
                    <Badge key={c} variant="secondary">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

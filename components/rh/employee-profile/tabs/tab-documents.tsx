"use client"

import {
  FileText,
  Download,
  GraduationCap,
  Award,
  Languages,
  Sparkles,
  Briefcase,
  Eye,
  X,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import type { EmployeeProfile } from "../mock-data"

type TabDocumentsProps = {
  readonly employee: EmployeeProfile
}

export function TabDocuments({ employee }: TabDocumentsProps) {
  return (
    <div className="space-y-6">
      {/* Documents administratifs */}
      <Card>
        <CardHeader>
          <CardTitle>Documents administratifs</CardTitle>
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {employee.documents
                .filter((doc) => doc.id !== "id-doc")
                .map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{doc.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.fileSize} · {doc.uploadedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          title="Consulter"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="h-full" hideHandle>
                        <div className="flex h-full w-full flex-col">
                          <DrawerHeader className="flex flex-row items-center justify-between mt-2">
                            <DrawerTitle className="text-xl font-semibold">
                              {doc.label}
                            </DrawerTitle>
                            <DrawerClose asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <X className="h-4 w-4" />
                              </Button>
                            </DrawerClose>
                          </DrawerHeader>
                          <div className="flex-1 overflow-hidden px-4 pb-4">
                            <iframe
                              src="/Courrier.pdf"
                              className="h-full w-full rounded-md border"
                              title={`Document: ${doc.label}`}
                            />
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Télécharger"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parcours Académique Data Table */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 sm:items-center">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Parcours Académique
            </CardTitle>
            <CardDescription>
              Historique des formations et diplômes obtenus
            </CardDescription>
          </div>
          <Badge variant="outline" className="hidden shrink-0 sm:inline-flex">
            Niveau actuel : {employee.niveauEtudes}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-[30%]">Diplôme / Formation</TableHead>
                  <TableHead className="w-[25%]">Établissement</TableHead>
                  <TableHead className="w-[20%]">Période</TableHead>
                  <TableHead className="w-[15%]">Statut</TableHead>
                  <TableHead className="w-[10%]">Documents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.parcoursAcademique?.length > 0 ? (
                  employee.parcoursAcademique.map((parcours) => (
                    <TableRow key={parcours.id}>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {parcours.diplome}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {parcours.domaine}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {parcours.etablissement}
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        {parcours.dateDebut} - {parcours.dateFin}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            parcours.statut === "Obtenu"
                              ? "secondary"
                              : "outline"
                          }
                          className="font-normal"
                        >
                          {parcours.statut}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {parcours.documentUrl && (
                          <div className="flex items-center gap-1">
                            <Drawer>
                              <DrawerTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  title="Voir le diplôme"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DrawerTrigger>
                              <DrawerContent className="h-full" hideHandle>
                                <div className="flex h-full w-full flex-col">
                                  <DrawerHeader className="mt-2 flex flex-row items-center justify-between">
                                    <DrawerTitle className="text-xl font-semibold">
                                      Diplôme : {parcours.diplome}
                                    </DrawerTitle>
                                    <DrawerClose asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </DrawerClose>
                                  </DrawerHeader>
                                  <div className="flex-1 overflow-hidden px-4 pb-4">
                                    <iframe
                                      src={parcours.documentUrl}
                                      className="h-full w-full rounded-md border"
                                      title={`Diplôme: ${parcours.diplome}`}
                                    />
                                  </div>
                                </div>
                              </DrawerContent>
                            </Drawer>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="Télécharger le diplôme"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Aucun parcours académique enregistré.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Expériences Professionnelles Data Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Expériences Professionnelles
          </CardTitle>
          <CardDescription>
            Historique du parcours professionnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-[25%]">Poste / Rôle</TableHead>
                  <TableHead className="w-[25%]">Employeur</TableHead>
                  <TableHead className="w-[20%]">Période</TableHead>
                  <TableHead className="w-[30%]">Aperçu des missions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.experiencesProfessionnelles?.length > 0 ? (
                  employee.experiencesProfessionnelles.map((exp) => (
                    <TableRow key={exp.id}>
                      <TableCell className="align-top">
                        <div className="text-sm font-medium">{exp.poste}</div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="text-sm">{exp.employeur}</div>
                        <div className="text-xs text-muted-foreground">
                          {exp.lieu}
                        </div>
                      </TableCell>
                      <TableCell className="align-top text-sm whitespace-nowrap">
                        {exp.dateDebut} - {exp.dateFin}
                      </TableCell>
                      <TableCell className="line-clamp-3 align-top text-sm text-muted-foreground">
                        {exp.description}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Aucune expérience professionnelle enregistrée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Compétences & Langues */}
      <Card>
        <CardHeader>
          <CardTitle>Aptitudes & Certifications</CardTitle>
          <CardDescription>
            Compétences clés, langues parlées et certifications professionnelles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Compétences */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                Compétences
              </div>
              <div className="flex flex-wrap gap-2">
                {employee.competences.length > 0 ? (
                  employee.competences.map((c) => (
                    <Badge key={c} variant="secondary">
                      {c}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Non renseigné
                  </span>
                )}
              </div>
            </div>

            {/* Langues */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Languages className="h-4 w-4" />
                Langues parlées
              </div>
              <div className="flex flex-wrap gap-2">
                {employee.langues.length > 0 ? (
                  employee.langues.map((l) => (
                    <Badge key={l} variant="outline" className="bg-muted/50">
                      {l}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Non renseigné
                  </span>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Award className="h-4 w-4" />
                Certifications
              </div>
              <div className="flex flex-wrap gap-2">
                {employee.certifications.length > 0 ? (
                  employee.certifications.map((c) => (
                    <Badge key={c} variant="secondary">
                      {c}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Non renseigné
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

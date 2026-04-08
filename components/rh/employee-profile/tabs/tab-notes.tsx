"use client"

import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type {
  EmployeeProfile,
  ParcoursAcademique,
  ExperienceProfessionnelle,
} from "../mock-data"
import { EditableInfoRow } from "../editable-info-row"
import { EditableCardHeader } from "../editable-card-header"
import { useCardEditing } from "../use-card-editing"

type TabNotesProps = {
  readonly employee: EmployeeProfile
}

const APTITUDE_OPTIONS = [
  { value: "Apte", label: "Apte" },
  { value: "Inapte", label: "Inapte" },
  { value: "Apte avec réserves", label: "Apte avec réserves" },
]

const DOC_TYPE_OPTIONS = [
  { value: "CNI (Carte Nationale d'Identité)", label: "CNI" },
  { value: "Passeport", label: "Passeport" },
  { value: "Permis de conduire", label: "Permis de conduire" },
  { value: "Titre de séjour", label: "Titre de séjour" },
]

const STATUT_DIPLOME_OPTIONS = [
  { value: "Obtenu", label: "Obtenu" },
  { value: "En cours", label: "En cours" },
  { value: "Abandonné", label: "Abandonné" },
]

export function TabNotes({ employee }: TabNotesProps) {
  const identityDoc = employee.documents.find((d) => d.id === "id-doc")

  // Identity documents editing
  const identityEdit = useCardEditing({
    typeDocumentIdentite: employee.typeDocumentIdentite,
    numeroCni: employee.numeroCni,
    dateExpirationCni: employee.dateExpirationCni,
    numeroSecuriteSociale: employee.numeroSecuriteSociale,
  })

  // Health editing
  const healthEdit = useCardEditing({
    aptitudeMedicale: employee.aptitudeMedicale,
    handicapDeclare: employee.handicapDeclare,
  })

  // Notes editing
  const notesEdit = useCardEditing({
    notesInternes: employee.notesInternes,
  })

  // Academic editing
  const [academicEditing, setAcademicEditing] = useState(false)
  const [editableAcademic, setEditableAcademic] = useState<
    ParcoursAcademique[]
  >(() =>
    employee.parcoursAcademique
      ? structuredClone(employee.parcoursAcademique)
      : []
  )

  // Experience editing
  const [expEditing, setExpEditing] = useState(false)
  const [editableExp, setEditableExp] = useState<ExperienceProfessionnelle[]>(
    () =>
      employee.experiencesProfessionnelles
        ? structuredClone(employee.experiencesProfessionnelles)
        : []
  )

  // Skills editing
  const [skillsEditing, setSkillsEditing] = useState(false)
  const [editableCompetences, setEditableCompetences] = useState<string[]>(
    () => [...(employee.competences || [])]
  )
  const [editableLangues, setEditableLangues] = useState<string[]>(() => [
    ...(employee.langues || []),
  ])
  const [editableCertifications, setEditableCertifications] = useState<
    string[]
  >(() => [...(employee.certifications || [])])

  return (
    <div className="space-y-6 pb-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Documents d'Identité */}
        <Card className="border-border bg-card shadow-none">
          <EditableCardHeader
            title="Documents d'Identité"
            description="Pièces officielles et numéros fiscaux"
            isEditing={identityEdit.isEditing}
            onEdit={identityEdit.startEditing}
            onCancel={identityEdit.cancelEditing}
            onSave={() => identityEdit.saveEditing()}
          >
            {!identityEdit.isEditing && identityDoc && (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    Voir la pièce
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-full" hideHandle>
                  <div className="flex h-full w-full flex-col">
                    <DrawerHeader className="mt-2 flex flex-row items-center justify-between border-b border-border px-6 py-4">
                      <DrawerTitle className="text-xl font-semibold text-foreground">
                        {identityDoc.label}
                      </DrawerTitle>
                      <DrawerClose asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <span className="text-xs font-bold uppercase transition-colors hover:text-foreground">
                            Fermer
                          </span>
                        </Button>
                      </DrawerClose>
                    </DrawerHeader>
                    <div className="flex-1 overflow-hidden bg-muted/20 px-4 pb-4">
                      <iframe
                        src="/Courrier.pdf"
                        className="h-full w-full rounded-md border border-border bg-background"
                        title={`Document: ${identityDoc.label}`}
                      />
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </EditableCardHeader>
          <CardContent>
            <div className="space-y-4">
              <EditableInfoRow
                label="Type de document"
                value={
                  identityEdit.isEditing
                    ? identityEdit.formData.typeDocumentIdentite
                    : employee.typeDocumentIdentite
                }
                fieldKey="typeDocumentIdentite"
                isEditing={identityEdit.isEditing}
                onChange={identityEdit.updateField}
                options={DOC_TYPE_OPTIONS}
              />
              <EditableInfoRow
                label="Numéro CNI"
                value={
                  identityEdit.isEditing
                    ? identityEdit.formData.numeroCni
                    : employee.numeroCni
                }
                fieldKey="numeroCni"
                isEditing={identityEdit.isEditing}
                onChange={identityEdit.updateField}
              />
              <EditableInfoRow
                label="Date d'expiration"
                value={
                  identityEdit.isEditing
                    ? identityEdit.formData.dateExpirationCni
                    : employee.dateExpirationCni
                }
                fieldKey="dateExpirationCni"
                isEditing={identityEdit.isEditing}
                onChange={identityEdit.updateField}
              />
              <EditableInfoRow
                label="Sécurité Sociale"
                value={
                  identityEdit.isEditing
                    ? identityEdit.formData.numeroSecuriteSociale
                    : employee.numeroSecuriteSociale
                }
                fieldKey="numeroSecuriteSociale"
                isEditing={identityEdit.isEditing}
                onChange={identityEdit.updateField}
              />
            </div>
          </CardContent>
        </Card>

        {/* Santé & Aptitude */}
        <Card className="border-border bg-card shadow-none">
          <EditableCardHeader
            title="Santé & Aptitude"
            description="Aptitude médicale et situation de handicap"
            isEditing={healthEdit.isEditing}
            onEdit={healthEdit.startEditing}
            onCancel={healthEdit.cancelEditing}
            onSave={() => healthEdit.saveEditing()}
          />
          <CardContent>
            <div className="space-y-4">
              <EditableInfoRow
                label="Aptitude médicale"
                value={
                  healthEdit.isEditing
                    ? healthEdit.formData.aptitudeMedicale
                    : employee.aptitudeMedicale
                }
                fieldKey="aptitudeMedicale"
                isEditing={healthEdit.isEditing}
                onChange={healthEdit.updateField}
                options={APTITUDE_OPTIONS}
              />

              <div className="flex flex-col gap-1.5">
                <p className="text-xs">Handicap déclaré</p>
                <div
                  className={cn(
                    "flex items-center justify-between rounded-md border border-border/40 bg-background p-2.5",
                    !healthEdit.isEditing && "border-border/20"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
                      Reconnu par l&apos;état
                    </span>
                  </div>
                  {healthEdit.isEditing ? (
                    <Switch
                      checked={healthEdit.formData.handicapDeclare as boolean}
                      onCheckedChange={(v) =>
                        healthEdit.updateField("handicapDeclare", v)
                      }
                    />
                  ) : (
                    <Badge
                      variant={employee.handicapDeclare ? "default" : "outline"}
                      className="border-border text-[10px]"
                    >
                      {employee.handicapDeclare ? "Oui" : "Non"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Internes */}
        <Card className="border-border bg-card shadow-none lg:col-span-2">
          <EditableCardHeader
            title="Notes Internes"
            description="Observations et commentaires RH"
            isEditing={notesEdit.isEditing}
            onEdit={notesEdit.startEditing}
            onCancel={notesEdit.cancelEditing}
            onSave={() => notesEdit.saveEditing()}
          />
          <CardContent>
            <div className="relative w-full">
              <textarea
                value={
                  notesEdit.isEditing
                    ? notesEdit.formData.notesInternes
                    : employee.notesInternes
                }
                onChange={(e) =>
                  notesEdit.updateField("notesInternes", e.target.value)
                }
                disabled={!notesEdit.isEditing}
                rows={4}
                className={cn(
                  "w-full min-w-0 rounded-lg border border-border/40 bg-background p-4 text-sm leading-relaxed outline-none focus-visible:border-primary focus-visible:ring-0",
                  !notesEdit.isEditing &&
                    "cursor-default border-border/20 bg-background font-medium opacity-100"
                )}
                placeholder="Ajouter des notes internes..."
              />
              {!notesEdit.isEditing && (
                <div className="absolute inset-0 z-10 cursor-default" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Parcours Académique */}
        <Card className="border-border bg-card shadow-none lg:col-span-2">
          <EditableCardHeader
            title="Parcours Académique"
            description="Historique des formations et diplômes obtenus"
            isEditing={academicEditing}
            onEdit={() => {
              setEditableAcademic(structuredClone(employee.parcoursAcademique))
              setAcademicEditing(true)
            }}
            onCancel={() => {
              setEditableAcademic(structuredClone(employee.parcoursAcademique))
              setAcademicEditing(false)
            }}
            onSave={() => setAcademicEditing(false)}
          >
            {!academicEditing && (
              <Badge
                variant="secondary"
                className="hidden shrink-0 bg-muted text-muted-foreground sm:inline-flex"
              >
                Niveau actuel : {employee.niveauEtudes}
              </Badge>
            )}
          </EditableCardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border border-border bg-background">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[30%] font-semibold text-foreground">
                      Diplôme / Formation
                    </TableHead>
                    <TableHead className="w-[25%] font-semibold text-foreground">
                      Établissement
                    </TableHead>
                    <TableHead className="w-[20%] font-semibold text-foreground">
                      Période
                    </TableHead>
                    <TableHead className="w-[15%] font-semibold text-foreground">
                      Statut
                    </TableHead>
                    <TableHead className="w-[10%] pr-4 text-right font-semibold text-foreground">
                      {academicEditing ? "Actions" : "Documents"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(academicEditing
                    ? editableAcademic
                    : employee.parcoursAcademique
                  )?.length > 0 ? (
                    (academicEditing
                      ? editableAcademic
                      : employee.parcoursAcademique
                    ).map((parcours, index) => (
                      <TableRow
                        key={parcours.id}
                        className="border-border transition-colors hover:bg-muted/30"
                      >
                        <TableCell>
                          {academicEditing ? (
                            <div className="space-y-1">
                              <Input
                                value={parcours.diplome}
                                onChange={(e) => {
                                  const updated = [...editableAcademic]
                                  updated[index] = {
                                    ...updated[index],
                                    diplome: e.target.value,
                                  }
                                  setEditableAcademic(updated)
                                }}
                                className="h-7 border-border/60 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                                placeholder="Diplôme"
                              />
                              <Input
                                value={parcours.domaine}
                                onChange={(e) => {
                                  const updated = [...editableAcademic]
                                  updated[index] = {
                                    ...updated[index],
                                    domaine: e.target.value,
                                  }
                                  setEditableAcademic(updated)
                                }}
                                className="h-7 border-border/60 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                                placeholder="Domaine"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="text-sm font-medium text-foreground">
                                {parcours.diplome}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {parcours.domaine}
                              </div>
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          {academicEditing ? (
                            <Input
                              value={parcours.etablissement}
                              onChange={(e) => {
                                const updated = [...editableAcademic]
                                updated[index] = {
                                  ...updated[index],
                                  etablissement: e.target.value,
                                }
                                setEditableAcademic(updated)
                              }}
                              className="h-7 border-border/60 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                            />
                          ) : (
                            <span className="text-sm text-foreground">
                              {parcours.etablissement}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {academicEditing ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={parcours.dateDebut}
                                onChange={(e) => {
                                  const updated = [...editableAcademic]
                                  updated[index] = {
                                    ...updated[index],
                                    dateDebut: e.target.value,
                                  }
                                  setEditableAcademic(updated)
                                }}
                                className="h-7 w-16 border-border/60 bg-background text-center text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                                placeholder="Début"
                              />
                              <span className="text-muted-foreground">-</span>
                              <Input
                                value={parcours.dateFin}
                                onChange={(e) => {
                                  const updated = [...editableAcademic]
                                  updated[index] = {
                                    ...updated[index],
                                    dateFin: e.target.value,
                                  }
                                  setEditableAcademic(updated)
                                }}
                                className="h-7 w-16 border-border/60 bg-background text-center text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                                placeholder="Fin"
                              />
                            </div>
                          ) : (
                            <span className="text-sm whitespace-nowrap text-muted-foreground">
                              {parcours.dateDebut} - {parcours.dateFin}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {academicEditing ? (
                            <Select
                              value={parcours.statut}
                              onValueChange={(v) => {
                                const updated = [...editableAcademic]
                                updated[index] = {
                                  ...updated[index],
                                  statut: v as ParcoursAcademique["statut"],
                                }
                                setEditableAcademic(updated)
                              }}
                            >
                              <SelectTrigger className="h-7 border-border/60 bg-background text-xs shadow-none focus:ring-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUT_DIPLOME_OPTIONS.map((opt) => (
                                  <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                    className="text-xs"
                                  >
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge
                              variant={
                                parcours.statut === "Obtenu"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                parcours.statut === "Obtenu"
                                  ? "border-none bg-emerald-50 text-emerald-600"
                                  : "border-border text-muted-foreground"
                              }
                            >
                              {parcours.statut}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="pr-4 text-right">
                          {academicEditing ? (
                            <Button
                              variant="ghost"
                              className="h-8 px-2 text-[10px] font-bold text-muted-foreground transition-all hover:bg-destructive/5 hover:text-destructive uppercase"
                              onClick={() => {
                                setEditableAcademic((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }}
                            >
                              Supprimer
                            </Button>
                          ) : parcours.documentUrl ? (
                            <div className="flex items-center justify-end gap-3">
                              <Drawer>
                                <DrawerTrigger asChild>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="h-8 px-0 text-[10px] font-bold text-muted-foreground transition-colors hover:text-primary uppercase"
                                  >
                                    Voir
                                  </Button>
                                </DrawerTrigger>
                                <DrawerContent className="h-full" hideHandle>
                                  <div className="flex h-full w-full flex-col">
                                    <DrawerHeader className="mt-2 flex flex-row items-center justify-between border-b border-border px-6 py-4">
                                      <DrawerTitle className="text-xl font-semibold text-foreground">
                                        Diplôme : {parcours.diplome}
                                      </DrawerTitle>
                                      <DrawerClose asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                        >
                                          <span className="text-xs font-bold uppercase transition-colors hover:text-foreground">
                                            Fermer
                                          </span>
                                        </Button>
                                      </DrawerClose>
                                    </DrawerHeader>
                                    <div className="flex-1 overflow-hidden bg-muted/20 px-4 pb-4">
                                      <iframe
                                        src={parcours.documentUrl}
                                        className="h-full w-full rounded-md border border-border bg-background"
                                        title={`Diplôme: ${parcours.diplome}`}
                                      />
                                    </div>
                                  </div>
                                </DrawerContent>
                              </Drawer>
                              <Button
                                variant="link"
                                size="sm"
                                className="h-8 px-0 text-[10px] font-bold text-muted-foreground transition-colors hover:text-primary uppercase"
                              >
                                Télécharger
                              </Button>
                            </div>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-muted-foreground italic"
                      >
                        Aucun parcours académique enregistré.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {academicEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditableAcademic((prev) => [
                    ...prev,
                    {
                      id: Math.random().toString(36).substring(2, 9),
                      diplome: "",
                      etablissement: "",
                      domaine: "",
                      dateDebut: "",
                      dateFin: "",
                      statut: "En cours" as const,
                    },
                  ])
                }}
                className="mt-4 w-full text-xs font-semibold hover:bg-muted"
              >
                Ajouter un diplôme
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Expériences Professionnelles */}
        <Card className="border-border bg-card shadow-none lg:col-span-2">
          <EditableCardHeader
            title="Expériences Professionnelles"
            description="Historique du parcours professionnel"
            isEditing={expEditing}
            onEdit={() => {
              setEditableExp(
                structuredClone(employee.experiencesProfessionnelles)
              )
              setExpEditing(true)
            }}
            onCancel={() => {
              setEditableExp(
                structuredClone(employee.experiencesProfessionnelles)
              )
              setExpEditing(false)
            }}
            onSave={() => setExpEditing(false)}
          />
          <CardContent>
            <div className="overflow-hidden rounded-md border border-border bg-background">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[25%] font-semibold text-foreground">
                      Poste / Rôle
                    </TableHead>
                    <TableHead className="w-[25%] font-semibold text-foreground">
                      Employeur
                    </TableHead>
                    <TableHead className="w-[20%] font-semibold text-foreground">
                      Période
                    </TableHead>
                    <TableHead className="w-[25%] font-semibold text-foreground">
                      {expEditing ? "Description" : "Aperçu des missions"}
                    </TableHead>
                    {expEditing && (
                      <TableHead className="w-[5%] pr-4 text-right font-semibold text-foreground">
                        Actions
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(expEditing
                    ? editableExp
                    : employee.experiencesProfessionnelles
                  )?.length > 0 ? (
                    (expEditing
                      ? editableExp
                      : employee.experiencesProfessionnelles
                    ).map((exp, index) => (
                      <TableRow
                        key={exp.id}
                        className="border-border transition-colors hover:bg-muted/30"
                      >
                        <TableCell className="align-top">
                          {expEditing ? (
                            <Input
                              value={exp.poste}
                              onChange={(e) => {
                                const updated = [...editableExp]
                                updated[index] = {
                                  ...updated[index],
                                  poste: e.target.value,
                                }
                                setEditableExp(updated)
                              }}
                              className="h-7 border-border/60 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                            />
                          ) : (
                            <div className="text-sm font-medium text-foreground">
                              {exp.poste}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="align-top">
                          {expEditing ? (
                            <div className="space-y-1">
                              <Input
                                value={exp.employeur}
                                onChange={(e) => {
                                  const updated = [...editableExp]
                                  updated[index] = {
                                    ...updated[index],
                                    employeur: e.target.value,
                                  }
                                  setEditableExp(updated)
                                }}
                                className="h-7 border-border/60 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                                placeholder="Employeur"
                              />
                              <Input
                                value={exp.lieu}
                                onChange={(e) => {
                                  const updated = [...editableExp]
                                  updated[index] = {
                                    ...updated[index],
                                    lieu: e.target.value,
                                  }
                                  setEditableExp(updated)
                                }}
                                className="h-7 border-border/60 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                                placeholder="Lieu"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="text-sm text-foreground">
                                {exp.employeur}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {exp.lieu}
                              </div>
                            </>
                          )}
                        </TableCell>
                        <TableCell className="align-top">
                          {expEditing ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={exp.dateDebut}
                                onChange={(e) => {
                                  const updated = [...editableExp]
                                  updated[index] = {
                                    ...updated[index],
                                    dateDebut: e.target.value,
                                  }
                                  setEditableExp(updated)
                                }}
                                className="h-7 w-20 border-border/60 bg-background text-center text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                              />
                              <span className="text-muted-foreground">-</span>
                              <Input
                                value={exp.dateFin}
                                onChange={(e) => {
                                  const updated = [...editableExp]
                                  updated[index] = {
                                    ...updated[index],
                                    dateFin: e.target.value,
                                  }
                                  setEditableExp(updated)
                                }}
                                className="h-7 w-20 border-border/60 bg-background text-center text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                              />
                            </div>
                          ) : (
                            <span className="text-sm whitespace-nowrap text-muted-foreground">
                              {exp.dateDebut} - {exp.dateFin}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="align-top">
                          {expEditing ? (
                            <textarea
                              value={exp.description}
                              onChange={(e) => {
                                const updated = [...editableExp]
                                updated[index] = {
                                  ...updated[index],
                                  description: e.target.value,
                                }
                                setEditableExp(updated)
                              }}
                              rows={2}
                              className="w-full min-w-0 rounded-md border border-border/60 bg-background px-2 py-1 text-xs outline-none focus-visible:border-primary focus-visible:ring-0"
                            />
                          ) : (
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {exp.description}
                            </p>
                          )}
                        </TableCell>
                        {expEditing && (
                          <TableCell className="pr-4 text-right align-top">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-[10px] font-bold text-muted-foreground transition-all hover:bg-destructive/5 hover:text-destructive uppercase"
                              onClick={() => {
                                setEditableExp((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }}
                            >
                              Supprimer
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={expEditing ? 5 : 4}
                        className="h-24 text-center text-muted-foreground italic"
                      >
                        Aucune expérience professionnelle enregistrée.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {expEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditableExp((prev) => [
                    ...prev,
                    {
                      id: Math.random().toString(36).substring(2, 9),
                      poste: "",
                      employeur: "",
                      lieu: "",
                      dateDebut: "",
                      dateFin: "",
                      description: "",
                    },
                  ])
                }}
                className="mt-4 w-full text-xs font-semibold hover:bg-muted"
              >
                Ajouter une expérience
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Aptitudes & Certifications */}
        <Card className="border-border bg-card shadow-none lg:col-span-2">
          <EditableCardHeader
            title="Aptitudes & Certifications"
            description="Compétences clés, langues parlées et certifications professionnelles"
            isEditing={skillsEditing}
            onEdit={() => {
              setEditableCompetences([...employee.competences])
              setEditableLangues([...employee.langues])
              setEditableCertifications([...employee.certifications])
              setSkillsEditing(true)
            }}
            onCancel={() => {
              setEditableCompetences([...employee.competences])
              setEditableLangues([...employee.langues])
              setEditableCertifications([...employee.certifications])
              setSkillsEditing(false)
            }}
            onSave={() => setSkillsEditing(false)}
          />
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Compétences */}
              <TagSection
                label="Compétences"
                tags={
                  skillsEditing ? editableCompetences : employee.competences
                }
                isEditing={skillsEditing}
                onRemove={(index) =>
                  setEditableCompetences((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onAdd={(tag) =>
                  setEditableCompetences((prev) => [...prev, tag])
                }
              />

              {/* Langues */}
              <TagSection
                label="Langues parlées"
                tags={skillsEditing ? editableLangues : employee.langues}
                isEditing={skillsEditing}
                variant="outline"
                onRemove={(index) =>
                  setEditableLangues((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onAdd={(tag) => setEditableLangues((prev) => [...prev, tag])}
              />

              {/* Certifications */}
              <TagSection
                label="Certifications"
                tags={
                  skillsEditing
                    ? editableCertifications
                    : employee.certifications
                }
                isEditing={skillsEditing}
                onRemove={(index) =>
                  setEditableCertifications((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onAdd={(tag) => setEditableCertifications((prev) => [...prev, tag])}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Reusable tag section component
function TagSection({
  label,
  tags,
  isEditing,
  variant = "secondary",
  onRemove,
  onAdd,
}: {
  readonly label: string
  readonly tags: string[]
  readonly isEditing: boolean
  readonly variant?: "secondary" | "outline"
  readonly onRemove: (index: number) => void
  readonly onAdd: (tag: string) => void
}) {
  const [newTag, setNewTag] = useState("")

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((c, index) => (
            <Badge
              key={`${c}-${index}`}
              variant={variant}
              className={
                variant === "outline"
                  ? "border-border bg-muted/20 text-muted-foreground"
                  : "border-none bg-muted text-muted-foreground"
              }
            >
              {c}
              {isEditing && (
                <button
                  onClick={() => onRemove(index)}
                  className="ml-1 rounded-sm px-1 text-[8px] font-bold uppercase hover:bg-destructive/10 hover:text-destructive"
                >
                  Supprimer
                </button>
              )}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground italic">
            Non renseigné
          </span>
        )}
      </div>
      {isEditing && (
        <div className="flex items-center gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTag.trim()) {
                e.preventDefault()
                onAdd(newTag.trim())
                setNewTag("")
              }
            }}
            placeholder={`Ajouter...`}
            className="h-7 w-36 border-border/60 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
          />
          <Button
            variant="ghost"
            className="h-7 px-2 text-[10px] font-bold uppercase transition-all hover:text-primary"
            onClick={() => {
              if (newTag.trim()) {
                onAdd(newTag.trim())
                setNewTag("")
              }
            }}
          >
            Ajouter
          </Button>
        </div>
      )}
    </div>
  )
}

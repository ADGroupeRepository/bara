import {
  Activity,
  ShieldCheck,
  StickyNote,
  CreditCard,
  Calendar,
  FileText,
  Eye,
  X,
  GraduationCap,
  Award,
  Languages,
  Sparkles,
  Briefcase,
  Download,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
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
import { ScrollArea } from "@/components/ui/scroll-area"

import type { EmployeeProfile } from "../mock-data"

type TabPersonnelsProps = {
  readonly employee: EmployeeProfile
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  readonly icon: React.ElementType
  readonly label: string
  readonly value: string | undefined
}) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

export function TabNotes({ employee }: TabPersonnelsProps) {
  const identityDoc = employee.documents.find(d => d.id === "id-doc")

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 pb-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Documents d'Identité */}
          <Card className="shadow-none border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-lg text-foreground">Documents d&apos;Identité</CardTitle>
                <CardDescription className="text-muted-foreground">Pièces officielles et numéros fiscaux</CardDescription>
              </div>
              {identityDoc && (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-muted">
                      <Eye className="h-4 w-4" />
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
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </DrawerClose>
                      </DrawerHeader>
                      <div className="flex-1 overflow-hidden px-4 pb-4 bg-muted/20">
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow icon={FileText} label="Type de document" value={employee.typeDocumentIdentite} />
                <InfoRow icon={CreditCard} label="Numéro CNI" value={employee.numeroCni} />
                <InfoRow icon={Calendar} label="Date d'expiration" value={employee.dateExpirationCni} />
                <InfoRow icon={FileText} label="Sécurité Sociale" value={employee.numeroSecuriteSociale} />
              </div>
            </CardContent>
          </Card>

          {/* Santé & Aptitude */}
          <Card className="shadow-none border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Santé & Aptitude</CardTitle>
              <CardDescription className="text-muted-foreground">
                Aptitude médicale et situation de handicap
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
                      employee.aptitudeMedicale === "Apte"
                        ? "default"
                        : "secondary"
                    }
                    className="mt-1"
                  >
                    {employee.aptitudeMedicale}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Handicap déclaré</p>
                    <p className="text-xs text-muted-foreground">
                      Situation de handicap reconnu
                    </p>
                  </div>
                </div>
                <Badge variant={employee.handicapDeclare ? "default" : "outline"} className="border-border">
                  {employee.handicapDeclare ? "Oui" : "Non"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notes Internes */}
          <Card className="lg:col-span-2 shadow-none border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Notes Internes</CardTitle>
              <CardDescription className="text-muted-foreground">Observations et commentaires RH</CardDescription>
            </CardHeader>
            <CardContent>
              {employee.notesInternes ? (
                <div className="rounded-lg bg-muted p-4 border border-border">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                    {employee.notesInternes}
                  </p>
                </div>
              ) : (
                <div className="flex h-full min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-border p-4 text-center">
                  <StickyNote className="mb-2 h-8 w-8 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground italic">
                    Aucune note renseignée.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Parcours Académique */}
          <Card className="lg:col-span-2 shadow-none border-border bg-card">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 sm:items-center">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Parcours Académique
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Historique des formations et diplômes obtenus
                </CardDescription>
              </div>
              <Badge variant="secondary" className="hidden shrink-0 sm:inline-flex bg-muted text-muted-foreground">
                Niveau actuel : {employee.niveauEtudes}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border border-border bg-background">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50 border-border">
                      <TableHead className="w-[30%] text-foreground font-semibold">Diplôme / Formation</TableHead>
                      <TableHead className="w-[25%] text-foreground font-semibold">Établissement</TableHead>
                      <TableHead className="w-[20%] text-foreground font-semibold">Période</TableHead>
                      <TableHead className="w-[15%] text-foreground font-semibold">Statut</TableHead>
                      <TableHead className="w-[10%] text-right text-foreground font-semibold pr-4">Documents</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.parcoursAcademique?.length > 0 ? (
                      employee.parcoursAcademique.map((parcours) => (
                        <TableRow key={parcours.id} className="border-border hover:bg-muted/30 transition-colors">
                          <TableCell>
                            <div className="text-sm font-medium text-foreground">
                              {parcours.diplome}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {parcours.domaine}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {parcours.etablissement}
                          </TableCell>
                          <TableCell className="text-sm whitespace-nowrap text-muted-foreground">
                            {parcours.dateDebut} - {parcours.dateFin}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                parcours.statut === "Obtenu"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={parcours.statut === "Obtenu" ? "bg-emerald-50 text-emerald-600 border-none" : "border-border text-muted-foreground"}
                            >
                              {parcours.statut}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-4">
                            {parcours.documentUrl && (
                              <div className="flex items-center justify-end gap-1">
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                                      title="Voir le diplôme"
                                    >
                                      <Eye className="h-4 w-4" />
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
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </DrawerClose>
                                      </DrawerHeader>
                                      <div className="flex-1 overflow-hidden px-4 pb-4 bg-muted/20">
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
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
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
                          className="h-24 text-center text-muted-foreground italic"
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

          {/* Expériences Professionnelles */}
          <Card className="lg:col-span-2 shadow-none border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
                Expériences Professionnelles
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Historique du parcours professionnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border border-border bg-background">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50 border-border">
                      <TableHead className="w-[25%] text-foreground font-semibold">Poste / Rôle</TableHead>
                      <TableHead className="w-[25%] text-foreground font-semibold">Employeur</TableHead>
                      <TableHead className="w-[20%] text-foreground font-semibold">Période</TableHead>
                      <TableHead className="w-[30%] text-foreground font-semibold pr-4">Aperçu des missions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.experiencesProfessionnelles?.length > 0 ? (
                      employee.experiencesProfessionnelles.map((exp) => (
                        <TableRow key={exp.id} className="border-border hover:bg-muted/30 transition-colors">
                          <TableCell className="align-top">
                            <div className="text-sm font-medium text-foreground">{exp.poste}</div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="text-sm text-foreground">{exp.employeur}</div>
                            <div className="text-xs text-muted-foreground">
                              {exp.lieu}
                            </div>
                          </TableCell>
                          <TableCell className="align-top text-sm whitespace-nowrap text-muted-foreground">
                            {exp.dateDebut} - {exp.dateFin}
                          </TableCell>
                          <TableCell className="align-top text-sm text-muted-foreground pr-4">
                            <p className="line-clamp-2">{exp.description}</p>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-24 text-center text-muted-foreground italic"
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

          {/* Aptitudes & Certifications */}
          <Card className="lg:col-span-2 shadow-none border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Aptitudes & Certifications</CardTitle>
              <CardDescription className="text-muted-foreground">
                Compétences clés, langues parlées et certifications professionnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {/* Compétences */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Compétences
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {employee.competences.length > 0 ? (
                      employee.competences.map((c) => (
                        <Badge key={c} variant="secondary" className="bg-muted text-muted-foreground border-none">
                          {c}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground italic">
                        Non renseigné
                      </span>
                    )}
                  </div>
                </div>

                {/* Langues */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Languages className="h-4 w-4 text-primary" />
                    Langues parlées
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {employee.langues.length > 0 ? (
                      employee.langues.map((l) => (
                        <Badge key={l} variant="outline" className="border-border text-muted-foreground bg-muted/20">
                          {l}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground italic">
                        Non renseigné
                      </span>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Award className="h-4 w-4 text-primary" />
                    Certifications
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {employee.certifications.length > 0 ? (
                      employee.certifications.map((c) => (
                        <Badge key={c} variant="secondary" className="bg-muted text-muted-foreground border-none">
                          {c}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground italic">
                        Non renseigné
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}

import {
  Activity,
  ShieldCheck,
  StickyNote,
  CreditCard,
  Calendar,
  FileText,
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
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

export function TabNotes({ employee }: TabPersonnelsProps) {
  const identityDoc = employee.documents.find(d => d.id === "id-doc")

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Documents d'Identité */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle>Documents d&apos;Identité</CardTitle>
              <CardDescription>Pièces officielles et numéros fiscaux</CardDescription>
            </div>
            {identityDoc && (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Voir la pièce
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-full" hideHandle>
                  <div className="flex h-full w-full flex-col">
                    <DrawerHeader className="mt-2 flex flex-row items-center justify-between">
                      <DrawerTitle className="text-xl font-semibold">
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
                    <div className="flex-1 overflow-hidden px-4 pb-4">
                      <iframe
                        src="/Courrier.pdf"
                        className="h-full w-full rounded-md border"
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
        <Card>
          <CardHeader>
            <CardTitle>Santé & Aptitude</CardTitle>
            <CardDescription>
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

        {/* Notes Internes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Notes Internes</CardTitle>
            <CardDescription>Observations et commentaires RH</CardDescription>
          </CardHeader>
          <CardContent>
            {employee.notesInternes ? (
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {employee.notesInternes}
                </p>
              </div>
            ) : (
              <div className="flex h-full min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                <StickyNote className="mb-2 h-8 w-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground italic">
                  Aucune note renseignée.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

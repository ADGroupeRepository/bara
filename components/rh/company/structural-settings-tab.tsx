"use client"

import { Settings2, Globe, Clock, Coins, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel, FieldContent, FieldDescription } from "@/components/ui/field"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function StructuralSettingsTab() {
  return (
    <div className="grid gap-6 py-4 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-primary" />
            <CardTitle>Configuration Structurelle</CardTitle>
          </div>
          <CardDescription>
            Définissez les paramètres avancés de l&apos;organisation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <div className="grid gap-6">
            <Field className="flex flex-row items-center justify-between rounded-lg border p-4 space-y-0">
               <div className="space-y-0.5">
                  <FieldLabel className="text-base">Hiérarchie complexe</FieldLabel>
                  <FieldDescription>
                    Autoriser les structures organisationnelles à plusieurs niveaux de parenté.
                  </FieldDescription>
               </div>
               <FieldContent>
                  <Switch defaultChecked />
               </FieldContent>
            </Field>

            <Field className="flex flex-row items-center justify-between rounded-lg border p-4 space-y-0">
               <div className="space-y-0.5">
                  <FieldLabel className="text-base">Centres de coûts</FieldLabel>
                  <FieldDescription>
                    Activer la gestion budgétaire et les centres de coûts par département.
                  </FieldDescription>
               </div>
               <FieldContent>
                  <Switch />
               </FieldContent>
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  Fuseau horaire
                </FieldLabel>
                <FieldContent>
                  <Select defaultValue="utc">
                    <SelectTrigger className="h-10 border-slate-200">
                      <SelectValue placeholder="Choisir un fuseau..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">(GMT+00:00) Abidjan, Monrovia, Reykjavik</SelectItem>
                      <SelectItem value="cet">(GMT+01:00) Paris, Berlin, Rome</SelectItem>
                      <SelectItem value="cat">(GMT+02:00) Johannesburg, Cairo</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  Devise de référence
                </FieldLabel>
                <FieldContent>
                  <Select defaultValue="xof">
                    <SelectTrigger className="h-10 border-slate-200">
                      <SelectValue placeholder="Choisir une devise..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xof">Franc CFA (XOF)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="usd">Dollar (US$)</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>
            </div>

            <Field>
               <FieldLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Premier jour de la semaine
               </FieldLabel>
               <FieldContent>
                  <Select defaultValue="monday">
                    <SelectTrigger className="h-10 border-slate-200">
                      <SelectValue placeholder="Choisir un jour..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Lundi</SelectItem>
                      <SelectItem value="sunday">Dimanche</SelectItem>
                    </SelectContent>
                  </Select>
               </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-100 bg-amber-50/30">
        <CardHeader className="pb-3 border-b-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-amber-900">Zone de protection</CardTitle>
          </div>
          <CardDescription className="text-amber-700/70">
            Ces paramètres affectent l&apos;ensemble du système RH et des modules liés.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-amber-800 leading-relaxed mb-4">
            Modifier la structure fondamentale de l&apos;entreprise peut impacter le calcul de la paie, l&apos;organigramme et les habilitations des utilisateurs. Assurez-vous d&apos;avoir sauvegardé vos données avant de procéder à des changements majeurs.
          </p>
          <Button variant="outline" className="bg-white border-amber-200 hover:bg-amber-100 text-amber-900 shadow-none">
            Consulter les logs de modification
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-start gap-3 mt-2">
        <Button size="lg" className="px-8 shadow-md">Enregistrer les paramètres structurels</Button>
      </div>
    </div>
  )
}

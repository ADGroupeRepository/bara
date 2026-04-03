"use client"

import { Building2, Mail, Phone, Globe, MapPin, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function GeneralInfoTab() {
  return (
    <div className="grid gap-6 py-4">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Identité de l&apos;entreprise</CardTitle>
            </div>
            <CardDescription>
              Informations légales et administratives de votre structure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="companyName">Nom commercial</FieldLabel>
              <FieldContent>
                <Input id="companyName" defaultValue="AD Groupe" placeholder="Nom de l'entreprise" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="legalName">Raison sociale</FieldLabel>
              <FieldContent>
                <Input id="legalName" defaultValue="AD Groupe SARL" placeholder="Raison sociale" />
              </FieldContent>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="tin">NIF / Numéro fiscal</FieldLabel>
                <FieldContent>
                  <Input id="tin" defaultValue="1234567A" placeholder="NIF" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="registration">RCCM</FieldLabel>
                <FieldContent>
                  <Input id="registration" defaultValue="CI-ABJ-01-2024-B12" placeholder="RCCM" />
                </FieldContent>
              </Field>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-primary" />
              <CardTitle>Siège & Contact</CardTitle>
            </div>
            <CardDescription>
              Coordonnées principales et adresse légale.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="address">Adresse du siège</FieldLabel>
              <FieldContent>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="address" className="pl-9" defaultValue="Abidjan, Le Plateau, Avenue Marchand" />
                </div>
              </FieldContent>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" className="pl-9" defaultValue="+225 07 00 00 00 00" />
                  </div>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email de contact</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" className="pl-9" defaultValue="contact@adgroupe.ci" />
                  </div>
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="website">Site web</FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="website" className="pl-9" defaultValue="https://www.adgroupe.ci" />
                </div>
              </FieldContent>
            </Field>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Annuler les modifications</Button>
        <Button>Enregistrer les informations</Button>
      </div>
    </div>
  )
}

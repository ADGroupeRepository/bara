"use client"

import {
  User,
  Briefcase,
  FileText,
  Phone,
  StickyNote,
} from "lucide-react"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

import type { EmployeeProfile as EmployeeProfileType } from "./mock-data"
import { ProfileHeader } from "./profile-header"
import { TabOverview } from "./tabs/tab-overview"
import { TabContract } from "./tabs/tab-contract"
import { TabDocuments } from "./tabs/tab-documents"
import { TabEmergency } from "./tabs/tab-emergency"
import { TabNotes } from "./tabs/tab-notes"

type EmployeeProfileProps = {
  readonly employee: EmployeeProfileType
}

export function EmployeeProfile({ employee }: EmployeeProfileProps) {
  return (
    <div className="flex-1 space-y-6 px-6 pt-6 pb-8">
      <ProfileHeader employee={employee} />

      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">
            <User className="h-4 w-4" />
            Résumé
          </TabsTrigger>
          <TabsTrigger value="contract">
            <Briefcase className="h-4 w-4" />
            Contrat & Salaire
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4" />
            Dossier & Formation
          </TabsTrigger>
          <TabsTrigger value="emergency">
            <Phone className="h-4 w-4" />
            Contacts d&apos;urgence
          </TabsTrigger>
          <TabsTrigger value="notes">
            <StickyNote className="h-4 w-4" />
            Notes & Santé
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <TabOverview employee={employee} />
        </TabsContent>
        <TabsContent value="contract" className="mt-6">
          <TabContract employee={employee} />
        </TabsContent>
        <TabsContent value="documents" className="mt-6">
          <TabDocuments employee={employee} />
        </TabsContent>
        <TabsContent value="emergency" className="mt-6">
          <TabEmergency employee={employee} />
        </TabsContent>
        <TabsContent value="notes" className="mt-6">
          <TabNotes employee={employee} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

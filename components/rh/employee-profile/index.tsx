"use client"

import { useRef } from "react"
import { User, Briefcase, FileText, Phone, StickyNote, Clock, Banknote } from "lucide-react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import type { EmployeeProfile as EmployeeProfileType } from "./mock-data"
import { ProfileHeader } from "./profile-header"
import { TabOverview } from "./tabs/tab-overview"
import { TabContract } from "./tabs/tab-contract"
import { TabSalary } from "./tabs/tab-salary"
import { TabDocuments } from "./tabs/tab-documents"
import { TabEmergency } from "./tabs/tab-emergency"
import { TabNotes } from "./tabs/tab-notes"
import { TabSchedule } from "./tabs/tab-schedule"

type EmployeeProfileProps = {
  readonly employee: EmployeeProfileType
}

export function EmployeeProfile({ employee }: EmployeeProfileProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex-1 pb-8">
      <ProfileHeader employee={employee} />

      <Tabs defaultValue="overview" className="relative pt-4">
        <div
          ref={sentinelRef}
          className="pointer-events-none absolute top-4 right-0 left-0 h-px w-full"
        />
        <div
          className={cn(
            "sticky top-[80px] z-10 mb-4 bg-background px-6 transition-colors duration-200"
          )}
        >
          <TabsList variant={"line"}>
            <TabsTrigger value="overview">
              <User className="h-4 w-4" />
              Résumé
            </TabsTrigger>
            <TabsTrigger value="contract">
              <Briefcase className="h-4 w-4" />
              Contrat
            </TabsTrigger>
            <TabsTrigger value="salary">
              <Banknote className="h-4 w-4" />
              Paie
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Clock className="h-4 w-4" />
              Emploi du temps
            </TabsTrigger>
            <TabsTrigger value="emergency">
              <Phone className="h-4 w-4" />
              Coordonnées
            </TabsTrigger>
            <TabsTrigger value="notes">
              <StickyNote className="h-4 w-4" />
              Détails Personnels
            </TabsTrigger>
          </TabsList>
          <hr />
        </div>

        <TabsContent value="overview" className="px-6">
          <TabOverview employee={employee} />
        </TabsContent>
        <TabsContent value="contract" className="px-6">
          <TabContract employee={employee} />
        </TabsContent>
        <TabsContent value="salary" className="px-6">
          <TabSalary employee={employee} />
        </TabsContent>
        <TabsContent value="documents" className="px-6">
          <TabDocuments employee={employee} />
        </TabsContent>
        <TabsContent value="schedule" className="px-6">
          <TabSchedule employee={employee} />
        </TabsContent>
        <TabsContent value="emergency" className="px-6">
          <TabEmergency employee={employee} />
        </TabsContent>
        <TabsContent value="notes" className="px-6">
          <TabNotes employee={employee} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

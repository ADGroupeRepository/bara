"use client"

import Link from "next/link"
import { Info, ChevronLeft, Briefcase, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DesignationsTab } from "@/components/rh/settings/designations-tab"
import { ContractTypesTab } from "@/components/rh/settings/contract-types-tab"

export default function EmployeeSettingsPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6">
      <div className="flex items-start gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-9 w-9 rounded-full"
            >
              <Link href="/rh/employees">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Retour vers la liste des collaborateurs</p>
          </TooltipContent>
        </Tooltip>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              Paramètres des collaborateurs
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground/60 transition-colors hover:text-primary">
                  <Info className="h-4.5 w-4.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>
                  Paramétrage centralisé des structures de postes, des
                  catégories d&apos;emploi et des modèles de contrats
                  applicables à l&apos;ensemble des collaborateurs.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground">
            Configurez les paramètres globaux de l&apos;organisation RH et les
            types de contrats.
          </p>
        </div>
      </div>

      <Tabs defaultValue="postes">
        <TabsList
          variant="line"
          className="h-11 w-full justify-start gap-8 rounded-none border-b px-0"
        >
          <TabsTrigger value="postes" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Postes
          </TabsTrigger>
          <TabsTrigger value="types" className="gap-2">
            <FileText className="h-4 w-4" />
            Types de contrat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="postes" className="pt-4">
          <DesignationsTab />
        </TabsContent>

        <TabsContent value="types" className="pt-4">
          <ContractTypesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

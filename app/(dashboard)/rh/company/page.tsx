import { Info, Building2, MapPin, Network, Settings2 } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralInfoTab } from "@/components/rh/company/general-info-tab"
import { SitesTab } from "@/components/rh/company/sites-tab"
import { DepartmentsTab } from "@/components/rh/company/departments-tab"
import { StructuralSettingsTab } from "@/components/rh/company/structural-settings-tab"

export default function CompanyPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6 pb-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              Entreprise
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground/60 transition-colors hover:text-primary">
                  <Info className="h-4.5 w-4.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Gestion des entités légales, des branches et des établissements</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground">
            Configurez les informations sur votre entreprise, vos différentes agences et vos entités administratives.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="h-4 w-4" />
            Informations générales
          </TabsTrigger>
          <TabsTrigger value="sites" className="gap-2">
            <MapPin className="h-4 w-4" />
            Sites
          </TabsTrigger>
          <TabsTrigger value="deps" className="gap-2">
            <Network className="h-4 w-4" />
            Départements
          </TabsTrigger>
          <TabsTrigger value="structure" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Paramètres structurels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="pt-4">
          <GeneralInfoTab />
        </TabsContent>

        <TabsContent value="sites" className="pt-4">
          <SitesTab />
        </TabsContent>

        <TabsContent value="deps" className="pt-4">
          <DepartmentsTab />
        </TabsContent>

        <TabsContent value="structure" className="pt-4">
          <StructuralSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

import Link from "next/link"
import { Settings, Info } from "lucide-react"

import { EmployeesList } from "@/components/rh/employees-list"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function EmployeesPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              Collaborateurs
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground/60 transition-colors hover:text-primary">
                  <Info className="h-4.5 w-4.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Gestion centrale de l&apos;effectif et des contrats</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground">
            Gérez l&apos;ensemble des talents de votre organisation, leurs
            contrats et leurs informations personnelles.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild className="h-10 gap-2">
          <Link href="/rh/employees/settings">
            <Settings className="h-4 w-4" />
            Paramètres
          </Link>
        </Button>
      </div>
      <EmployeesList />
    </div>
  )
}

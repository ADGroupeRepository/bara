import { Info } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TeamsList } from "@/components/rh/teams-list"

export default function TeamsPage() {
  return (
    <div className="flex-1 space-y-4 px-6 pt-6 pb-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              Équipes
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground/60 transition-colors hover:text-primary">
                  <Info className="h-4.5 w-4.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Gestion des départements et des structures d&apos;équipes</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground">
            Visualisez et gérez la structure de vos équipes et départements.
          </p>
        </div>
      </div>
      
      <TeamsList />
    </div>
  )
}

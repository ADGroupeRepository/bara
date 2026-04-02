"use client"

import { useState, useMemo } from "react"
import { Search, Info, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DesignationDialog } from "./designation-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Designation {
  id: string
  name: string
  department: string
  employeeCount: number
}

const designations: Designation[] = [
  {
    id: "1",
    name: "Directeur Général",
    department: "Direction",
    employeeCount: 1,
  },
  {
    id: "2",
    name: "Responsable IT",
    department: "Informatique",
    employeeCount: 1,
  },
  {
    id: "3",
    name: "Développeur Full-Stack",
    department: "Informatique",
    employeeCount: 3,
  },
  {
    id: "4",
    name: "Comptable Principal",
    department: "Finance",
    employeeCount: 1,
  },
  {
    id: "5",
    name: "Chargée de Communication",
    department: "Communication",
    employeeCount: 2,
  },
  {
    id: "6",
    name: "Responsable RH",
    department: "Ressources Humaines",
    employeeCount: 1,
  },
  {
    id: "7",
    name: "Analyste Financier",
    department: "Finance",
    employeeCount: 2,
  },
  {
    id: "8",
    name: "Chef de Projet",
    department: "Informatique",
    employeeCount: 4,
  },
  {
    id: "9",
    name: "Assistant Administratif",
    department: "Direction",
    employeeCount: 2,
  },
  {
    id: "10",
    name: "Technicien Support",
    department: "Informatique",
    employeeCount: 2,
  },
  {
    id: "11",
    name: "Chef de Service RH",
    department: "Ressources Humaines",
    employeeCount: 1,
  },
  {
    id: "12",
    name: "Développeur Front-End",
    department: "Informatique",
    employeeCount: 2,
  },
  {
    id: "13",
    name: "Chargé de Mission",
    department: "Direction",
    employeeCount: 1,
  },
  {
    id: "14",
    name: "Gestionnaire de Formation",
    department: "Ressources Humaines",
    employeeCount: 1,
  },
]

export function DesignationsTab() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return designations
    const q = search.toLowerCase()
    return designations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight">
            Postes (Désignations)
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground/60 transition-colors hover:text-primary">
                <Info className="h-4.5 w-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p>
                Gérez les différents intitulés de postes au sein de
                l&apos;organisation.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-3">
          <InputGroup className="h-9 w-64">
            <InputGroupAddon>
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              className="text-xs"
              placeholder="Rechercher un poste..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <DesignationDialog />
        </div>
      </div>

      <div>
        <ScrollArea className="h-[calc(100vh-240px)] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] pl-4 font-semibold text-foreground">
                  Désignation
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Département / Service
                </TableHead>
                <TableHead className="w-[150px] text-center font-semibold text-foreground">
                  Employés
                </TableHead>
                <TableHead className="w-[220px] pr-4 text-right font-semibold text-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <TableRow key={item.id} className="group transition-colors">
                    <TableCell className="pl-4 font-medium text-foreground">
                      {item.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {item.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-medium tabular-nums">
                        {item.employeeCount}
                      </span>
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-muted-foreground"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Modifier
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Aucun poste trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

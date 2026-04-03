"use client"

import { useState, useMemo } from "react"
import { Search, Info, Pencil, Trash2, Users, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DepartmentDialog } from "./department-dialog"
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

interface Department {
  readonly id: string
  readonly name: string
  readonly parent: string | null
  readonly manager: string
  readonly employeeCount: number
}

const mockDepartments: Department[] = [
  {
    id: "D001",
    name: "Direction Générale",
    parent: null,
    manager: "Siaka Sylla",
    employeeCount: 3,
  },
  {
    id: "D002",
    name: "Ressources Humaines",
    parent: "Direction Générale",
    manager: "Fatou Bamba",
    employeeCount: 6,
  },
  {
    id: "D003",
    name: "Informatique",
    parent: "Direction Générale",
    manager: "Jean Dupont",
    employeeCount: 15,
  },
  {
    id: "D004",
    name: "Finance & Comptabilité",
    parent: "Direction Générale",
    manager: "Amadou Diallo",
    employeeCount: 10,
  },
  {
    id: "D005",
    name: "Développement Frontend",
    parent: "Informatique",
    manager: "Oumar Touré",
    employeeCount: 8,
  },
  {
    id: "D006",
    name: "Développement Backend",
    parent: "Informatique",
    manager: "Kouamé Koffi",
    employeeCount: 7,
  },
]

export function DepartmentsTab() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return mockDepartments
    const q = search.toLowerCase()
    return mockDepartments.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.manager.toLowerCase().includes(q) ||
        d.parent?.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight">
            Départements & Services
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground/60 transition-colors hover:text-primary">
                <Info className="h-4.5 w-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p>
                Gérez la structure hiérarchique de vos services et départements.
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
              placeholder="Rechercher un département..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <DepartmentDialog />
        </div>
      </div>

      <div>
        <ScrollArea className="h-[calc(100vh-280px)] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-slate-50/50">
                <TableHead className="w-[300px] pl-4 font-semibold text-foreground">
                  Département
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Hierarchie (Parent)
                </TableHead>
                <TableHead className="w-[180px] font-semibold text-foreground">
                  Responsable
                </TableHead>
                <TableHead className="w-[120px] text-center font-semibold text-foreground">
                  Effectif
                </TableHead>
                <TableHead className="w-[150px] pr-4 text-right font-semibold text-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <TableRow key={item.id} className="group transition-colors">
                    <TableCell className="pl-4">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                             <Users className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-foreground">{item.name}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                      {item.parent ? (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Network className="h-3 w-3" />
                          {item.parent}
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-[10px] py-0 font-normal">
                          Racine
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {item.manager}
                    </TableCell>
                    <TableCell className="text-center">
                       <span className="text-sm font-medium tabular-nums px-2 py-1 bg-slate-100 rounded-full">
                        {item.employeeCount}
                      </span>
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Aucun département trouvé.
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

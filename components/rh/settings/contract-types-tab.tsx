"use client"

import { Search, Pencil, Trash2, Info } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ContractTypeDialog } from "./contract-type-dialog"
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

interface ContractType {
  id: string
  name: string
  description: string
  employeeCount: number
}

const contractTypes: ContractType[] = [
  {
    id: "1",
    name: "CDI",
    description: "Contrat à Durée Indéterminée",
    employeeCount: 42,
  },
  {
    id: "2",
    name: "CDD",
    description: "Contrat à Durée Déterminée",
    employeeCount: 8,
  },
  {
    id: "3",
    name: "Stage",
    description: "Contrat de stage",
    employeeCount: 5,
  },
  {
    id: "4",
    name: "Prestation",
    description: "Consultant externe / Freelance",
    employeeCount: 3,
  },
]

export function ContractTypesTab() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return contractTypes
    const q = search.toLowerCase()
    return contractTypes.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div>
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight">Types de contrat</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground/60 transition-colors hover:text-primary">
                <Info className="h-4.5 w-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p>
                Définissez les différents types de contrats de travail
                applicables.
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
              placeholder="Rechercher un contrat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <ContractTypeDialog />
        </div>
      </div>

      <div>
        <ScrollArea className="h-[calc(100vh-240px)] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] pl-4 font-semibold text-foreground">
                  Code / Nom
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Description
                </TableHead>
                <TableHead className="w-[150px] text-center font-semibold text-foreground">
                  Collaborateurs
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
                      <Badge
                        variant="outline"
                        className="px-2 py-0.5 font-bold"
                      >
                        {item.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.description}
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
                    Aucun type de contrat trouvé.
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

"use client"

import { useState, useMemo } from "react"
import { Search, Info, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradeDialog } from "./grade-dialog"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Grade {
  id: string
  name: string
  level: number
}

const grades: Grade[] = [
  { id: "1", name: "Grade 1", level: 1 },
  { id: "2", name: "Grade 2", level: 2 },
  { id: "3", name: "Grade 3", level: 3 },
  { id: "4", name: "Grade 4", level: 4 },
  { id: "5", name: "Grade 5", level: 5 },
]

export function GradesTab() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return grades
    const q = search.toLowerCase()
    return grades.filter(
      (g) =>
        g.name.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight">
            Grades
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground/60 transition-colors hover:text-primary">
                <Info className="h-4.5 w-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p>
                Gérez les différents grades permettant de classifier les niveaux d&apos;expérience des collaborateurs.
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
              placeholder="Rechercher un grade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <GradeDialog />
        </div>
      </div>

      <div>
        <ScrollArea className="h-[calc(100vh-240px)] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-4 font-semibold text-foreground">
                  Nom du Grade
                </TableHead>
                <TableHead className="w-[150px] text-center font-semibold text-foreground">
                  Niveau
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
                    <TableCell className="text-center font-medium tabular-nums">
                      {item.level}
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
                    colSpan={3}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Aucun grade trouvé.
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

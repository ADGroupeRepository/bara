"use client"

import { useState } from "react"
import { Search, Folder, FileText, Eye, Download } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { EmployeeProfile } from "../mock-data"
import { Icons } from "@/components/layout/sidebar/icons"

type TabDocumentsProps = {
  readonly employee: EmployeeProfile
}

export function TabDocuments({ employee }: TabDocumentsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  const currentFolderId = searchParams.get("folder")
  const currentFolder = employee.folderDocuments?.find(
    (f) => f.id === currentFolderId
  )

  const handleFolderClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("folder", id)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const filteredFolders =
    employee.folderDocuments?.filter((folder) =>
      folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

  const filteredFiles =
    currentFolder?.files.filter((file) =>
      file.label.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={
              currentFolder ? "Rechercher un fichier" : "Rechercher un dossier"
            }
            className="w-[400px] pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-x-2">
          <Icons.Doc className="size-6" />
          <h3 className="font-semibold">{currentFolder?.name}</h3>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-240px)] rounded-md border">
        <div className="space-y-4">
          {currentFolder ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-auto py-4 text-sm font-bold text-foreground">
                    Fichier
                  </TableHead>
                  <TableHead className="h-auto py-4 text-sm font-bold text-foreground">
                    Taille
                  </TableHead>
                  <TableHead className="h-auto py-4 pr-6 text-sm font-bold text-foreground">
                    Ajouté le
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <TableRow key={file.id} className="group cursor-pointer">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="size-5" />
                          <div>{file.label}</div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-sm">
                        {file.fileSize}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-sm">{file.uploadedAt}</span>
                      </TableCell>
                      <TableCell className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-32 text-center text-muted-foreground italic"
                    >
                      {searchQuery
                        ? "Aucun fichier correspondant"
                        : "Ce dossier est vide"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-auto py-4 text-sm font-bold">
                    Nom
                  </TableHead>
                  <TableHead className="h-auto py-4 text-sm font-bold">
                    Status du dossier
                  </TableHead>
                  <TableHead className="h-auto py-4 pr-6 text-right text-sm font-bold">
                    Dernière modification
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFolders.length > 0 ? (
                  filteredFolders.map((folder) => (
                    <TableRow
                      key={folder.id}
                      className="group cursor-pointer"
                      onClick={() => handleFolderClick(folder.id)}
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                            <Icons.Doc className="size-6" />
                          </div>
                          <span className="text-[14.5px] decoration-primary underline-offset-4 transition-colors group-hover:underline">
                            {folder.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant="secondary"
                          className={
                            folder.status === "Complet"
                              ? "min-w-[85px] justify-center rounded-md bg-emerald-50 px-4 py-4 text-emerald-600 hover:bg-emerald-50"
                              : "min-w-[85px] justify-center rounded-md bg-rose-50 px-4 py-4 text-rose-600 hover:bg-rose-50"
                          }
                        >
                          {folder.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 pr-6 text-right text-sm">
                        {folder.updatedAt}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-32 text-center text-muted-foreground italic"
                    >
                      Aucun dossier trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

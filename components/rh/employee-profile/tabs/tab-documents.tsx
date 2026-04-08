"use client"

import { useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import type { EmployeeProfile } from "../mock-data"
import { Icons } from "@/components/layout/sidebar/icons"

type TabDocumentsProps = {
  readonly employee: EmployeeProfile
}

export function TabDocuments({ employee }: TabDocumentsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [expiryDate, setExpiryDate] = useState<Date>()

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
        <div className="flex h-10 w-full items-center justify-between">
          {currentFolder ? (
            <>
              <div className="flex items-center gap-x-3 text-sm">
                <button
                  onClick={() => router.back()}
                  className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                >
                  Tout les dossiers
                </button>
                <span className="text-muted-foreground/30">/</span>
                <div className="flex items-center gap-x-2">
                  <Icons.Doc className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">
                    {currentFolder.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <ExpirationDateDialog
                  expiryDate={expiryDate}
                  onExpiryChange={setExpiryDate}
                />

                <div className="flex h-10 items-center gap-x-3 rounded-md border pr-4 transition-colors hover:bg-muted/50">
                  <Label
                    htmlFor="complete-toggle"
                    className="h-full cursor-pointer pl-4 text-sm font-medium select-none"
                  >
                    Marquer le dossier comme complet
                  </Label>
                  <Switch
                    id="complete-toggle"
                    checked={isComplete}
                    onCheckedChange={setIsComplete}
                  />
                </div>
              </div>
            </>
          ) : (
            <Input
              placeholder="Rechercher un dossier"
              className="w-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-280px)] rounded-lg border">
        <div className="space-y-4">
          {currentFolder ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Fichier</TableHead>
                  <TableHead className="font-bold">Taille</TableHead>
                  <TableHead className="font-bold">Ajouté le</TableHead>
                  <TableHead className="pr-6 text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <TableRow key={file.id} className="group cursor-pointer">
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <Icons.Documents />
                          <span>{file.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>{file.fileSize}</TableCell>
                      <TableCell>{file.uploadedAt}</TableCell>
                      <TableCell className="pr-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Button variant="secondary" size="icon">
                            <Icons.Eye className="size-5" />
                          </Button>
                          <Button variant="secondary" size="icon">
                            <Icons.Download className="size-5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-32 text-center text-xs text-muted-foreground italic"
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
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-bold">Nom</TableHead>
                  <TableHead className="font-bold">Statut</TableHead>
                  <TableHead className="pr-6 text-right font-bold">
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
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <Icons.Doc className="size-6" />
                          <span className="decoration-primary underline-offset-4 transition-colors group-hover:underline">
                            {folder.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "h-9 rounded-md px-4",
                            folder.status === "Complet"
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
                              : "bg-rose-50 text-rose-600 hover:bg-rose-50"
                          )}
                        >
                          {folder.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 pr-6 text-right">
                        {folder.updatedAt}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-32 text-center">
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

function ExpirationDateDialog({
  expiryDate,
  onExpiryChange,
}: {
  expiryDate: Date | undefined
  onExpiryChange: (date: Date | undefined) => void
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={expiryDate ? "secondary" : "outline"}
          className={cn("", expiryDate && "border-muted bg-muted")}
        >
          <Icons.Calendar className="size-4" />
          <span>
            {expiryDate
              ? `Expire le ${format(expiryDate, "dd MMM yyyy", { locale: fr })}`
              : "Ajouter une date d'expiration"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Date d&apos;expiration</DialogTitle>
          <DialogDescription>
            Définissez une date limite de validité pour ce dossier de documents.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-2">
          <Calendar
            mode="single"
            selected={expiryDate}
            onSelect={onExpiryChange}
            locale={fr}
            className="rounded-md border shadow-none"
          />
        </div>
        <DialogFooter className="flex-row items-center justify-between sm:justify-between">
          {expiryDate && (
            <Button
              variant="destructive"
              onClick={() => onExpiryChange(undefined)}
            >
              Supprimer
            </Button>
          )}
          {!expiryDate && <div />}
          <DialogClose asChild>
            <Button type="button">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

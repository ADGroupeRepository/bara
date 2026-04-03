"use client"

import { useRef, useState, useCallback } from "react"
import { Upload, FileText, Image as ImageIcon, X, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { DocumentSlot } from "./schema"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 Mo
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
]

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 o"
  const k = 1024
  const sizes = ["o", "Ko", "Mo", "Go"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

function getFileIcon(file: File) {
  if (file.type.startsWith("image/")) return ImageIcon
  return FileText
}

type FileUploadZoneProps = {
  readonly document: DocumentSlot
  readonly onFileSelect: (docId: string, file: File) => void
  readonly onFileRemove: (docId: string) => void
}

export function FileUploadZone({
  document: doc,
  onFileSelect,
  onFileRemove,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateAndSetFile = useCallback(
    (file: File) => {
      setError(null)

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Format non supporté. Utilisez PDF, JPG ou PNG.")
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(
          `Fichier trop volumineux (${formatFileSize(file.size)}). Maximum : 5 Mo.`
        )
        return
      }

      onFileSelect(doc.id, file)
    },
    [doc.id, onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) validateAndSetFile(file)
    },
    [validateAndSetFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) validateAndSetFile(file)
      if (inputRef.current) inputRef.current.value = ""
    },
    [validateAndSetFile]
  )

  // ── File loaded state ──────────────────────────────────────────────────────
  if (doc.file) {
    const FileIcon = getFileIcon(doc.file)
    return (
      <div className="relative flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 transition-all duration-200">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <FileIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{doc.file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(doc.file.size)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <CheckCircle className="h-4 w-4 text-primary" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onFileRemove(doc.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // ── Empty / drag state ─────────────────────────────────────────────────────
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200",
        isDragging
          ? "scale-[1.02] border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/40 hover:bg-muted/50"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleInputChange}
        className="sr-only"
      />
      <div
        className={cn(
          "rounded-full p-3 transition-colors",
          isDragging ? "bg-primary/10" : "bg-muted"
        )}
      >
        <Upload
          className={cn(
            "h-5 w-5 transition-colors",
            isDragging ? "text-primary" : "text-muted-foreground"
          )}
        />
      </div>
      <div>
        <p className="text-sm font-medium">{doc.label}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Glissez-déposez ou cliquez — PDF, JPG, PNG — Max 5 Mo
        </p>
      </div>
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  )
}

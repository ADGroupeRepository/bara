"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type SelectOption = {
  readonly value: string
  readonly label: string
}

type EditableInfoRowProps = {
  readonly label: string
  readonly value: string | number | undefined
  readonly fieldKey: string
  readonly isEditing: boolean
  readonly onChange: (key: string, value: string) => void
  readonly type?: "text" | "date" | "email" | "tel" | "number" | "textarea"
  readonly options?: SelectOption[]
  readonly subValue?: string
  readonly badge?: boolean
  readonly badgeVariant?: "default" | "secondary" | "outline"
  readonly layout?: "vertical" | "horizontal"
  readonly placeholder?: string
}

export function EditableInfoRow({
  label,
  value,
  fieldKey,
  isEditing,
  onChange,
  type = "text",
  options,
  subValue,
  badge = false,
  badgeVariant = "default",
  layout = "vertical",
  placeholder,
}: EditableInfoRowProps) {
  if (!isEditing && !value && value !== 0) return null

  const isHorizontal = layout === "horizontal"

  return (
    <div
      className={cn(
        "flex gap-3",
        isHorizontal ? "items-center py-3 first:pt-0 last:pb-0" : "items-start"
      )}
    >
      <div
        className={cn(
          "min-w-0 flex-1",
          isHorizontal && "flex items-center justify-between"
        )}
      >
        <Label
          className={cn("", isHorizontal ? "w-48 shrink-0 font-medium" : "")}
        >
          {label}
        </Label>

        <div className={cn(isHorizontal ? "flex-1 text-right" : "mt-1")}>
          <div className={cn(!isHorizontal && "mt-1")}>
            {!isEditing ? (
              badge ? (
                <Badge variant={badgeVariant} className="text-[10px]">
                  {value}
                </Badge>
              ) : (
                <div
                  className={cn(
                    "flex w-full items-center rounded-md border border-input px-2.5 opacity-70",
                    type === "textarea" ? "min-h-[100px] py-2 items-start" : "h-10"
                  )}
                >
                  {value}
                </div>
              )
            ) : options ? (
              <Select
                value={String(value ?? "")}
                onValueChange={(v) => onChange(fieldKey, v)}
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    isHorizontal && "ml-auto max-w-[240px]"
                  )}
                >
                  <SelectValue
                    placeholder={
                      placeholder ?? `Sélectionner ${label.toLowerCase()}`
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="relative w-full">
                {type === "textarea" ? (
                  <textarea
                    value={String(value ?? "")}
                    onChange={(e) => onChange(fieldKey, e.target.value)}
                    className={cn(
                      "flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                      isHorizontal && "ml-auto max-w-[240px] text-right"
                    )}
                    placeholder={placeholder}
                  />
                ) : (
                  <Input
                    type={type}
                    value={String(value ?? "")}
                    onChange={(e) => onChange(fieldKey, e.target.value)}
                    className={cn(
                      "w-full",
                      isHorizontal && "ml-auto max-w-[240px] text-right"
                    )}
                    placeholder={placeholder}
                  />
                )}
              </div>
            )}
          </div>
          {subValue && !isEditing && <p className="mt-1">{subValue}</p>}
        </div>
      </div>
    </div>
  )
}

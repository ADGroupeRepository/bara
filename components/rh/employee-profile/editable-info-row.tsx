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
  readonly type?: "text" | "date" | "email" | "tel" | "number"
  readonly options?: SelectOption[]
  readonly subValue?: string
  readonly badge?: boolean
  readonly badgeVariant?: "default" | "secondary" | "outline"
  readonly layout?: "vertical" | "horizontal"
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
        <p
          className={cn(
            "",
            isHorizontal ? "w-48 shrink-0 text-sm font-medium" : "text-xs"
          )}
        >
          {label}
        </p>

        <div className={cn(isHorizontal ? "flex-1 text-right" : "mt-1")}>
          <div className={cn(!isHorizontal && "mt-1")}>
            {options ? (
              <Select
                value={String(value ?? "")}
                onValueChange={(v) => onChange(fieldKey, v)}
                disabled={!isEditing}
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    !isEditing && "",
                    isHorizontal && "ml-auto max-w-[240px]"
                  )}
                >
                  <SelectValue
                    placeholder={`Sélectionner ${label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : badge && !isEditing ? (
              <Badge variant={badgeVariant} className="text-[10px]">
                {value}
              </Badge>
            ) : (
              <div className="relative w-full">
                <Input
                  type={type}
                  value={String(value ?? "")}
                  onChange={(e) => onChange(fieldKey, e.target.value)}
                  disabled={!isEditing}
                  className={cn(
                    "w-full",
                    !isEditing && "",
                    isHorizontal && "ml-auto max-w-[240px] text-right"
                  )}
                />
                {!isEditing && <div className="absolute inset-0 z-10" />}
              </div>
            )}
          </div>
          {subValue && !isEditing && (
            <p className="mt-1 text-[10px] text-muted-foreground">{subValue}</p>
          )}
        </div>
      </div>
    </div>
  )
}

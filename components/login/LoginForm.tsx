"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(1, {
    message: "Le mot de passe est obligatoire.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)
      router.push("/")
    }, 2000)
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/logo.png" // Placeholder
          alt="Logo"
          width={275}
          height={275}
          className="object-contain"
        />
        <h1 className="pt-6 pb-2 text-3xl font-semibold tracking-tight">
          Bienvenue sur Courrier !
        </h1>
        <p className="text-sm text-muted-foreground">
          Content de vous revoir ! Veuillez saisir vos informations
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  placeholder="m@example.com"
                  className="h-12"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Mot de passe</FieldLabel>
                <InputGroup className="h-12">
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe"
                    {...field}
                    className="h-full border-0 focus:ring-0"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-end" className="pr-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                      <span className="sr-only">
                        {showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"}
                      </span>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex items-center justify-between">
          <Button variant="link" className="px-0">
            Mot de passe oublié ?
          </Button>
        </div>

        <Button type="submit" className="h-12 w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Se connecter
        </Button>
      </form>
    </div>
  )
}

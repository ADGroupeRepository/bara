"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SecurityBadge } from "./security-badge";
import {
  Scan,
  UploadCloud,
  CheckCircle2,
  Printer,
  ArrowRight,
  ArrowLeft,
  FileText,
  X,
  User,
  Building2,
  Send,
  Info,
} from "lucide-react";
import { mailSchema } from "../schema";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

// ─── DATA: Services & Personnel ───
const SERVICES_DATA = [
  {
    id: "secretariat-permanent",
    name: "Secrétariat Permanent",
    personnel: [
      { id: "p1", name: "Directeur DIALLO Ibrahim" },
      { id: "p2", name: "Chargé d'Études TOURE Mamadou" },
      { id: "p3", name: "Assistant KOFFI Jean" },
    ],
  },
  {
    id: "ressources-humaines",
    name: "Ressources Humaines",
    personnel: [
      { id: "p4", name: "Chef de Service BAMBA Adama" },
      { id: "p5", name: "Gestionnaire FOFANA Seydou" },
    ],
  },
  {
    id: "promotion-langue",
    name: "Promotion de la Langue",
    personnel: [
      { id: "p6", name: "Directeur COULIBALY Drissa" },
      { id: "p7", name: "Conseiller N'GUESSAN Yao" },
      { id: "p8", name: "Chargé de Mission OUATTARA Lassina" },
    ],
  },
  {
    id: "cooperation-internationale",
    name: "Coopération Internationale",
    personnel: [
      { id: "p9", name: "Chef de Département KOUASSI Amoin" },
      { id: "p10", name: "Chargé d'Études SYLLA Mariam" },
    ],
  },
  {
    id: "affaires-financieres",
    name: "Affaires Financières",
    personnel: [
      { id: "p11", name: "Directeur TRAORE Moussa" },
      { id: "p12", name: "Comptable KONAN Kouadio" },
    ],
  },
];

// Schema partiel pour le formulaire (sans les champs auto-générés)
const formSchema = mailSchema
  .pick({
    sender: true,
    recipientService: true,
    object: true,
    priority: true,
    senderType: true,
    officialName: true,
    identificationNumber: true,
    phone: true,
    email: true,
  })
  .extend({
    recipientPerson: z.string().optional(),
    senderPhone: z.string().min(8, "Numéro invalide"),
  });

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  onCancel?: () => void;
}

export function RegistrationForm({
  onCancel,
}: Readonly<RegistrationFormProps>) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scannedFile, setScannedFile] = useState<File | null>(null);
  const [generatedRef, setGeneratedRef] = useState<string | undefined>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "NORMAL",
    },
  });

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setScannedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file?.type === "application/pdf") setScannedFile(file);
  };

  const handleNextStep = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setStep(2);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const service = SERVICES_DATA.find((s) => s.id === serviceId);
    if (service) {
      form.setValue("recipientService", service.name);
      form.setValue("recipientPerson", "");
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data, scannedFile);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const uniqueId = `ARR-${format(new Date(), "yyyy-MM-dd")}-${Math.floor(
        Math.random() * 1000,
      )
        .toString()
        .padStart(4, "0")}`;
      setGeneratedRef(uniqueId);
      setShowSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setScannedFile(null);
    setGeneratedRef(undefined);
    setShowSuccess(false);
    setStep(1);
    setSelectedServiceId("");
    form.reset();
  };

  // ─── SUCCESS SCREEN ───
  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
        <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-center">
          Courrier Enregistré !
        </h2>
        <p className="text-muted-foreground text-center max-w-md">
          Le courrier a été numérisé, horodaté et sécurisé avec succès. Il est
          prêt à être transmis.
        </p>

        <SecurityBadge reference={generatedRef} />

        <div className="flex gap-4 pt-4">
          <Button variant="outline" className="gap-2" onClick={resetForm}>
            <Scan className="h-4 w-4" />
            Nouveau courrier
          </Button>
          <Button className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimer Récépissé
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Header with stepper */}
      <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Nouveau Courrier</h2>
            <p className="text-sm text-muted-foreground">
              Enregistrez un nouveau pli dans le registre officiel
            </p>
          </div>
          <div className="hidden sm:flex h-12 w-12 rounded-2xl border border-slate-100 dark:border-slate-800 items-center justify-center">
            <FileText className="h-6 w-6 text-slate-400" />
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between w-full px-4">
          {[1, 2].map((i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-4 group">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500",
                    step >= i
                      ? "bg-primary text-white scale-110"
                      : "bg-slate-100 text-slate-400",
                  )}
                >
                  {step > i ? <CheckCircle2 className="h-5 w-5" /> : i}
                </div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-[12px] uppercase tracking-[0.2em] font-black transition-all duration-500",
                      step >= i ? "text-primary" : "text-slate-300",
                    )}
                  >
                    {i === 1 ? "Informations" : "Document PDF"}
                  </span>
                  <div 
                    className={cn(
                      "h-0.5 w-0 transition-all duration-700 bg-primary/30 mt-1 rounded-full",
                      step === i && "w-full"
                    )}
                  />
                </div>
              </div>
              {i === 1 && (
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800 mx-8 hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            /* ─── STEP 1: FORM INPUTS ─── */
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8 space-y-8"
            >
              {/* ── Section: Expéditeur ── */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Expéditeur
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nom de l&apos;expéditeur *</Label>
                    <Input
                      placeholder="Ex: Jean Dupont"
                      {...form.register("sender")}
                      className="h-[52px]! bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-primary/20 transition-all font-medium"
                    />
                    {form.formState.errors.sender && (
                      <p className="text-xs font-medium text-destructive mt-1 flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        {form.formState.errors.sender.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Numéro de l&apos;expéditeur *</Label>
                    <Input
                      type="tel"
                      placeholder="Ex: 01 23 45 67 89"
                      {...form.register("senderPhone")}
                      className="h-[52px]! bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-primary/20 transition-all font-medium"
                    />
                    {form.formState.errors.senderPhone && (
                      <p className="text-xs font-medium text-destructive mt-1 flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        {form.formState.errors.senderPhone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Type de structure</Label>
                      <Select
                        onValueChange={(val) =>
                          form.setValue("senderType", val as FormData["senderType"])
                        }
                      >
                        <SelectTrigger className="w-full h-[52px]! px-4 flex items-center bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm font-medium">
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERSONNE">Personne Physique</SelectItem>
                          <SelectItem value="ENTREPRISE">Entreprise Privée</SelectItem>
                          <SelectItem value="ADMINISTRATION">Administration Publique</SelectItem>
                          <SelectItem value="ONG">ONG / Association</SelectItem>
                          <SelectItem value="AUTRE">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Nom officiel de la structure</Label>
                      <Input
                        placeholder="Raison sociale"
                        {...form.register("officialName")}
                        className="h-[52px]! px-4 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Numéro d&apos;identification</Label>
                    <Input
                      placeholder="Ex: RCCM, NCC, CNI..."
                      {...form.register("identificationNumber")}
                      className="h-[52px]! px-4 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Téléphone</Label>
                      <Input
                        type="tel"
                        placeholder="+225 XX XX XX XX XX"
                        {...form.register("phone")}
                        className="h-[52px]! px-4 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Email de contact</Label>
                      <Input
                        type="email"
                        placeholder="contact@exemple.ci"
                        {...form.register("email")}
                        className="h-[52px]! px-4 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800 mx-auto w-1/2" />

              {/* ── Section: Destinataire ── */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Send className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Destinataire
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Service destinataire *</Label>
                    <Select onValueChange={handleServiceChange}>
                      <SelectTrigger className="w-full h-[52px]! px-4 flex items-center bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm font-medium">
                        <SelectValue placeholder="Choisir un service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES_DATA.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.recipientService && (
                      <p className="text-xs font-medium text-destructive mt-1">
                        {form.formState.errors.recipientService.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Personne destinataire</Label>
                    <Select
                      disabled={!selectedServiceId}
                      onValueChange={(val) =>
                        form.setValue("recipientPerson", val)
                      }
                    >
                      <SelectTrigger className="w-full h-[52px]! px-4 flex items-center bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm font-medium">
                        <SelectValue
                          placeholder={
                            selectedServiceId
                              ? "Choisir un destinataire..."
                              : "Sélectionnez d'abord un service"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          <span className="font-semibold text-primary">👥 Tout le service</span>
                        </SelectItem>
                        {selectedService?.personnel.map((person) => (
                          <SelectItem key={person.id} value={person.id}>
                            {person.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800 mx-auto w-1/2" />

              {/* ── Section: Courrier ── */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Building2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Détails du Courrier
                  </h3>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Degré d&apos;urgence</Label>
                  {(() => {
                    const currentPriority = form.watch("priority") || "NORMAL";
                    const options = [
                      {
                        value: "NORMAL",
                        label: "Normal",
                        color:
                          "bg-white border-slate-200 text-slate-700 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-300",
                        activeColor: "ring-slate-400/30 border-slate-400",
                      },
                      {
                        value: "URGENT",
                        label: "Urgent",
                        color:
                          "bg-white border-slate-200 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-300",
                        activeColor: "ring-orange-400/30 border-orange-400",
                      },
                      {
                        value: "TRES_URGENT",
                        label: "Très Urgent",
                        color:
                          "bg-white border-slate-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
                        activeColor: "ring-red-400/30 border-red-400",
                      },
                    ];
                    return (
                      <div className="grid grid-cols-3 gap-4">
                        {options.map((option) => {
                          const isSelected = currentPriority === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                form.setValue(
                                  "priority",
                                  option.value as FormData["priority"],
                                )
                              }
                              className={cn(
                                "h-14 rounded-xl border text-sm font-bold transition-all duration-300 flex flex-col items-center justify-center gap-0.5",
                                isSelected
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-muted-foreground hover:border-slate-400",
                              )}
                            >
                              <span>{option.label}</span>
                              {isSelected && <div className="h-1 w-1 rounded-full bg-current" />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Objet du courrier *</Label>
                  <Textarea
                    className="min-h-[120px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Saisissez l&apos;objet détaillé..."
                    {...form.register("object")}
                  />
                  {form.formState.errors.object && (
                    <p className="text-xs font-medium text-destructive mt-1">
                      {form.formState.errors.object.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ─── STEP 2: PDF UPLOAD ─── */
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-6"
            >
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-lg font-bold">Numérisation</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full uppercase tracking-tighter">
                  <Info className="h-3 w-3" />
                  PDF uniquement
                </div>
              </div>

              {scannedFile ? (
                <div className="space-y-6">
                  {/* File info card */}
                  <div className="flex items-center gap-4 p-5 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 group">
                    <div className="h-14 w-14 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                      <FileText className="h-7 w-7 text-slate-400 dark:text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">
                        {scannedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {(scannedFile.size / 1024 / 1024).toFixed(2)} MB • Fichier prêt
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                      onClick={() => setScannedFile(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* PDF Preview */}
                  {scannedFile.type === "application/pdf" && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-border rounded-2xl overflow-hidden bg-black/5 dark:bg-black/20"
                    >
                      <iframe
                        src={
                          URL.createObjectURL(scannedFile) +
                          "#toolbar=0&navpanes=0"
                        }
                        className="w-full h-[450px]"
                        title="Aperçu"
                      />
                    </motion.div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full relative group"
                >
                  <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:border-primary/40 group-hover:bg-white dark:group-hover:bg-slate-900 min-h-[350px]">
                    <div className="h-24 w-24 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-8 transition-transform group-hover:scale-105">
                      <UploadCloud className="h-12 w-12 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight">
                      Glissez votre document ici
                    </h3>
                    <p className="text-sm text-muted-foreground mb-8 max-w-[240px] leading-relaxed">
                      ou cliquez pour explorer vos fichiers locaux
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-border" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                        PDF Scanné
                      </span>
                      <div className="h-px w-8 bg-border" />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </div>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with action buttons */}
      <div className="px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
        {step === 1 ? (
          <>
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-[52px]! rounded-xl font-bold bg-transparent"
              onClick={onCancel}
            >
              Fermer
            </Button>
            <Button 
              type="button" 
              className="flex-1 h-[52px]! rounded-xl font-bold gap-2" 
              onClick={handleNextStep}
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-[52px]! rounded-xl font-bold bg-transparent gap-2"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <Button
              type="button"
              className="flex-1 h-[52px]! rounded-xl font-bold gap-2"
              disabled={isSubmitting || !scannedFile}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Scan className="h-4 w-4" />
                  </motion.div>
                  Traitement...
                </>
              ) : (
                <>
                  Valider l&apos;Enregistrement
                  <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

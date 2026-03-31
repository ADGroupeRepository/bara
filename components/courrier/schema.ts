import { z } from "zod";

export const mailPrioritySchema = z.enum(["NORMAL", "URGENT", "TRES_URGENT"]);
export const mailConfidentialitySchema = z.enum([
  "NORMAL",
  "CONFIDENTIEL",
  "SECRET",
]);
export const mailTypeSchema = z.enum([
  "COURRIER_ARRIVEE",
  "NOTE_INTERNE",
  "COURRIER_DEPART",
]);
export const mailStatusSchema = z.enum([
  "ENREGISTRE",
  "TRANSMIS",
  "EN_TRAITEMENT",
  "CLOTURE",
  "ARCHIVE",
]);

export const mailSchema = z.object({
  id: z.string(),
  reference: z.string(),
  receivedAt: z.date(),
  sender: z.string().min(2, "L'expéditeur est requis"),
  senderOrganization: z.string().optional(),
  recipientService: z.string().min(2, "Le service destinataire est requis"),
  object: z.string().min(5, "L'objet doit être explicite"),
  senderType: z
    .enum(["PERSONNE", "ENTREPRISE", "ADMINISTRATION", "ONG", "AUTRE"])
    .optional(),
  officialName: z.string().optional(),
  identificationNumber: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  emittedAt: z.date().optional(),
  type: mailTypeSchema,
  priority: mailPrioritySchema,
  confidentiality: mailConfidentialitySchema,
  status: mailStatusSchema,
  scanUrl: z.string().optional(),
  pageCount: z.number().int().min(1).default(1),
  read: z.boolean().default(false),
  registeredBy: z.string(),
  history: z
    .array(
      z.object({
        date: z.date(),
        action: z.string(),
        user: z.string(),
        details: z.string().optional(),
      }),
    )
    .optional(),
});

export type Mail = z.infer<typeof mailSchema>;
export type MailType = z.infer<typeof mailTypeSchema>;
export type MailPriority = z.infer<typeof mailPrioritySchema>;
export type MailConfidentiality = z.infer<typeof mailConfidentialitySchema>;
export type MailStatus = z.infer<typeof mailStatusSchema>;

"use client";

import { useRouter } from "next/navigation";
import { RegistrationForm } from "@/components/courrier/registration/registration-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-white dark:bg-slate-950 overflow-y-auto">
      {/* Background Decorative Elements - Removed for flat look */}


      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-transparent">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push("/")}
          className="group hover:bg-white/50 dark:hover:bg-slate-900/50 backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour au tableau de bord
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-start justify-center p-4 sm:p-8 pt-0 sm:pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          <Card className="overflow-visible border-none bg-white dark:bg-slate-900 shadow-none! ring-0">
            <RegistrationForm onCancel={() => router.push("/")} />
          </Card>
        </motion.div>
      </main>

      {/* Footer Decoration */}
      <footer className="relative z-10 p-6 text-center">
        <p className="text-xs text-muted-foreground/60">
          Commission Nationale de la Francophonie &copy; {new Date().getFullYear()} — Système de Gestion Intégré
        </p>
      </footer>
    </div>
  );
}

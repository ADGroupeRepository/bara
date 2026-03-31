"use client";

import { Lock, Loader2 } from "lucide-react";

interface SecurityBadgeProps {
  reference?: string;
  loading?: boolean;
}

export function SecurityBadge({ reference, loading }: SecurityBadgeProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-3 py-1 rounded-full text-xs animate-pulse">
        <Loader2 className="h-3 w-3 animate-spin" />
        Génération du jeton sécurisé...
      </div>
    );
  }

  if (!reference) return null;

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg animate-in zoom-in duration-300">
      <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-lg tracking-wider font-mono">
        <Lock className="h-5 w-5" />
        {reference}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-green-600/60 font-medium">
        Enregistrement Immuable Certifié
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { MailList } from "./mail-list";
import { MailDisplay } from "./mail-display";
import { useMail } from "./use-mail";
import { Archive, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "../registration/registration-form";

export function MailLayout() {
  const { selectedMailId, selectedMails, setSelectedMails, filter, setFilter } = useMail();

  const isOpen = !!selectedMailId;
  const isRegister = filter === "register";

  return (
    <div className="flex-1 overflow-hidden min-h-0 relative bg-white dark:bg-slate-950">
      {/* Mail List — slides left when mail is opened */}
      <div
        className="absolute inset-0 flex flex-col bg-white dark:bg-slate-950 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: isOpen || isRegister ? "translateX(-30%)" : "translateX(0)",
          opacity: isOpen || isRegister ? 0 : 1,
          pointerEvents: isOpen || isRegister ? "none" : "auto",
        }}
      >
        <div className="px-4 h-[57.5px] border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {filter === "inbox" && "Boîte de réception"}
              {filter === "drafts" && "Brouillons"}
              {filter === "sent" && "Envoyés"}
              {filter === "favorites" && "Favoris"}
              {filter === "trash" && "Corbeille"}
              {filter === "archive" && "Archives"}
              {filter === "correspondent" && "Correspondant"}
              {filter === "discussions" && "Discussions"}
            </h2>
            {selectedMails.length > 0 && (
              <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
                {selectedMails.length} sélectionné(s)
              </span>
            )}
          </div>

          {selectedMails.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMails([])}
              >
                Annuler
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Archiver</span>
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Supprimer</span>
              </Button>
            </div>
          )}
        </div>
        <MailList />
      </div>

      {/* Mail Display — slides in from right */}
      <div
        className="absolute inset-0 flex flex-col bg-white dark:bg-slate-950 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: isOpen && !isRegister ? "translateX(0)" : "translateX(30%)",
          opacity: isOpen && !isRegister ? 1 : 0,
          pointerEvents: isOpen && !isRegister ? "auto" : "none",
        }}
      >
        <MailDisplay />
      </div>

      {/* Registration Form — slides in from right */}
      <div
        className="absolute inset-0 flex flex-col bg-white dark:bg-slate-950 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: isRegister ? "translateX(0)" : "translateX(30%)",
          opacity: isRegister ? 1 : 0,
          pointerEvents: isRegister ? "auto" : "none",
        }}
      >
        <RegistrationForm onCancel={() => setFilter("inbox")} />
      </div>
    </div>
  );
}

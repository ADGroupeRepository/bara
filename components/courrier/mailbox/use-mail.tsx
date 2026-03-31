"use client";

import React, { createContext, useContext, useState } from "react";
import { mails, Mail } from "./data";

type MailFilter =
  | "inbox"
  | "sent"
  | "drafts"
  | "trash"
  | "archive"
  | "favorites"
  | "correspondent"
  | "discussions"
  | "register";

type MailContextType = {
  selectedMailId: string | null;
  setSelectedMailId: (id: string | null) => void;
  selectedMails: string[];
  setSelectedMails: React.Dispatch<React.SetStateAction<string[]>>;
  starredMails: string[];
  setStarredMails: React.Dispatch<React.SetStateAction<string[]>>;
  filter: MailFilter;
  setFilter: (filter: MailFilter) => void;
  mails: Mail[];
};

const MailContext = createContext<MailContextType | undefined>(undefined);

export function MailProvider({ children }: { children: React.ReactNode }) {
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);
  const [selectedMails, setSelectedMails] = useState<string[]>([]);
  const [starredMails, setStarredMails] = useState<string[]>([]);
  const [filter, setFilter] = useState<MailFilter>("inbox");

  return (
    <MailContext.Provider
      value={{
        selectedMailId,
        setSelectedMailId,
        selectedMails,
        setSelectedMails,
        starredMails,
        setStarredMails,
        filter,
        setFilter,
        mails,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}

export function useMail() {
  const context = useContext(MailContext);
  if (!context) {
    throw new Error("useMail must be used within a MailProvider");
  }
  return context;
}

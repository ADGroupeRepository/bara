"use client";

import { MailLayout } from "@/components/courrier/mailbox/mail-layout";
import { useMail } from "@/components/courrier/mailbox/use-mail";
import { useEffect } from "react";

export default function FavoritesPage() {
  const { setFilter } = useMail();

  useEffect(() => {
    setFilter("favorites");
  }, [setFilter]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <MailLayout />
    </div>
  );
}

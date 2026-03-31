"use client";

import { MailLayout } from "@/components/courrier/mailbox/mail-layout";
import { useMail } from "@/components/courrier/mailbox/use-mail";
import { useEffect } from "react";

export default function SentPage() {
  const { setFilter } = useMail();

  useEffect(() => {
    setFilter("sent");
  }, [setFilter]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <MailLayout />
    </div>
  );
}

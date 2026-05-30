"use client";

import { Copy, Share2, Users } from "lucide-react";
import { Shell } from "@/components/Shell";

export default function InvitePage() {
  const inviteUrl = typeof window !== "undefined" ? `${window.location.origin}?ref=friend` : "";

  return (
    <Shell>
      <section className="info-page invite-page">
        <div className="page-heading">
          <p className="eyebrow">Viral Growth</p>
          <h2>Invite friends and grow a bigger garden network.</h2>
        </div>
        <div className="invite-code">
          <Users size={25} />
          <span>{inviteUrl || "Loading invite link"}</span>
        </div>
        <button
          className="primary-action"
          onClick={() => navigator.clipboard.writeText(inviteUrl)}
          type="button"
        >
          <Copy size={21} />
          Copy Invite Link
        </button>
        <button
          className="secondary-action"
          onClick={() => navigator.share?.({ title: "ChainGarden", url: inviteUrl })}
          type="button"
        >
          <Share2 size={20} />
          Share
        </button>
      </section>
    </Shell>
  );
}

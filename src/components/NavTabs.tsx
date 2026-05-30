"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Sprout, Users } from "lucide-react";

const tabs = [
  { href: "/", label: "Garden", icon: Sprout },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/invite", label: "Invite", icon: Users },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="tabs" aria-label="Primary navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = pathname === tab.href;
        return (
          <Link className={active ? "active" : ""} href={tab.href} key={tab.href}>
            <Icon size={18} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

import type { ReactNode } from "react";
import { NavTabs } from "./NavTabs";
import { WalletBar } from "./WalletBar";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Base Mini App</p>
          <h1>ChainGarden</h1>
        </div>
        <WalletBar />
      </header>
      <NavTabs />
      {children}
    </main>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, LogOut, Wallet } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletBar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);

  const browserConnector = useMemo(
    () => connectors.find((connector) => connector.id === "injected"),
    [connectors],
  );

  useEffect(() => {
    if (isConnected || !browserConnector) return;
    if (localStorage.getItem("chaingarden:manual-disconnect") === "true") {
      return;
    }

    const ua = navigator.userAgent.toLowerCase();
    const looksLikeBaseApp =
      ua.includes("base") || ua.includes("coinbase") || window.ethereum?.isCoinbaseWallet;

    if (looksLikeBaseApp) {
      connect({ connector: browserConnector });
    }
  }, [browserConnector, connect, isConnected]);

  if (isConnected && address) {
    return (
      <button
        className="wallet-pill connected"
        onClick={() => {
          localStorage.setItem("chaingarden:manual-disconnect", "true");
          disconnect();
        }}
        type="button"
      >
        <Wallet size={18} />
        <span>{shortAddress(address)}</span>
        <LogOut size={16} />
      </button>
    );
  }

  return (
    <div className="wallet-menu">
      <button className="wallet-pill" onClick={() => setOpen((value) => !value)} type="button">
        <Wallet size={18} />
        <span>Connect Wallet</span>
        <ChevronDown size={16} />
      </button>

      {open ? (
        <div className="wallet-list">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              disabled={isPending}
              onClick={() => {
                localStorage.removeItem("chaingarden:manual-disconnect");
                connect({ connector });
                setOpen(false);
              }}
              type="button"
            >
              {connector.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

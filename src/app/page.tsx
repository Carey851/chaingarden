"use client";

import { useEffect, useMemo } from "react";
import { Droplets, Flower2, Loader2, Scissors, Shovel, Sparkles, Sun } from "lucide-react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import { BASE_DATA_SUFFIX } from "@/lib/wagmi";
import { CHAIN_GARDEN_ADDRESS, chainGardenAbi } from "@/lib/contract";
import { Shell } from "@/components/Shell";

type ActionName =
  | "plantSeed"
  | "waterPlant"
  | "fertilizePlant"
  | "removeWeeds"
  | "harvestPlant"
  | "clearGarden";

const actionCopy: Record<ActionName, { label: string; done: string }> = {
  plantSeed: { label: "Plant Seed", done: "A new garden is alive." },
  waterPlant: { label: "Water Plant", done: "Water added. Growth is visible." },
  fertilizePlant: { label: "Fertilize", done: "Fertilizer added. Level progress increased." },
  removeWeeds: { label: "Remove Weeds", done: "The plot is cleaner." },
  harvestPlant: { label: "Harvest", done: "Harvest collected. Planting can continue." },
  clearGarden: { label: "Clear Plot", done: "The garden is ready for a fresh start." },
};

function toNumber(value: unknown) {
  return Number(value ?? 0);
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data, refetch } = useReadContract({
    address: CHAIN_GARDEN_ADDRESS,
    abi: chainGardenAbi,
    functionName: "getGarden",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);

  const garden = {
    level: toNumber(data?.[0]),
    water: toNumber(data?.[1]),
    fertilizer: toNumber(data?.[2]),
    weedsRemoved: toNumber(data?.[3]),
    harvestCount: toNumber(data?.[4]),
    planted: Boolean(data?.[5]),
  };

  const primaryAction = useMemo<ActionName>(() => {
    if (!garden.planted) return "plantSeed";
    if (garden.water >= 3 && garden.fertilizer >= 2) return "harvestPlant";
    if (garden.water < 3) return "waterPlant";
    return "fertilizePlant";
  }, [garden.fertilizer, garden.planted, garden.water]);

  const runAction = (functionName: ActionName) => {
    writeContract({
      address: CHAIN_GARDEN_ADDRESS,
      abi: chainGardenAbi,
      functionName,
      chainId: base.id,
      dataSuffix: BASE_DATA_SUFFIX,
    });
  };

  const busy = isPending || isConfirming;
  const progress = garden.planted
    ? Math.min(100, Math.round(((Math.min(garden.water, 3) + Math.min(garden.fertilizer, 2)) / 5) * 100))
    : 0;

  return (
    <Shell>
      <section className="garden-stage">
        <div className="sun-bank">
          <Sun size={22} />
          <span>{garden.harvestCount * 25 + garden.level * 10}</span>
        </div>

        <div className="plot-grid" aria-label="Chain garden plot">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="soil-tile" key={index}>
              {index === 4 ? (
                garden.planted ? (
                  <div className="sunflower" style={{ transform: `scale(${Math.min(1.45, 0.8 + garden.level * 0.08)})` }}>
                    <div className="petals" />
                    <div className="face" />
                    <div className="stem" />
                    <div className="leaf left" />
                    <div className="leaf right" />
                  </div>
                ) : (
                  <Shovel className="empty-plot" size={34} />
                )
              ) : null}
            </div>
          ))}
        </div>

        <div className="garden-panel">
          <div>
            <p className="eyebrow">Instant Reward</p>
            <h2>{garden.planted ? `Level ${garden.level} Sunflower` : "Start a free garden"}</h2>
          </div>
          <div className="reward-line">
            <span>Sun Points</span>
            <strong>+{primaryAction === "harvestPlant" ? 50 : 10}</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <button
            className="primary-action"
            disabled={!isConnected || busy}
            onClick={() => runAction(primaryAction)}
            type="button"
          >
            {busy ? <Loader2 className="spin" size={21} /> : <Flower2 size={21} />}
            {isConnected ? actionCopy[primaryAction].label : "Connect Wallet First"}
          </button>
          <p className="status-copy">
            {isSuccess ? actionCopy[primaryAction].done : "Every move is a Base transaction with visible garden progress."}
          </p>
        </div>
      </section>

      <section className="quick-actions" aria-label="Garden actions">
        <button disabled={!garden.planted || busy} onClick={() => runAction("waterPlant")} type="button">
          <Droplets size={19} />
          <span>Water {garden.water}</span>
        </button>
        <button disabled={!garden.planted || busy} onClick={() => runAction("fertilizePlant")} type="button">
          <Sparkles size={19} />
          <span>Feed {garden.fertilizer}</span>
        </button>
        <button disabled={!garden.planted || busy} onClick={() => runAction("removeWeeds")} type="button">
          <Scissors size={19} />
          <span>Weed {garden.weedsRemoved}</span>
        </button>
      </section>
    </Shell>
  );
}

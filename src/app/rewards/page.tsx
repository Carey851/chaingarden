import { Flower2, Gift, Sun } from "lucide-react";
import { Shell } from "@/components/Shell";

const rewards = [
  { label: "First Plant", value: "+10 Sun", icon: Flower2 },
  { label: "Daily Care", value: "+10 Sun", icon: Sun },
  { label: "Harvest", value: "+50 Sun", icon: Gift },
];

export default function RewardsPage() {
  return (
    <Shell>
      <section className="info-page">
        <div className="page-heading">
          <p className="eyebrow">No Token Purchase</p>
          <h2>Earn visible garden rewards from the first action.</h2>
        </div>
        <div className="reward-cards">
          {rewards.map((reward) => {
            const Icon = reward.icon;
            return (
              <article key={reward.label}>
                <Icon size={24} />
                <span>{reward.label}</span>
                <strong>{reward.value}</strong>
              </article>
            );
          })}
        </div>
        <div className="wide-band">
          <h3>Growth Loop</h3>
          <p>Plant, water, fertilize, remove weeds, harvest, and clear the plot whenever you want. The garden keeps moving.</p>
        </div>
      </section>
    </Shell>
  );
}

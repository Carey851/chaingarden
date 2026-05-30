import { coinbaseWallet, injected } from "wagmi/connectors";
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";

export const BASE_APP_ID = "";
export const BASE_DATA_SUFFIX = "0x" as `0x${string}`;

const wagmiOptions = {
  chains: [base],
  connectors: [
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: "ChainGarden",
      appLogoUrl: "/icon.svg",
      preference: "all",
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  dataSuffix: BASE_DATA_SUFFIX,
} as const;

export const config = createConfig(wagmiOptions);

export const CHAIN_GARDEN_ADDRESS =
  "0xBe692b16654e6E26aA072Dec5c4b0D6A0cDBa173" as const;

export const chainGardenAbi = [
  {
    type: "function",
    name: "plantSeed",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "waterPlant",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "fertilizePlant",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "removeWeeds",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "harvestPlant",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "clearGarden",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "getGarden",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "level", type: "uint256" },
      { name: "water", type: "uint256" },
      { name: "fertilizer", type: "uint256" },
      { name: "weedsRemoved", type: "uint256" },
      { name: "harvestCount", type: "uint256" },
      { name: "planted", type: "bool" },
    ],
  },
] as const;

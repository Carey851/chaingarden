interface Window {
  ethereum?: import("viem").EIP1193Provider & {
    isCoinbaseWallet?: boolean;
    isMetaMask?: boolean;
    isOkxWallet?: boolean;
  };
}

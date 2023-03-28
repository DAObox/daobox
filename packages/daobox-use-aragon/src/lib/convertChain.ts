import { CHAINS } from "../constants";
import { SupportedChainIds, SupportedNetworks } from "../types";

export function convertChain<T extends SupportedChainIds | SupportedNetworks>(
  input: T
): T extends SupportedChainIds ? SupportedNetworks : SupportedChainIds {
  const entries = Object.entries(CHAINS);

  if (typeof input === "number") {
    const foundEntry = entries.find(([, chainId]) => chainId === input);
    return foundEntry?.[0] as SupportedNetworks as any;
  } else {
    return CHAINS[input as SupportedNetworks] as SupportedChainIds as any;
  }
}

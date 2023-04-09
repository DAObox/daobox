import { getDefaultClient } from "connectkit";
import { createClient } from "wagmi";
import { polygon, goerli } from "wagmi/chains";

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    chains: [goerli, polygon],
  })
);

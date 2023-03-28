import {
  ITokenVotingPluginInstall,
  TokenVotingClient,
} from "@aragon/sdk-client";
import { SupportedNetworks } from "../types";

export const encodeTokenVotingPlugin = (
  pluginInitParams: ITokenVotingPluginInstall,
  network: SupportedNetworks
) => {
  return TokenVotingClient.encoding.getPluginInstallItem(
    pluginInitParams,
    network
  );
};

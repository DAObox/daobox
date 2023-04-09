import {
  ContractVotingSettings,
  ITokenVotingPluginInstall,
  votingSettingsToContract,
} from "@aragon/sdk-client";
import { SupportedNetworks } from "../types";
import { AddressZero, CHAINS } from "../constants";
import { BigNumber } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { activeContractsList } from "@aragon/osx-ethers";
import { hexToBytes } from "../lib";

export const encodeTokenVotingPlugin = (
  pluginInitParams: ITokenVotingPluginInstall & {
    network: SupportedNetworks;
  }
) => {
  const { network, ...rest } = pluginInitParams;
  if (!Object.keys(CHAINS).includes(network)) {
    console.error(`Unsupported network ID: ${network}`);
  }

  const args = tokenVotingInitParamsToContract(rest);
  const hexBytes = defaultAbiCoder.encode(
    [
      "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
      "tuple(address addr, string name, string symbol) tokenSettings",
      "tuple(address[] receivers, uint256[] amounts) mintSettings",
    ],
    args
  );
  return {
    id: activeContractsList[network]["token-voting-repo"],
    data: hexToBytes(hexBytes),
  };
};

function tokenVotingInitParamsToContract(
  params: ITokenVotingPluginInstall
): any {
  let token: [string, string, string] = ["", "", ""];
  let balances: [string[], BigNumber[]] = [[], []];
  if (params.newToken) {
    token = [AddressZero, params.newToken.name, params.newToken.symbol];
    balances = [
      params.newToken.balances.map((balance) => balance.address),
      params.newToken.balances.map(({ balance }) => BigNumber.from(balance)),
    ];
  } else if (params.useToken) {
    token = [params.useToken?.address, "", ""];
  }
  return [
    Object.values(
      votingSettingsToContract(params.votingSettings)
    ) as ContractVotingSettings,
    token,
    balances,
  ];
}

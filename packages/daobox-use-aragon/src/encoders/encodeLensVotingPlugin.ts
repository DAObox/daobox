import { encodeRatio } from "../lib";
import { encodePluginInstallItem } from "./encodePluginInstallItem";
import { DAOBOX_PLUGIN_REPOS } from "../constants";

export interface LensVotingPluginParams {
  supportThreshold?: number; // Float between 0 and 1 ::  Default: 0.5
  minParticipation?: number; // Float between 0 and 1 ::  Default: 0.25
  votingMode?: number; // 0: STANDARD, 1: EARLY_EXECUTION, 2: VOTE_REPLACEMENT :: Default: 0
  minDuration?: number; // Default: 60 * 60 * 24 * 3 (3 days)
  minProposerVotingPower?: bigint; // Default: 0n
  lensFollowNFT: string;
  network: LensNetworks;
}

export type LensNetworks = "polygon" | "mumbai";

export const encodeLensVotingPlugin = ({
  supportThreshold = 0.5,
  minParticipation = 0.25,
  votingMode = 0,
  minDuration = 60 * 60 * 24 * 3,
  minProposerVotingPower = 0n,
  lensFollowNFT,
  network,
}: LensVotingPluginParams) => {
  return encodePluginInstallItem({
    repoAddress: DAOBOX_PLUGIN_REPOS.network[network].lensVoting,
    types: [
      "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
      "address votingToken",
    ],
    parameters: [
      {
        votingMode: votingMode,
        supportThreshold: encodeRatio(supportThreshold, 6),
        minParticipation: encodeRatio(minParticipation, 6),
        minDuration: minDuration,
        minProposerVotingPower: minProposerVotingPower,
      },
      lensFollowNFT,
    ],
  });
};

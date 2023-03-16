import {
  CreateMajorityVotingProposalParams,
  ProposalMetadata,
} from "@aragon/sdk-client";
import { UseMutationOptions, UseMutationResult } from "react-query";

export enum NewProposalStatus {
  IDLE = "idle",
  PINNING_METADATA = "pinningMetadata",
  CREATING_PROPOSAL = "creatingProposal",
  CONFIRMING_TRANSACTION = "confirmingTransaction",
  SUCCESS = "success",
  ERROR = "error",
}

export type ProposalParams = Omit<
  CreateMajorityVotingProposalParams,
  "metadataUri"
>;

export type UseNewProposalOptions = {
  options?: UseMutationOptions<
    void,
    unknown,
    { proposalMetadata: ProposalMetadata; proposalParams: ProposalParams },
    unknown
  >;
};

export type ProposalCreationArgs = {
  proposalMetadata: ProposalMetadata;
  proposalParams: ProposalParams;
};

export type NewProposalReturnType = {
  proposalId: string | null;
  proposalTxHash: string | null;
  proposalStatus: NewProposalStatus;
} & UseMutationResult<void, unknown, ProposalCreationArgs, unknown>;

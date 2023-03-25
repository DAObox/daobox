import { useState } from "react";
import { useMutation } from "react-query";
import {
  CreateMajorityVotingProposalParams,
  ProposalCreationSteps,
  ProposalMetadata,
} from "@aragon/sdk-client";

import { useAragon } from "../context";
import { MutationConfig } from "../types";

export function useNewProposal({
  title,
  summary,
  description,
  resources = [],
  media,
  startDate = new Date(0),
  endDate,
  executeOnPass,
  creatorVote,
  pluginAddress,
  actions = [],
  failSafeActions,
  onProposalTransaction,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseNewProposalParams) {
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [proposalTxHash, setProposalTxHash] = useState<string | null>(null);
  const [proposalStatus, setProposalStatus] = useState<NewProposalStatus>(
    NewProposalStatus.IDLE
  );
  const { tokenVotingClient: client } = useAragon();

  async function createProposalWrapper(
    newProposalParams: UseNewProposalParams
  ) {
    let proposalId: string | null = null;
    let proposalTxHash: string | null = null;
    if (!client) return Promise.reject("No client");
    try {
      setProposalStatus(NewProposalStatus.PINNING_METADATA);
      const metadata: ProposalMetadata = ({
        title,
        summary,
        description,
        resources,
        media,
      } = newProposalParams);
      const metadataUri = (await client.methods.pinMetadata(
        metadata
      )) as string;

      const steps = client?.methods.createProposal({
        ...newProposalParams,
        metadataUri,
      });

      setProposalStatus(NewProposalStatus.WATING_FOR_SIGER);
      for await (const step of steps) {
        switch (step.key) {
          case ProposalCreationSteps.CREATING:
            setProposalStatus(NewProposalStatus.CREATING_PROPOSAL);
            onProposalTransaction?.(step.txHash);
            setProposalTxHash(step.txHash);
            proposalTxHash = step.txHash;
            break;
          case ProposalCreationSteps.DONE:
            setProposalStatus(NewProposalStatus.SUCCESS);
            setProposalId(step.proposalId);
            proposalId = step.proposalId;
            break;
        }
      }
    } catch (err) {
      setProposalStatus(NewProposalStatus.ERROR);
      console.error(err);
    }
    return { proposalId, proposalTxHash };
  }

  return {
    ...useMutation({
      mutationKey: ["createProposal", pluginAddress, title],
      mutationFn: async () =>
        createProposalWrapper({
          title,
          summary,
          description,
          resources,
          media,
          startDate,
          endDate,
          executeOnPass,
          creatorVote,
          pluginAddress,
          actions,
          failSafeActions,
          onProposalTransaction,
        }),
      onError,
      onMutate,
      onSettled,
      onSuccess,
    }),
    proposalId,
    proposalTxHash,
    proposalStatus,
  };
}

export enum NewProposalStatus {
  IDLE = "idle",
  PINNING_METADATA = "pinningMetadata",
  CREATING_PROPOSAL = "creatingProposal",
  WATING_FOR_SIGER = "waitingForSigner",
  CONFIRMING_TRANSACTION = "confirmingTransaction",
  SUCCESS = "success",
  ERROR = "error",
}

export type UseNewProposalParams = ProposalMetadata &
  Omit<CreateMajorityVotingProposalParams, "metadataUri"> & {
    onProposalTransaction?: (proposalId: string) => void;
  } & MutationConfig<NewProposalReturnData, Error>;

export type NewProposalReturnData = {
  proposalId: string | null;
  proposalTxHash: string | null;
};

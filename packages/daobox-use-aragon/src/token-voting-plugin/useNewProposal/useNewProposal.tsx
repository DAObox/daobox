import { useState } from "react";
import { useMutation } from "react-query";
import { ProposalCreationSteps } from "@aragon/sdk-client";

import { useAragon } from "../../context";
import {
  UseNewProposalOptions,
  NewProposalStatus,
  ProposalCreationArgs,
  NewProposalReturnType,
} from "./types";

/**
 * Custom hook to create a new proposal.
 * @param {UseNewProposalOptions} [options] - Optional mutation options.
 * @returns {NewProposalReturnType}
 * An object containing the proposalId, proposalTxHash, proposalStatus, and the mutation.
 */
export function useNewProposal({
  options,
}: UseNewProposalOptions = {}): NewProposalReturnType {
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [proposalTxHash, setProposalTxHash] = useState<string | null>(null);
  const [proposalStatus, setProposalStatus] = useState<NewProposalStatus>(
    NewProposalStatus.IDLE
  );
  const { tokenVotingClient: client } = useAragon();

  const createProposal = async ({
    proposalMetadata,
    proposalParams,
  }: ProposalCreationArgs): Promise<void> => {
    if (!client) return Promise.reject("No client");
    try {
      setProposalStatus(NewProposalStatus.PINNING_METADATA);
      const metadataUri = (await client?.methods.pinMetadata(
        proposalMetadata
      )) as string;
      console.log({ metadataUri });

      const steps = client.methods.createProposal({
        ...proposalParams,
        metadataUri,
      });

      for await (const step of steps) {
        switch (step.key) {
          case ProposalCreationSteps.CREATING:
            setProposalStatus(NewProposalStatus.CREATING_PROPOSAL);
            setProposalTxHash(step.txHash);
            break;
          case ProposalCreationSteps.DONE:
            setProposalStatus(NewProposalStatus.SUCCESS);
            setProposalId(step.proposalId);
            break;
        }
      }
    } catch (err) {
      setProposalStatus(NewProposalStatus.ERROR);
      console.error(err);
    }
  };

  return {
    proposalId,
    proposalTxHash,
    proposalStatus,
    ...useMutation<void, unknown, ProposalCreationArgs, unknown>(
      createProposal,
      options
    ),
  };
}

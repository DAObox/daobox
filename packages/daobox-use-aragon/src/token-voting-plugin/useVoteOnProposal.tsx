import { useState } from "react";
import { useMutation } from "react-query";
import { IVoteProposalParams, VoteProposalStep } from "@aragon/sdk-client";

import { useAragon } from "../context";
import { MutationConfig } from "../types";

export function useVoteOnProposal({
  vote,
  proposalId,
  onVoteTransaction,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: IVoteProposalParams &
  MutationConfig<string | null, Error> & {
    onVoteTransaction?: (txHash: string) => void;
  }) {
  const [voteTxHash, setVoteTxHash] = useState<string | null>(null);
  const [voteStatus, setVoteStatus] = useState<VoteStatus>(VoteStatus.IDLE);
  const { tokenVotingClient: client } = useAragon();

  async function voteWrapper(
    voteParams: IVoteProposalParams,
    onVoteTransaction?: (txHash: string) => void
  ): Promise<string | null> {
    if (!client) return null;
    let txHash: string | null = null;
    setVoteStatus(VoteStatus.WAITING_FOR_SIGNER);
    const steps = client?.methods.voteProposal(voteParams);
    try {
      for await (const step of steps) {
        switch (step.key) {
          case VoteProposalStep.VOTING:
            onVoteTransaction?.(txHash as string);
            setVoteStatus(VoteStatus.CONFIRMING_TRANSACTION);
            txHash = step.txHash;
            break;
          case VoteProposalStep.DONE:
            setVoteStatus(VoteStatus.SUCCESS);
            break;
        }
      }
    } catch (err) {
      setVoteStatus(VoteStatus.ERROR);
      console.error(err);
      throw new Error("Error voting on proposal");
    }
    return txHash!;
  }

  return {
    ...useMutation({
      mutationKey: ["vote", proposalId],
      mutationFn: () => voteWrapper({ vote, proposalId }, onVoteTransaction),
      onError,
      onMutate,
      onSettled,
      onSuccess,
    }),
    voteTxHash,
    voteStatus,
  };
}

export enum VoteStatus {
  IDLE = "idle",
  WAITING_FOR_SIGNER = "waitingForSigner",
  CONFIRMING_TRANSACTION = "confirmingTransaction",
  SUCCESS = "success",
  ERROR = "error",
}

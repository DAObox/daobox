import { useVoteOnProposal, VoteValues } from "@daobox/use-aragon";
import React, { useState } from "react";
import { Terminal } from "../../components/Terminal";
import { daoAddressOrEns } from "../../constants";

const Index = () => {
  const [proposalId, setProposalId] = useState("");
  const [vote, setVote] = useState(null);

  const { mutate, voteStatus, error, data } = useVoteOnProposal({
    vote: 1,
    proposalId,
    onVoteTransaction(hash: string) {
      console.log("onVoteTransaction", hash);
    },
    onError(error: Error) {
      console.log("onError", error);
    },
  });

  const handleVote = (voteValue: any) => {
    setVote(voteValue);
    console.log(voteValue);
    mutate?.();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useVoteOnProposal</h1>
      <Terminal>
        <h2>DAO Address: {daoAddressOrEns}</h2>
        <h3>Enter Proposal ID and choose your vote:</h3>
        <input
          className="input-box"
          type="text"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          placeholder="Enter Proposal ID"
        />
        <div>
          <button
            onClick={() => handleVote(VoteValues.YES)}
            disabled={["waitingForSigner", "confirming"].includes(voteStatus)}
          >
            Yes
          </button>
          <button
            onClick={() => handleVote(VoteValues.NO)}
            disabled={["waitingForSigner", "confirming"].includes(voteStatus)}
          >
            No
          </button>
          <button
            onClick={() => handleVote(VoteValues.ABSTAIN)}
            disabled={["waitingForSigner", "confirming"].includes(voteStatus)}
          >
            Abstain
          </button>
        </div>
        <h3>Status: {voteStatus}</h3>
        <h3>
          data:
          <pre>{JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}</pre>
        </h3>
        {error && <h3>Error: {error?.message}</h3>}
      </Terminal>
    </div>
  );
};

export default Index;

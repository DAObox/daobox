import { useNewProposal, VoteValues } from "@daobox/use-aragon";
import React from "react";
import { Terminal } from "../../components/Terminal";
import { pluginAddress } from "../../constants";

const Index = () => {
  const { mutate, data, error, proposalId, proposalStatus } = useNewProposal({
    title: "ok this one should work",
    summary: "another test",
    description: "another test",
    pluginAddress,
    resources: [],
    endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
    // creatorVote: VoteValues.YES,
    onProposalTransaction(proposalId: string) {
      console.log("onProposalTransaction", proposalId);
    },
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useNewProposal</h1>
      <Terminal>
        <h2>Plugin Address: {pluginAddress}</h2>
        <h3>Press button to submit a proposal</h3>
        <button
          onClick={() => mutate?.()}
          disabled={!["idle", "success", "error"].includes(proposalStatus)}
        >
          New Proposal
        </button>
        <h3>Status: {proposalStatus}</h3>
        <h3>Proposal Id: {proposalId}</h3>
        {error && <h3>Error: {error?.message}</h3>}
        <pre>{JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}</pre>
      </Terminal>
    </div>
  );
};

export default Index;

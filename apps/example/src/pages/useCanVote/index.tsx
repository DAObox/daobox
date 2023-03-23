import { useCanVote, VoteValues } from "@daobox/use-aragon";
import React from "react";
import { Terminal } from "../../components/Terminal";
import { pluginAddress, proposalId, userAddress } from "../../constants";

const index: React.FC = () => {
  const { data, status } = useCanVote({
    voterAddressOrEns: userAddress,
    proposalId,
    vote: VoteValues.YES,
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useFetchVotingToken</h1>

      <Terminal>
        <h3>Plugin Address: {pluginAddress}</h3>
        <h3>Status: {status}</h3>
        <pre>{JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}</pre>
      </Terminal>
    </div>
  );
};

export default index;

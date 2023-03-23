import React from "react";
import { useFetchProposal, useFetchVotingToken } from "@daobox/use-aragon";
import { Terminal } from "../../components/Terminal";

const pluginAddress = "0x8eaf189dbe3524667d25684645aba1c71c02d8db";

const index = () => {
  const { data, status } = useFetchVotingToken({
    pluginAddress,
  });

  return (
    <div style={{ textAlign: "left" }}>
      <h1 style={{ textAlign: "center" }}>useFetchVotingToken</h1>

      <Terminal>
        <h3>proposalId: {pluginAddress}</h3>
        <h3>status: {status}</h3>
        <pre>{JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}</pre>
      </Terminal>
    </div>
  );
};

export default index;

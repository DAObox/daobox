import React from "react";
import { useFetchProposal, useFetchVotingToken } from "@daobox/use-aragon";
import { Terminal } from "../../components/Terminal";

const pluginAddress = "0x8eaf189dbe3524667d25684645aba1c71c02d8db";

const Index = () => {
  const { data, status } = useFetchVotingToken({
    pluginAddress,
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

export default Index;

import React from "react";
import { useFetchProposal } from "@daobox/use-aragon";
import { Terminal } from "../../components/Terminal";

const proposalId = "0x8eaf189dbe3524667d25684645aba1c71c02d8db_0xf";

const index = () => {
  const { data, status } = useFetchProposal({
    proposalId,
  });

  return (
    <div style={{ textAlign: "left" }}>
      <h1 style={{ textAlign: "center" }}>useFetchMembers</h1>

      <Terminal>
        <h3>proposalId: {proposalId}</h3>
        <h3>status: {status}</h3>
        {JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
      </Terminal>
    </div>
  );
};

export default index;
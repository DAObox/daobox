import { SortDirection, useFetchProposals } from "@daobox/use-aragon";
import React from "react";
import { Terminal } from "../../components/Terminal";
import { daoAddressOrEns } from "../../constants";

const Index = () => {
  const { data, status } = useFetchProposals({
    daoAddressOrEns,
    direction: SortDirection.DESC,
    limit: 1,
  });
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useFetchProposals</h1>

      <Terminal>
        <h3>DAO Address: {daoAddressOrEns}</h3>

        <h3>Status: {status}</h3>
        {data?.map((proposal: any, index: React.Key) => (
          <pre key={index}>
            {JSON.stringify(proposal, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
          </pre>
        ))}
      </Terminal>
    </div>
  );
};

export default Index;

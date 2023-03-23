import React from "react";
import { useFetchTransfers } from "@daobox/use-aragon";
import { daoAddressOrEns } from "../../constants";
import { Terminal } from "../../components/Terminal";

const index = () => {
  const { data, status } = useFetchTransfers({ daoAddressOrEns });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useFetchVotingToken</h1>
      <Terminal>
        <h3>DAO Address: {daoAddressOrEns}</h3>
        <h3>Status: {status}</h3>
        <pre>{JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}</pre>
      </Terminal>
    </div>
  );
};

export default index;

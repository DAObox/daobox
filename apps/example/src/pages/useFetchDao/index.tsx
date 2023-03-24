import React from "react";
import { useFetchDao } from "@daobox/use-aragon";
import { daoAddressOrEns } from "../../constants";
import { Terminal } from "../../components/Terminal";

const Index = () => {
  const { data, status } = useFetchDao({
    daoAddressOrEns,
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useFetchDao</h1>

      <Terminal>
        <h3>DAO Address: {daoAddressOrEns}</h3>
        <h3>Status: {status}</h3>
        <pre>{JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}</pre>
      </Terminal>
    </div>
  );
};

export default Index;

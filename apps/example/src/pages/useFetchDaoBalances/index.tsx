import React, { useState } from "react";
import { useFetchDaoBalances } from "@daobox/use-aragon";
import { daoAddressOrEns } from "../../constants";
import { Terminal } from "../../components/Terminal";

const Index: React.FC = () => {
  const { data, status } = useFetchDaoBalances({ daoAddressOrEns });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useFetchDaoBalances</h1>

      <Terminal>
        <h3>Status: {status}</h3>
        {data?.map((dao: any, index: React.Key) => (
          <pre key={index}>
            {JSON.stringify(dao, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
          </pre>
        ))}
      </Terminal>
    </div>
  );
};

export default Index;

import React from "react";
import { useFetchDaos } from "@daobox/use-aragon";
import { Terminal } from "../../components/Terminal";

const Index = () => {
  const { data, status } = useFetchDaos({});

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useFetchDaos</h1>

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

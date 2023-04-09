import React from "react";
import { useFetchMembersAndBalances } from "@daobox/use-aragon";
import { Terminal } from "../../components/Terminal";

const pluginAddress = "0x8eaf189dbe3524667d25684645aba1c71c02d8db";

const Index = () => {
  const { data, status } = useFetchMembersAndBalances({
    pluginAddress,
  });

  return (
    <div style={{ textAlign: "left" }}>
      <h1 style={{ textAlign: "center" }}>useFetchMembersAndBalances</h1>

      <Terminal>
        <h3>pluginAddress: {pluginAddress}</h3>
        <h3>status: {status}</h3>
        {data && <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>}
      </Terminal>
    </div>
  );
};

export default Index;

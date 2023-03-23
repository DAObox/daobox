import React from "react";
import { TokenType, useEstimateDeposit } from "@daobox/use-aragon";
import { Terminal } from "../../components/Terminal";
import { NATION } from "../../constants";

const index = () => {
  const { data: nationData, status: nationStatus } = useEstimateDeposit({
    daoAddressOrEns: "box.dao.eth",
    type: TokenType.ERC20,
    tokenAddress: NATION,
    amount: 123456789n,
  });

  const { data: ethData, status: ethStatus } = useEstimateDeposit({
    daoAddressOrEns: "box.dao.eth",
    type: TokenType.NATIVE,
    amount: 123456789n,
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useEstimateDeposit</h1>
      <Terminal>
        <h3>ERC20</h3>
        <h3>Status: {nationStatus}</h3>
        <pre>
          {JSON.stringify(nationData, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
        </pre>
      </Terminal>
      <Terminal>
        <h3>ETH</h3>
        <h3>Status: {ethStatus}</h3>
        <pre>
          {JSON.stringify(ethData, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
        </pre>
      </Terminal>
    </div>
  );
};

export default index;

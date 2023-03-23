import React from "react";
import { TokenType, useEstimateDeposit } from "@daobox/use-aragon";

const NATION = "0x333A4823466879eeF910A04D473505da62142069";

const index = () => {
  const { data: antData, status: antStatus } = useEstimateDeposit({
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
    <div style={{ textAlign: "left" }}>
      <h1>Estimate Deposit ETH</h1>
      <p>Status: {ethStatus}</p>
      {JSON.stringify(ethData, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
      <h1>Estimate Deposit ANT</h1>
      <p>Status: {antStatus}</p>
      {JSON.stringify(antData, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
    </div>
  );
};

export default index;

import { useDepositEth } from "@daobox/use-aragon";
import React from "react";
import { Terminal } from "../../components/Terminal";
import { daoAddressOrEns, pluginAddress } from "../../constants";

const index = () => {
  const { mutate, depositStatus, error, data } = useDepositEth({
    amount: 42069n,
    daoAddressOrEns,
  });
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useDepositEth</h1>
      <Terminal>
        <h2>DAO Address: {daoAddressOrEns}</h2>
        <h3>press button to deposit: 42069 gwei</h3>
        <button
          onClick={() => mutate?.()}
          disabled={["waitingForSigner", "confirming"].includes(depositStatus)}
        >
          deposit
        </button>
        <h3>Status: {depositStatus}</h3>
        <h3>
          data:
          <pre>{JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}</pre>
        </h3>
        {error && <h3>Error: {error?.message}</h3>}
      </Terminal>
    </div>
  );
};

export default index;

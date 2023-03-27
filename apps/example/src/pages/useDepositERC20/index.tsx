import { useDepositERC20 } from "@daobox/use-aragon";
import React, { useState } from "react";
import { Terminal } from "../../components/Terminal";
import { daoAddressOrEns } from "../../constants";

const Index = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState("");

  const { mutate, depositStatus, error, data } = useDepositERC20({
    tokenAddress,
    amount,
    daoAddressOrEns,
    onAllowanceTransaction(hash: string) {
      alert(`Allowance Hash: ${hash}`);
    },
    onDepositTransaction(hash: string) {
      alert(`Deposit Hash: ${hash}`);
    },
    onError(error: Error) {
      console.log("onError", error);
    },
  });

  const handleDeposit = () => {
    mutate?.();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>useDepositERC20</h1>
      <Terminal>
        <h2>DAO Address: {daoAddressOrEns}</h2>
        <h3>Enter Token Address and Amount to deposit:</h3>
        <input
          className="input-box"
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="Enter Token Address"
        />
        <input
          className="input-box"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
        <div>
          <button
            onClick={handleDeposit}
            disabled={["waitingForSigner", "confirming"].includes(depositStatus)}
          >
            Deposit
          </button>
        </div>
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

export default Index;

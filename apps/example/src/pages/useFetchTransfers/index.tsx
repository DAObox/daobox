import React, { useState } from "react";
import { useFetchTransfers } from "@daobox/use-aragon";

const Index: React.FC = () => {
  const [inputValue, setInputValue] = useState("box.dao.eth");
  const [daoAddressOrEns, setDaoAddressOrEns] = useState("box.dao.eth");
  const { data, status } = useFetchTransfers({ daoAddressOrEns });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDaoAddressOrEns(inputValue);
  };

  return (
    <div>
      <h1>useFetchTransfers</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
      <h3>Status: {status}</h3>
      {data && (
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
        </pre>
      )}
    </div>
  );
};

export default Index;

import { SortDirection, useFetchProposals } from "@daobox/use-aragon";
import React from "react";

const index = () => {
  const { data, isLoading, status } = useFetchProposals({
    daoAddressOrEns: "0x6f07aa7af27e0e06a08a1a17e04c4b0eb11300ab",
    direction: SortDirection.DESC,
    limit: 1,
  });
  return (
    <div>
      <h1>useFetchProposals</h1>
      <p>status: {status}</p>
      <p>isLoading: {isLoading.toString()}</p>
      {data?.map((proposal) => (
        <div key={proposal.id}>
          <p>title: {proposal.metadata.title}</p>
          <p>id: {proposal.id}</p>
        </div>
      ))}
    </div>
  );
};

export default index;

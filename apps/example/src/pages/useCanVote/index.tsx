import { useCanVote, VoteValues } from "@daobox/use-aragon";
import React, { useState } from "react";

type FormInputs = {
  vote: VoteValues;
  proposalId: string;
  voterAddressOrEns: string;
};

const VoteForm: React.FC<{ onSubmit: (inputs: FormInputs) => void }> = ({ onSubmit }) => {
  const [vote, setVote] = useState<VoteValues>(VoteValues.YES);
  const [proposalId, setProposalId] = useState("0x8eaf189dbe3524667d25684645aba1c71c02d8db_0xf");
  const [voterAddressOrEns, setVoterAddressOrEns] = useState(
    "0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ vote, proposalId, voterAddressOrEns });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="vote">Vote:</label>
      <select id="vote" value={vote} onChange={(e) => setVote(e.target.value as VoteValues)}>
        <option value={VoteValues.YES}>Yes</option>
        <option value={VoteValues.NO}>No</option>
      </select>

      <label htmlFor="proposalId">Proposal ID:</label>
      <input
        id="proposalId"
        type="text"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      />

      <label htmlFor="voterAddressOrEns">Voter Address or ENS:</label>
      <input
        id="voterAddressOrEns"
        type="text"
        value={voterAddressOrEns}
        onChange={(e) => setVoterAddressOrEns(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

const VotePage: React.FC = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    vote: VoteValues.YES,
    proposalId: "",
    voterAddressOrEns: "",
  });

  const { data, status } = useCanVote(formInputs);

  const handleFormSubmit = (inputs: FormInputs) => {
    setFormInputs(inputs);
  };

  return (
    <>
      <h1>useCanVote</h1>
      <VoteForm onSubmit={handleFormSubmit} />
      <p>Status: {status}</p>
      <p>Can Vote: {data?.toString()}</p>
    </>
  );
};

export default VotePage;

import { LinkButton } from "../components/LinkButton";

function Page() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Core Hooks</h1>
      <LinkButton link="/useFetchDaos" label="useFetchDaos" />
      <LinkButton link="/useFetchDao" label="useFetchDao" />
      <LinkButton link="/useFetchDaoBalances" label="useFetchDaoBalances" />
      <LinkButton link="/useFetchTransfers" label="useFetchTransfers" />
      <LinkButton link="/useEstimateDeposit" label="useEstimateDeposit" />
      <h1>Token Voting Hooks</h1>
      <LinkButton link="/useFetchProposals" label="useFetchProposals" />
      <LinkButton link="/useCanVote" label="useCanVote" />
      <LinkButton link="/useFetchMembers" label="useFetchMembers" />
      <LinkButton link="/useFetchProposal" label="useFetchProposal" />
      <LinkButton link="/useFetchVotingToken" label="useFetchVotingToken" />
      <LinkButton link="/useFetchVotingSettings" label="useFetchVotingSettings" />
    </div>
  );
}

export default Page;

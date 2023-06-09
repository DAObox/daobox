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
      <LinkButton link="/useDepositEth" label="useDepositEth" />
      <LinkButton link="/useDepositERC20" label="useDepositERC20" />
      <h1>Token Voting Hooks</h1>
      <LinkButton link="/useFetchProposals" label="useFetchProposals" />
      <LinkButton link="/useFetchProposal" label="useFetchProposal" />
      <LinkButton link="/useCanVote" label="useCanVote" />
      <LinkButton link="/useFetchMembers" label="useFetchMembers" />
      <LinkButton link="/useFetchMembersAndBalances" label="useFetchMembersAndBalances" />
      <LinkButton link="/useFetchVotingToken" label="useFetchVotingToken" />
      <LinkButton link="/useFetchVotingSettings" label="useFetchVotingSettings" />
      <LinkButton link="/useNewProposal" label="useNewProposal" />
      <LinkButton link="/useVoteOnProposal" label="useVoteOnProposal" />
      <h1>DAOs</h1>
      <LinkButton link="/adminDao" label="Admin DAO" />
      <LinkButton link="/lensDao" label="Lens DAO" />
      <LinkButton link="/tokenVotingDao" label="TokenVoting DAO" />
    </div>
  );
}

export default Page;

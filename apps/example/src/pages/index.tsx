import { LinkButton } from "../components/LinkButton";

function Page() {
  return (
    <div style={{ textAlign: "center" }}>
      <LinkButton link="/useFetchDaos" label="useFetchDaos" />
      <LinkButton link="/useFetchDao" label="useFetchDao" />
    </div>
  );
}

export default Page;

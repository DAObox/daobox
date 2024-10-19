import { useTargetNetwork } from "~~/hooks/daobox";
import { GenericContractsDeclaration, contracts } from "~~/utils/daobox/contract";

const DEFAULT_ALL_CONTRACTS: GenericContractsDeclaration[number] = {};

export function useAllContracts() {
  const { targetNetwork } = useTargetNetwork();
  const contractsData = contracts?.[targetNetwork.id];
  // using constant to avoid creating a new object on every call
  return contractsData || DEFAULT_ALL_CONTRACTS;
}

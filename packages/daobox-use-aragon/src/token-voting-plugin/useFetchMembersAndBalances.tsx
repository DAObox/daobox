import { useQuery } from "@tanstack/react-query";
import { QueryConfig } from "../types";
import { request } from "graphql-request";
import useConnectedWallet from "../context/useConnectedWallet";
import { CHAINS, SUBGRAPH_API_URL } from "../constants";
import { createQueryKey } from "../lib";
import { TokenHoldersAndBalances } from "./queries";

export function useFetchMembersAndBalances(params: MemberAndBalancesParams) {
  const { pluginAddress, queryKey, enabled = true, ...options } = params;
  const { chain } = useConnectedWallet();

  async function queryFunction(
    pluginAddress: string | undefined
  ): Promise<AddressAndBalance[]> {
    const result: QueryFnResult = await request(
      // ! is used here because we are checking if chain is undefined in the enabled check
      SUBGRAPH_API_URL[chain!],
      TokenHoldersAndBalances,
      { pluginId: pluginAddress }
    );
    return result.tokenVotingPlugin.members;
  }

  return useQuery({
    queryKey: createQueryKey("members", [pluginAddress], queryKey),
    queryFn: () => queryFunction(pluginAddress),
    enabled: !!(
      Object.values(CHAINS).includes(chain as any) &&
      pluginAddress &&
      enabled
    ),
    ...options,
  });
}

export interface MemberAndBalancesParams
  extends QueryConfig<AddressAndBalance[] | null> {
  pluginAddress?: string;
}

interface AddressAndBalance {
  address: string;
  balance: bigint;
}

interface QueryFnResult {
  tokenVotingPlugin: {
    members: AddressAndBalance[];
  };
}

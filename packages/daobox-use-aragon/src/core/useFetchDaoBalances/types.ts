import { AssetBalance } from "@aragon/sdk-client";
import { UseQueryOptions, QueryKey, UseQueryResult } from "react-query";

/**
 * @typedef {Object} UseFetchDaoBalancesOptions
 * @extends {UseQueryOptions<AssetBalance[] | null, unknown, AssetBalance[] | null, QueryKey>}
 */
export type UseFetchDaoBalancesOptions = UseQueryOptions<
  AssetBalance[] | null,
  unknown,
  AssetBalance[] | null,
  QueryKey
>;

/**
 * @typedef {Object} UseFetchDaoBalancesResult
 * @extends {UseQueryResult<AssetBalance[] | null, unknown>}
 */
export type UseFetchDaoBalancesResult = UseQueryResult<
  AssetBalance[] | null,
  unknown
>;

import { UseQueryResult, UseQueryOptions, QueryKey } from "react-query";

export type CanVoteReturnType = UseQueryResult<boolean | null, unknown>;

export type UseCanVoteOptions = UseQueryOptions<
  boolean | null,
  unknown,
  boolean | null,
  QueryKey
>;

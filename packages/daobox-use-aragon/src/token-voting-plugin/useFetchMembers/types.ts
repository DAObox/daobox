import { UseQueryResult, UseQueryOptions, QueryKey } from "react-query";

export type FetchMembersReturnType = UseQueryResult<string[] | null, unknown>;

export type UseFetchMembersOptions = UseQueryOptions<
  string[] | null,
  unknown,
  string[] | null,
  QueryKey
>;

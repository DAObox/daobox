import { VotingSettings } from "@aragon/sdk-client";
import { UseQueryResult, UseQueryOptions, QueryKey } from "react-query";

export type FetchVotingSettingsReturnType = UseQueryResult<
  VotingSettings | null,
  unknown
>;

export type UseFetchVotingSettingsOptions = UseQueryOptions<
  VotingSettings | null,
  unknown,
  VotingSettings | null,
  QueryKey
>;

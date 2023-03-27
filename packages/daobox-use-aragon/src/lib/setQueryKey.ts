import { QueryKey } from "react-query";

export function createQueryKey(
  rootKey: string,
  subKeys: Array<any>,
  userQueryKey: QueryKey | undefined
) {
  return [
    rootKey,
    ...subKeys,
    ...(Array.isArray(userQueryKey) ? userQueryKey : [userQueryKey]),
  ].filter(Boolean);
}

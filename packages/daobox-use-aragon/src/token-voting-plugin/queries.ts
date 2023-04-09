import { gql } from "graphql-request";

export const TokenHoldersAndBalances = gql`
  query TokenHoldersAndBalances($pluginId: ID!) {
    tokenVotingPlugin(id: $pluginId) {
      members {
        address
        balance
      }
    }
  }
`;

import { ITokenVotingPluginInstall } from "@aragon/sdk-client";
import { NewDaoParams, useNewDao } from "../core";
import { encodeTokenVotingPlugin } from "../encoders";

export function useNewTokenVotingDao(
  newDaoParams: Omit<NewDaoParams, "plugins">,
  pluginSettings: ITokenVotingPluginInstall
) {
  return useNewDao({
    ...newDaoParams,
    plugins: [encodeTokenVotingPlugin(pluginSettings)],
  });
}

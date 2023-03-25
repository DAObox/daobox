import { InstalledPluginListItem } from "@aragon/sdk-client";

import { useFetchDao } from "./useFetchDao";

/**
 * Fetches the address of the xth plugin instance.
 *
 * @param {string | undefined} daoAddressOrEns The DAO address or ENS name.
 * @param {string} pluginId The plugin ID to match.
 * @param {number} number The index of the plugin instance.
 * @returns {string | null} The instance address of the xth plugin instance, or null if not found.
 * @throws {Error} If the number is higher than the amount of instances or if the pluginId is invalid.
 */
export function usePluginInstance(
  daoAddressOrEns: string | undefined,
  pluginId: string | undefined,
  number: number = 1
): string | null {
  const { data: daoDetails } = useFetchDao({ daoAddressOrEns });

  if (!daoDetails || !pluginId) {
    return null;
  }

  const matchedPlugins = daoDetails.plugins.filter(
    (plugin: InstalledPluginListItem) =>
      plugin.id.split(".")[0].toLowerCase() === pluginId.toLowerCase()
  );

  return matchedPlugins[number].instanceAddress;
}

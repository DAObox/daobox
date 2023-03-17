import { DaoDetails } from "@aragon/sdk-client";

export const expectedDaoDetails: DaoDetails = {
  address: "0xb76f8d3512497040a96e77141c951a5374f24eb9",
  ensDomain: "management.dao.eth",
  metadata: {
    name: "(the DAO has no metadata)",
    description: "(the DAO did not define any content)",
    links: [],
  },
  creationDate: new Date("2023-02-27T17:45:36.000Z"),
  plugins: [
    {
      instanceAddress: "0x3263de63e70157c4b607982721026ffaa20e596c",
      id: "multisig.plugin.dao.eth",
      version: "0.0.1",
    },
  ],
};

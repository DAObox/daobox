import { useAragon as useAragonReal } from "..";

import { expectedDaoDetails } from "./mockData";

// Create a mock implementation of the getDao method that resolves the expectedDaoDetails
const getDaoMock = jest.fn(async () => expectedDaoDetails);

export const useAragon = () => {
  const { baseClient } = useAragonReal();
  baseClient!.methods.getDao = getDaoMock;

  return { baseClient };
};

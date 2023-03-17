// Import necessary libraries and hooks
import { renderHook } from "@testing-library/react-hooks";
import { useFetchDao } from "..";
import { AragonProvider } from "../../../context";
import { useAragon } from "../../../__mocks__/baseClient";

import { expectedDaoDetails } from "../../../__mocks__/mockData";

// Mock the actual useAragon hook from the library with the mocked version
jest.mock("../../../context", () => ({
  useAragon: () => useAragon(),
}));

describe("useFetchDao", () => {
  it("fetches the dao details", async () => {
    const daoAddressOrEns = "0x123";

    // Use renderHook from @testing-library/react-hooks to test the useFetchDao hook
    // Wrap the test component with AragonProvider to ensure the context is available
    const { result, waitForNextUpdate } = renderHook(
      () => useFetchDao(daoAddressOrEns),
      {
        wrapper: AragonProvider,
      }
    );

    // Wait for the hook to fetch the data
    // Increase the timeout for waitForNextUpdate to 5000ms (5 seconds)
    await waitForNextUpdate({ timeout: 5000 });

    // Log the result to see what's happening
    console.log("result", result.current);

    // Assert that the data has been fetched correctly by comparing it to the expected DAO details
    expect(result.current.data).toEqual(expectedDaoDetails);
  }, 10000);
});

// // Set up the test suite for useFetchDao
// describe("useFetchDao", () => {
//   // Write a test case for fetching the DAO details
//   test("fetches the dao details", async () => {
//     // Define the input for the useFetchDao hook
//     const daoAddressOrEns = "0x74f8e7420fbca2d97419717e61a199d0e9bea16a";

//     // Use renderHook from @testing-library/react-hooks to test the useFetchDao hook
//     // Wrap the test component with AragonProvider to ensure the context is available
//     const { result, waitForNextUpdate } = renderHook(
//       () => useFetchDao(daoAddressOrEns),
//       {
//         wrapper: AragonProvider,
//       }
//     );

//     // Wait for the hook to fetch the data
//     await waitForNextUpdate();

//     // Assert that the data has been fetched correctly by comparing it to the expected DAO details
//     expect(result.current.data).toEqual(expectedDaoDetails);
//   });
// });

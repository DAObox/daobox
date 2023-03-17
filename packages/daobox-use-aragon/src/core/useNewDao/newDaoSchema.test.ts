import { validateData } from "../..";
import { newDaoParamsSchema } from "./schema";

const baseInput = {
  daoMetadata: {
    name: "Test DAO",
    description: "A test DAO",
    avatar: "ipfs://Qmexample",
    links: [
      {
        title: "Test Link",
        url: "https://example.com",
      },
    ],
  },
  daoUri: "https://test-dao-uri.com",
  ensSubdomain: "testdao.eth",
  trustedForwarder: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  plugins: [],
};

describe("validateData function and newDaoParamsSchema", () => {
  /**
   * Test if the schema validates a correct input without throwing an error
   */
  test("validates correct input", () => {
    expect(() => validateData(newDaoParamsSchema, baseInput)).not.toThrow();
  });

  /**
   * Test if the schema throws an error for an invalid ensSubdomain
   */
  test("returns error for invalid ensSubdomain", () => {
    const input = {
      ...baseInput,
      ensSubdomain: "invalid-ens-subdomain",
    };

    expect(() => validateData(newDaoParamsSchema, input)).toThrow(
      /Invalid ENS subdomain/
    );
  });

  /**
   * Test if the schema throws an error for an invalid trustedForwarder
   */
  test("returns error for invalid trustedForwarder", () => {
    const input = {
      ...baseInput,
      trustedForwarder: "invalid-ethereum-address",
    };

    expect(() => validateData(newDaoParamsSchema, input)).toThrow(
      /trustedForwarder must be a valid Ethereum address/
    );
  });

  /**
   * Test if the schema throws an error for an empty DAO name
   */
  test("returns error for empty DAO name", () => {
    const input = {
      ...baseInput,
      daoMetadata: {
        ...baseInput.daoMetadata,
        name: "",
      },
    };

    expect(() => validateData(newDaoParamsSchema, input)).toThrow(
      /DAO name must not be empty/
    );
  });

  /**
   * Test if the schema throws an error for an empty DAO description
   */
  test("returns error for empty DAO description", () => {
    const input = {
      ...baseInput,
      daoMetadata: {
        ...baseInput.daoMetadata,
        description: "",
      },
    };

    expect(() => validateData(newDaoParamsSchema, input)).toThrow(
      /DAO description must not be empty/
    );
  });

  /**
   * Test if the schema throws an error for an invalid avatar URI
   */
  test("returns error for invalid avatar URI", () => {
    const input = {
      ...baseInput,
      daoMetadata: {
        ...baseInput.daoMetadata,
        avatarUri: "invalid-ipfs-uri",
      },
    };

    try {
      validateData(newDaoParamsSchema, input);
    } catch (error) {
      expect(error.message).toContain(
        "Avatar URI must be a valid IPFS URI or a regular URL."
      );
    }
  });

  test("returns error for empty link title", () => {
    const input = {
      ...baseInput,
      daoMetadata: {
        ...baseInput.daoMetadata,
        links: [
          {
            title: "",
            url: "https://example.com",
          },
        ],
      },
    };

    expect(() => validateData(newDaoParamsSchema, input)).toThrow(
      /links.0.title - Link title must not be empty/
    );
  });

  test("returns error for invalid link URL", () => {
    const input = {
      ...baseInput,
      daoMetadata: {
        ...baseInput.daoMetadata,
        links: [
          {
            title: "Example",
            url: "invalid-url",
          },
        ],
      },
    };

    try {
      validateData(newDaoParamsSchema, input);
    } catch (error) {
      expect(error.message).toContain(
        "links.0.url - Invalid URL or IPFS URI format"
      );
    }
  });
});

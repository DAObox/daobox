import { IERC20MintableUpgradeable__factory } from "@aragon/osx-ethers";
import { IMintTokenParams } from "@aragon/sdk-client";
import { isAddress } from "ethers/lib/utils";
import { hexToBytes } from "../lib";

interface MintEncodingParams {
  tokenAddress: string;
  recipientAddress: string;
  amount: bigint;
}
export function encodeMintToken({
  tokenAddress,
  recipientAddress,
  amount,
}: MintEncodingParams) {
  if (!isAddress(tokenAddress) || !isAddress(recipientAddress)) {
    throw new Error("MintEncodingParams: INVALID ADDRESS");
  }
  const votingInterface = IERC20MintableUpgradeable__factory.createInterface();

  return {
    to: tokenAddress,
    value: BigInt(0),
    data: hexToBytes(
      votingInterface.encodeFunctionData("mint", [recipientAddress, amount])
    ),
  };
}

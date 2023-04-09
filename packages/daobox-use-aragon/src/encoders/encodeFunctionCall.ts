import { ethers } from "ethers";

interface EncodeFunctionCallParams {
  abi: ethers.utils.Fragment[] | null;
  functionSignature: string;
  parameters: any[];
}

/**
 * Encodes a function call using the provided ABI, function signature, and parameters.
 * Returns a hexadecimal string representing the ABI-encoded function call or null if the ABI,
 * function signature, or parameters are not provided.
 *
 * @param {EncodeFunctionCallParams} params - An object containing the contract ABI, function signature, and parameters for the function call.
 * @param {ethers.utils.Fragment[] | null} params.abi - The contract ABI.
 * @param {string} params.functionSignature - The function signature to encode.
 * @param {any[]} params.parameters - The parameters for the function call.
 * @returns {string | null} The ABI-encoded function call or null if not all required arguments are provided.
 */
export function encodeFunctionCall({
  abi,
  functionSignature,
  parameters,
}: EncodeFunctionCallParams): string | null {
  if (!abi || !functionSignature || !parameters) {
    return null;
  }

  const iface = new ethers.utils.Interface(abi);
  const encodedData = iface.encodeFunctionData(functionSignature, parameters);
  return encodedData;
}

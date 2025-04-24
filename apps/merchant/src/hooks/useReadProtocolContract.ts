import { useReadContract } from "@spheroid/coinbase"
import { PROTOCOL_ABI, PROTOCOL_BASE_SEPOLIA, BASE_SEPOLIA_CHAIN_ID } from "@spheroid/configuration"

const useReadProtocolContract = ({ args, functionName }: { functionName: string; args: readonly unknown[] }) => {
  return useReadContract({
    abi: PROTOCOL_ABI,
    address: PROTOCOL_BASE_SEPOLIA,
    chainId: BASE_SEPOLIA_CHAIN_ID,
    functionName,
    args,
  })
}

export default useReadProtocolContract

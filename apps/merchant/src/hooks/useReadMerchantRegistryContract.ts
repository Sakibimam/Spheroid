import { useReadContract } from "@spheroid/coinbase"
import { MERCHANT_REGISTRY_BASE_SEPOLIA, MERCHANT_REGISTRY_ABI, BASE_SEPOLIA_CHAIN_ID } from "@spheroid/configuration"

const useReadMerchantRegistryContract = ({
  args,
  functionName,
}: {
  functionName: string
  args: readonly unknown[]
}) => {
  return useReadContract({
    abi: MERCHANT_REGISTRY_ABI,
    address: MERCHANT_REGISTRY_BASE_SEPOLIA,
    // chainId: BASE_SEPOLIA_CHAIN_ID,
    functionName,
    args,
  })
}

export default useReadMerchantRegistryContract

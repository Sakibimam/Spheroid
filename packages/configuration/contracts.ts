// Chain
export const BASE_SEPOLIA_CHAIN_ID = 84532

// Contract addresses
export const PROTOCOL_BASE_SEPOLIA = "0x551bCe6A8457cdC24148a72b1c9Df8Ab7515bB29"
export const MERCHANT_REGISTRY_BASE_SEPOLIA = "0xb398B6d863342ED7aF570383aB33139C301A3482"

// ABIs
export const PROTOCOL_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_spInstance",
        type: "address",
        internalType: "address",
      },
      {
        name: "_usdc",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "USDC",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deployMerchantWithToken",
    inputs: [
      {
        name: "merchantName",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "tokenName",
        type: "string",
        internalType: "string",
      },
      {
        name: "tokenSymbol",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
      {
        name: "tokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "didReceiveAttestation",
    inputs: [
      {
        name: "attester",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "attestationId",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "didReceiveAttestation",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "didReceiveRevocation",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "didReceiveRevocation",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "merchantRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract MerchantRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paymentSchemaId",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setMerchantRegistry",
    inputs: [
      {
        name: "_merchantRegistry",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "spInstance",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ISP",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "verifyAndPayMerchant",
    inputs: [
      {
        name: "merchant",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "servicesAvailed",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "LoyaltyPointsMinted",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "points",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "attestationId",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MerchantRegistered",
    inputs: [
      {
        name: "merchant",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MerchantTagAdded",
    inputs: [
      {
        name: "merchant",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "tagName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PaymentProcessed",
    inputs: [
      {
        name: "merchant",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "attestationId",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PurchaseTagged",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "merchant",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "tags",
        type: "string[]",
        indexed: false,
        internalType: "string[]",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "InsufficientAllowance",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidPayment",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidService",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidTag",
    inputs: [],
  },
  {
    type: "error",
    name: "NotImplemented",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "UnauthorizedMerchant",
    inputs: [],
  },
] as const
export const MERCHANT_REGISTRY_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_protocol",
        type: "address",
        internalType: "address payable",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "OWNER_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PROTOCOL_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addServiceToMerchant",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "name",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "mintRatio",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deregisterMerchant",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deregisterService",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "serviceIndex",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getMerchant",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Merchant",
        components: [
          {
            name: "name",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "cid",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "loyaltyTokenContract",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMerchantService",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "serviceIndex",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Service",
        components: [
          {
            name: "name",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "cid",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "mintRatio",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "active",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMerchantServices",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Service[]",
        components: [
          {
            name: "name",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "cid",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "mintRatio",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "active",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getServicePointsPerDollar",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "serviceIndex",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantOwnerRole",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "grantProtocolRole",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isMerchantRegistered",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "merchantToServices",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "name",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "mintRatio",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "active",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "merchants",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "name",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "loyaltyTokenContract",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerMerchant",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "name",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "loyaltyTokenContract",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "callerConfirmation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeOwnerRole",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeProtocolRole",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "updateMerchant",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "name",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateService",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "serviceIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "name",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "mintRatio",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "active",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "MerchantContractInitialized",
    inputs: [
      {
        name: "protocol",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MerchantDeregistered",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MerchantRegistered",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "loyaltyTokenContract",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "cid",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MerchantServiceAdded",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "mintRatio",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MerchantServiceDeregistered",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MerchantServiceUpdated",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "cid",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "mintRatio",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MerchantUpdated",
    inputs: [
      {
        name: "merchantAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AccessControlBadConfirmation",
    inputs: [],
  },
  {
    type: "error",
    name: "AccessControlUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
      {
        name: "neededRole",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "AccessManagerError__CallerNotOwner",
    inputs: [
      {
        name: "caller",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AccessManagerError__CallerNotProtocol",
    inputs: [
      {
        name: "caller",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AccessManagerError__ZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "MerchantAlreadyExists",
    inputs: [],
  },
  {
    type: "error",
    name: "MerchantDoesNotExist",
    inputs: [],
  },
  {
    type: "error",
    name: "ServiceAlreadyExists",
    inputs: [],
  },
  {
    type: "error",
    name: "ServiceDoesNotExist",
    inputs: [],
  },
] as const

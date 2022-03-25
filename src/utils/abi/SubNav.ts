export const subNavABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "pChainAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "signedControlKey",
        type: "string",
      },
    ],
    name: "addControlKeySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "subnetID",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "owner",
        type: "string",
      },
    ],
    name: "registerSubnet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "mail",
        type: "string",
      },
      {
        internalType: "string",
        name: "twitterHandle",
        type: "string",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "subnets",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "owner",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "string",
        name: "mail",
        type: "string",
      },
      {
        internalType: "string",
        name: "twitterHandle",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

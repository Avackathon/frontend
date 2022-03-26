export const TEST = false

export const RPC_URL = TEST
  ? "http://127.0.0.1:8545/"
  : "https://fuji.subnav.network/ext/bc/subnav/rpc"
// : //   ? "https://api.avax-test.network/ext/bc/C/rpc"
//   // "https://api.avax.network/ext/bc/C/rpc"
export const SUPPORTED_CHAIN_ID = TEST ? 0xa869 : 0xa86a
export const SUPPORTED_CHAIN_ID_STRING = TEST ? "0xa869" : "0xa86a"
export const SUPPORTED_CHAIN_NAME = TEST
  ? "Avalanche Fuji Network"
  : "Avalanche Network"

export const SUBNAV_CONTRACT_ADDRESS =
  process.env.CONTRACT_ADRESS || "0x4Ac1d98D9cEF99EC6546dEd4Bd550b0b287aaD6D"

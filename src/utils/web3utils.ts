import Web3 from "web3"

export const convertFromWei = (value: string): number => {
  return parseFloat(Web3.utils.fromWei(value))
}

export const convertToWei = (value: number): string => {
  return Web3.utils.toWei(value.toString())
}

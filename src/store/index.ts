import { createStore } from "easy-peasy"
import { initialSubnetsModel, SubnetsModel } from "./subnets"
import { initialWalletModel, WalletModel } from "./wallet"

export type RootModel = {
  subnets: SubnetsModel
  wallet: WalletModel
}
export const rootStore = createStore<RootModel>({
  subnets: initialSubnetsModel,
  wallet: initialWalletModel,
})

import { createStore } from "easy-peasy"
import { initialSubnetsModel, SubnetsModel } from "./subnets"

export type RootModel = {
  subnets: SubnetsModel
}
export const rootStore = createStore<RootModel>({
  subnets: initialSubnetsModel,
})

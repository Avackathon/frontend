import { createStore } from "easy-peasy"
import { initialSubnetsModel, SubnetsModel } from "./subnets"

export enum Status {
  UNDEFINED,
  PENDING,
  SUCCESS,
  FAILED,
}
export type RootModel = {
  subnets: SubnetsModel
}
export const rootStore = createStore<RootModel>({
  subnets: initialSubnetsModel,
})

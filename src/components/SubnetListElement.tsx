import { CheckCircleIcon, KeyIcon } from "@heroicons/react/outline"
import { Actions, useStoreActions } from "easy-peasy"
import { useState } from "react"
import { RootModel } from "../store"
import { Subnet } from "../store/subnets"
import ClaimSubnetModal from "./ClaimSubnetModal"

const SubnetHeader = (props: Subnet) => {
  if (props.name) {
    return (
      <div>
        <p className="font-bold">{props.name}</p>
        <p>{props.id}</p>
        <CheckCircleIcon className="h-5 w-5 " aria-hidden="true" />
      </div>
    )
  } else {
    return (
      <div>
        <p className="font-bold">{props.id}</p>
        <ClaimButton id={props.id} />
      </div>
    )
  }
}
const ClaimButton = (props: { id: string }) => {
  const [claimModalOpened, setClaimModalOpened] = useState(false)
  const claimAction = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.claimSubnet
  )
  return (
    <div
      onClick={() => {
        setClaimModalOpened(true)
        // claimAction({ subnetId: props.id })
      }}
    >
      <ClaimSubnetModal
        name={props.id}
        open={claimModalOpened}
        onClose={() => {
          setClaimModalOpened(false)
        }}
      />
      <KeyIcon className="h-5 w-5"></KeyIcon>
    </div>
  )
}
const SubnetListElement = (props: Subnet) => {
  return (
    <div className="rounded bg-gray-300 p-2 my-2 min-h-10">
      <SubnetHeader {...props} />
    </div>
  )
}

export default SubnetListElement

import { CheckCircleIcon } from "@heroicons/react/outline"
import React from "react"
import { Subnet } from "../store/subnets"

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
      </div>
    )
  }
}
const SubnetListElement = (props: Subnet) => {
  return (
    <div className="rounded bg-gray-300 p-2 my-2 min-h-10">
      <SubnetHeader {...props} />
    </div>
  )
}

export default SubnetListElement

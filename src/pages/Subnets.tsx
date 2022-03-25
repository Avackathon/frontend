import { Actions, useStoreActions, useStoreState } from "easy-peasy"
import { useEffect } from "react"
import Paginator from "../components/Paginator"
import "../index.css"
import { RootModel } from "../store"

const Subnets = () => {
  const fetchSubnets = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.fetchSubnets
  )
  const subnets = useStoreState((state: RootModel) => state.subnets.subnets)
  const blockchains = useStoreState(
    (state: RootModel) => state.subnets.blockchains
  )

  useEffect(() => {
    fetchSubnets()
  }, [])

  return (
    <div>
      <p>subnets</p>
      {subnets.slice(0, 10).map((sub) => {
        return (
          <div className="container mx-auto px-4">
            <div
              className=" rounded-lg bg-zinc-900  my-1 p-5 text-zinc-300"
              key={sub.id}
            >
              <p className="font-bold ">{sub.id}</p>
              {sub.name ? (
                <p>
                  {sub.name} - {sub.description}
                </p>
              ) : undefined}
              <p>control key 1: {sub.controlKeys[0]}</p>
              <h4>blockchains</h4>
              {blockchains
                .filter((el) => el.subnetId === sub.id)
                .map((bc) => {
                  return (
                    <div>
                      <p>{bc.name}</p>
                      <p>VM : {bc.vmId}</p>
                    </div>
                  )
                })}
            </div>
          </div>
        )
      })}
      <Paginator />
    </div>
  )
}

export default Subnets

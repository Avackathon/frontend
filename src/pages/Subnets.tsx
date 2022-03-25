import { Actions, useStoreActions, useStoreState } from "easy-peasy"
import { useEffect } from "react"
import "../index.css"
import { RootModel } from "../store"

const Subnets = () => {
  const fetchSubnets = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.fetchSubnets
  )
  const subnets = useStoreState((state: RootModel) => state.subnets.subnets)
  useEffect(() => {
    fetchSubnets()
  }, [])

  return (
    <div>
      <p>subnets</p>
      {subnets.map((sub) => {
        return (
          <div className="container mx-auto px-4">
            <div
              className=" rounded-lg bg-zinc-900  my-1 p-5 text-zinc-300"
              key={sub.id}
            >
              <p className="font-bold ">{sub.id}</p>
              <p>{sub.controlKeys[0]}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Subnets

import React from "react"

interface Props {
  EVM: boolean
  spacesVM: boolean
  timestampVM: boolean
  claimed: boolean
  setEVM: (a: boolean) => void
  setSpaces: (a: boolean) => void
  setTimestamp: (a: boolean) => void
  setClaimed: (a: boolean) => void
}

const Toogle = (props: {
  active: boolean
  name: string
  toogle: () => void
}) => {
  return (
    <div onClick={props.toogle}>
      {props.active ? (
        <div className="rounded-2xl text-sm mx-3 bg-slate-500 py-1.5 px-4">
          {props.name}
        </div>
      ) : (
        <div className="rounded-2xl text-sm mx-3 bg-slate-800 hover:bg-slate-500 py-1.5 px-4">
          {props.name}
        </div>
      )}
    </div>
  )
}
const FilterBar = (props: Props) => {
  return (
    <div className="flex items-center flex-row h-14 px-2 text-slate-100 bg-slate-800">
      <div className="rounded  font-bold  px-4 mr-4 py-2.5">Filters</div>
      <div
        onClick={() => {
          props.setClaimed(!props.claimed)
        }}
      >
        {props.claimed ? (
          <div className="rounded-2xl text-sm mr-5 w-40 text-center bg-gray-500 py-2">
            claimed
          </div>
        ) : (
          <div className="rounded-2xl mr-5 text-sm w-40 text-center bg-gray-800 hover:bg-slate-500 py-2">
            claimed
          </div>
        )}
      </div>
      <Toogle
        name="EVM"
        active={props.EVM}
        toogle={() => {
          props.setEVM(!props.EVM)
        }}
      />
      <Toogle
        name="SpacesVM"
        active={props.spacesVM}
        toogle={() => {
          props.setSpaces(!props.spacesVM)
        }}
      />
      <Toogle
        name="TimestampVM"
        active={props.timestampVM}
        toogle={() => {
          props.setTimestamp(!props.timestampVM)
        }}
      />
    </div>
  )
}

export default FilterBar

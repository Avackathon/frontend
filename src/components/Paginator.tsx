import React, { useMemo } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"

type Props = {
  totalItems: number
  startingIndex: number
  onNext: () => void
  onPrevious: () => void
  onPage: (param: number) => void
  pageSize: number
}
const Paginator = (props: Props) => {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{props.startingIndex + 1}</span> to{" "}
            <span className="font-medium">
              {" "}
              {Math.min(props.startingIndex + props.pageSize, props.totalItems)}
            </span>{" "}
            of <span className="font-medium">{props.totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <span
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => {
                props.onPrevious()
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            {Array.from(
              Array(Math.ceil(props.totalItems / props.pageSize)).keys()
            ).map((el) => {
              return (
                <>
                  {Math.ceil(props.startingIndex / props.pageSize) === el ? (
                    <span
                      onClick={() => props.onPage(el)}
                      aria-current="page"
                      className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative
               inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      {el + 1}
                    </span>
                  ) : (
                    <span
                      onClick={() => props.onPage(el)}
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative
             inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      {el + 1}{" "}
                    </span>
                  )}
                </>
              )
            })}
            <span
              onClick={props.onNext}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Paginator

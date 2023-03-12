import { ethers } from 'ethers'

export const PaddyListsForFarmer = (props) => {
  return (
    <div className="flow-root">
      <div className="text-center font-bold text-lg">
        {props.title || 'Lists'}
      </div>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {props.lists &&
          props.lists.map((list) => (
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">UPC: {list[0]}</p>
                  <p className="text-sm truncate">Type: {list[7]}</p>
                  <p className="text-sm truncate">
                    Weight: {list[8].toNumber()}
                  </p>
                  <p className="text-sm truncate">State: {list[9]}</p>
                </div>

                {/* Code to ship to maufacturer dropdown */}
                {list[9] === 'Harvested' ? (
                  <div class="group inline-block relative">
                    <button class="bg-blue-500 text-white rounded font-semibold py-2 px-4 rounded inline-flex items-center">
                      <span class="mr-1">Ship to Manufacturer</span>
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </button>
                    <ul class="z-10 absolute hidden text-gray-700 pt-1 group-hover:block">
                      {props.manufacturers &&
                        props.manufacturers.map((manufacturer) => (
                          <li class="">
                            <button
                              onClick={() =>
                                props.shipToManufacturer(
                                  list[0],
                                  manufacturer[3],
                                )
                              }
                              class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                            >
                              {manufacturer[0]}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <div class="group inline-block relative">
                    <button
                      disabled={true}
                      class="bg-green-400 text-black rounded font-semibold py-2 px-4 rounded inline-flex items-center"
                    >
                      <span class="mr-1">Shipped to Manufacturer</span>
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

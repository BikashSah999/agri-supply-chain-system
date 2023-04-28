import { useState, useEffect } from 'react'
export const Distributor = (props) => {
  const [allRiceProducts, setAllRiceProducts] = useState([])
  const [allRiceProductsOwned, setAllRiceProductsOwned] = useState([])
  const [riceToReceive, setAllRiceToReceive] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allRetailers, setAllRetailers] = useState([])

  useEffect(() => {
    props.getAllRiceProduct().then((data) => {
      setAllRiceProducts(data)
    })
    props.allUsers().then((data) => {
      setAllUsers(data)
    })
  }, [])

  useEffect(() => {
    props.getAllRiceProduct().then((data) => {
      setAllRiceProducts(data)
    })
  }, [receiveRice, shipToRetailer])

  useEffect(() => {
    setAllRetailers(allUsers.filter((user) => user[1] === 'Retailer'))
  }, [allUsers])

  useEffect(() => {
    setAllRiceToReceive(allRiceProducts.filter(
      (rice) => rice[6] === 2 && rice[10] === props.address,
    ))
    setAllRiceProductsOwned(
      allRiceProducts.filter((rice) => rice[7] === props.address),
    )
  }, [allRiceProducts])

  const shipToRetailer = (_productId, retailerAddress) => {
    props.shipToRetailer(_productId, retailerAddress)
  }

  const receiveRice = (_productId, _address) => {
    props.receiveByDistributor(_productId, _address)
  }

  return (
    <div className="flex gap-x-8">
      <div>
        <div className="text-center font-bold text-lg mt-4">
          {props.title || 'Rice to Receive'}
        </div>
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          {riceToReceive &&
            riceToReceive.map((list) => (
              <div className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Product ID: {list[1]}
                    </p>
                    <p className="text-sm truncate">Name: {list[2]}</p>
                    <p className="text-sm truncate">
                      Weight: {list[4].toNumber()}{' '}
                    </p>
                    <p className="text-sm truncate">
                      Price: {list[3].toNumber()}{' '}
                    </p>
                    <button onClick={() => receiveRice(list[1], props.address)} class="bg-blue-500 text-white rounded font-semibold py-2 px-4 mt-2 rounded inline-flex items-center">
                      Receive
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="text-center font-bold text-lg mt-4">
          {props.title || 'Rice to Ship'}
        </div>
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          {allRiceProductsOwned &&
            allRiceProductsOwned.map((list) => (
              <div className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Product ID: {list[1]}
                    </p>
                    <p className="text-sm truncate">Name: {list[2]}</p>
                    <p className="text-sm truncate">
                      Weight: {list[4].toNumber()}{' '}
                    </p>
                    <p className="text-sm truncate">
                      Price: {list[3].toNumber()}{' '}
                    </p>
                    {list[6] === 3 &&
                    <div class="group inline-block relative mt-4">
                      <button class="bg-blue-500 text-white rounded font-semibold py-2 px-4 rounded inline-flex items-center">
                        <span class="mr-1">Ship to Retailer</span>
                        <svg
                          class="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </button>
                      <ul class="z-10 absolute hidden text-gray-700 pt-1 group-hover:block">
                        {allRetailers &&
                          allRetailers.map((retailer) => (
                            <li class="">
                              <button
                                onClick={() =>
                                  shipToRetailer(
                                    list[1],
                                    retailer[3],
                                  )
                                }
                                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                              >
                                {retailer[0]}
                              </button>
                            </li>
                          ))}
                      </ul>
                    </div>
                  }
                  {list[6] === 4 &&
                  <button class="bg-green-500 text-white rounded font-semibold py-2 px-4 rounded inline-flex items-center mt-4">
                      <span class="mr-1">Shipped to Retailer</span>
                  </button>
                  }
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

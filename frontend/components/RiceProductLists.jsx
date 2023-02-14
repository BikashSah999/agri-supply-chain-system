import { useState, useEffect } from 'react'
export const RiceProductLists = (props) => {
  const [allRiceProducts, setAllRiceProducts] = useState([])
  const [allRiceProductsOwned, setAllRiceProductsOwned] = useState([])

  useEffect(() => {
    props.getAllRiceProduct().then((data) => {
      setAllRiceProducts(data)
    })
  }, [])

  useEffect(() => {
    setAllRiceProductsOwned(
      allRiceProducts.filter((rice) => rice[7] === props.address),
    )
    console.log(allRiceProductsOwned)
  }, [allRiceProducts])

  return (
    <div className="flow-root">
      <div className="text-center font-bold text-lg">
        {props.title || 'Lists'}
      </div>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {allRiceProductsOwned &&
          allRiceProductsOwned.map((list) => (
            <li className="py-3 sm:py-4">
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
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

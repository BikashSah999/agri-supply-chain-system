import { useEffect, useState } from 'react'
import { PaddyListsForManufacturer } from './PaddyListsForManufacturer'
import { RiceProductLists } from './RiceProductLists'

export const Manufacturer = (props) => {
  const [allPaddy, setAllPaddy] = useState([])
  const [paddyOwned, setPaddyOwned] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [showPaddy, setShowPaddy] = useState(true)
  const [distributors, setDistributors] = useState([])

  useEffect(() => {
    props.getAllPaddy().then((data) => {
      setAllPaddy(data)
    })
    props.allUsers().then((data) => {
      setAllUsers(data)
    })
  }, [])

  useEffect(() => {
    setDistributors(allUsers.filter((user) => user[1] === 'Wholeseller'))
  }, [allUsers])

  useEffect(() => {
    setPaddyOwned(allPaddy.filter((paddy) => paddy[3] === props.address))
  }, [allPaddy])

  useEffect(() => {
    props.getAllPaddy().then((data) => {
      setAllPaddy(data)
    })
  }, [receiveByManufacturer, processByManufacturer, packRice])
  
  const receiveByManufacturer = (_upc, _address) => {
    props.receiveByManufacturer(_upc, _address)
  }

  const processByManufacturer = (_upc) => {
    props.processByManufacturer(_upc)
  }

  const packRice = (_upc, productWeight, productName, productId, productPrice, address) => {
    props.packRice(
      _upc,
      productWeight,
      productName,
      productId,
      productPrice,
      address,
    )
  }

  return (
    <div className="flex flex-col py-2 px-2">
      {/* // <div className="flex items-center gap-16"> */}
      <div className="flex gap-8">
        <button
          onClick={() => setShowPaddy(true)}
          className={`rounded font-semibold py-2 px-4 rounded inline-flex items-center ${
            showPaddy ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          <span class="mr-1">Paddy</span>
        </button>
        <button
          onClick={() => setShowPaddy(false)}
          className={`rounded font-semibold py-2 px-4 rounded inline-flex items-center ${
            !showPaddy ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          <span className="mr-1">Rice</span>
        </button>
      </div>
      {showPaddy ? (
        <PaddyListsForManufacturer
          allPaddyOwned={paddyOwned}
          receiveByManufacturer={receiveByManufacturer}
          address={props.address}
          processByManufacturer={processByManufacturer}
          packRice={packRice}
          name={props.name}
        />
      ) : (
        <RiceProductLists
          getAllRiceProduct={props.getAllRiceProduct}
          distributors={distributors}
          shipToDistributor={props.shipToDistributor}
          address={props.address}
        />
      )}
    </div>
  )
}

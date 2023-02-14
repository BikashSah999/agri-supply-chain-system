import { useEffect, useState } from 'react'
import { PaddyListsForManufacturer } from './PaddyListsForManufacturer'
import { RiceProductLists } from './RiceProductLists'

export const Manufacturer = (props) => {
  const [allPaddy, setAllPaddy] = useState([])
  const [paddyOwned, setPaddyOwned] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [showPaddy, setShowPaddy] = useState(true)

  useEffect(() => {
    props.getAllPaddy().then((data) => {
      setAllPaddy(data)
    })
    props.allUsers().then((data) => {
      setAllUsers(data)
    })
  }, [])

  useEffect(() => {
    setPaddyOwned(allPaddy.filter((paddy) => paddy[3] === props.address))
  }, [allPaddy])

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
          receiveByManufacturer={props.receiveByManufacturer}
          address={props.address}
          processByManufacturer={props.processByManufacturer}
          packRice={props.packRice}
        />
      ) : (
        <RiceProductLists
          getAllRiceProduct={props.getAllRiceProduct}
          address={props.address}
        />
      )}
    </div>
  )
}

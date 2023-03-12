import { use, useEffect, useState } from 'react'
import { PaddyListsForFarmer } from './PaddyListsForFarmer'

export const Farmer = (props) => {
  const [upc, setUpc] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [variety, setVariety] = useState('')
  const [weight, setWeight] = useState(0)
  const [allPaddy, setAllPaddy] = useState([])
  const [paddyOwned, setPaddyOwned] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [manufacturers, setManufacturers] = useState([])

  useEffect(() => {
    props.getAllPaddy().then((data) => {
      setAllPaddy(data)
    })
    props.allUsers().then((data) => {
      setAllUsers(data)
    })
  }, [])

  useEffect(() => {
    setUpc(props.name.substring(0, props.name.indexOf(' ')) + '-' + variety + '-' + Math.floor(Math.random()*(999-100+1)+100))
  }, [variety])

  useEffect(() => {
    setManufacturers(allUsers.filter((user) => user[1] === 'Manufacturer'))
  }, [allUsers])

  useEffect(() => {
    setPaddyOwned(allPaddy.filter((paddy) => paddy[1] === props.address))
  }, [allPaddy])

  useEffect(() => {
    props.getAllPaddy().then((data) => {
      setAllPaddy(data)
    })
  }, [onSave, allPaddy, shipToManufacturer])

  const onSave = () => {
    props.harvestPaddy(upc, latitude, longitude, weight, variety)
    setUpc('')
    setLatitude('')
    setLongitude('')
    setVariety('')
    setWeight('')
  }

  const shipToManufacturer = (_upc, _manufacturerId) => {
    props.shipToManufacturer(_upc, _manufacturerId)
  }

  const onCancel = () => {
    setUpc('')
    setLatitude('')
    setLongitude('')
    setVariety('')
    setWeight('')
  }

  return (
    <div className="flex items-center gap-16">
      <PaddyListsForFarmer
        title={'Paddy Owned'}
        lists={paddyOwned}
        manufacturers={manufacturers}
        shipToManufacturer={shipToManufacturer}
      />
      <div className="p-8 rounded border border-gray-200">
        <h1 className="font-medium text-3xl">Add Product</h1>
        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="upc"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              UPC
            </label>
            <input
              type="text"
              name="upc"
              id="upc"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter UPC"
              value={upc}
              onChange={(event) => setUpc(event.target.value)}
              disabled={true}
            />
          </div>

          <div>
            <label
              htmlFor="latitude"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Farm Latitude
            </label>
            <input
              type="text"
              name="latitude"
              id="latitude"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter Farm Latitude"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Farm Longitude
            </label>
            <input
              type="text"
              name="longitude"
              id="longitude"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter Farm Longitude"
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="variety"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Variety
            </label>
            <input
              type="text"
              name="variety"
              id="variety"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter Paddy Variety"
              value={variety}
              onChange={(event) => setVariety(event.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="variety"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Weight
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Paddy Weight in Kg"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
          </div>
        </div>

        <div className="space-x-4 mt-8">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            disabled={!upc || !latitude || !longitude || !variety || !weight}
            onClick={onSave}
          >
            Harvest
          </button>
          <button
            className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { ethers } from 'ethers'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

export const Retailer = (props) => {
  const [allRiceProducts, setAllRiceProducts] = useState([])
  const [allRiceProductsOwned, setAllRiceProductsOwned] = useState([])
  const [riceToReceive, setAllRiceToReceive] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [customerAddress, setCustomerAddress] = useState('')
  const [error, setError] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const onSell = (_productId) => {
    if (ethers.utils.isAddress(customerAddress)) {
        props.sellToCustomer(_productId, customerAddress)
      } else {
        setError(true)
    }
  }

  useEffect(() => {
    props.getAllRiceProduct().then((data) => {
      setAllRiceProducts(data)
    })
  }, [])

  useEffect(() => {
    props.getAllRiceProduct().then((data) => {
      setAllRiceProducts(data)
    })
  }, [receiveRice, onSell])

  useEffect(() => {
    setAllRiceToReceive(allRiceProducts.filter(
      (rice) => (rice[6] === 4 && rice[11] === props.address),
    ))
    setAllRiceProductsOwned(
      allRiceProducts.filter((rice) => rice[7] === props.address),
    )
    console.log(allRiceProducts)
  }, [allRiceProducts])

  const receiveRice = (_productId, _address) => {
    props.receivedByRetailer(_productId, _address)
  }

  return (
    <div className="flex gap-x-8">
      <div>
        <div className="text-center font-bold text-lg mt-4">
          {props.title || 'Rice to Receive'}
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
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
          {props.title || 'Rice to Sell'}
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
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
                    <button onClick={openModal} class="bg-green-500 text-white rounded font-semibold py-2 px-4 rounded inline-flex items-center mt-4">
                      Sell
                    </button>
                  </div>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    {/* <button class="bg-blue-500 text-white rounded font-semibold py-2 px-4 rounded" onClick={closeModal}>Close</button> */}
                    <div className="p-8 rounded border border-gray-200">
                      <h1 className="font-medium text-3xl">Sell Rice</h1>
                      <div className="mt-8 grid lg:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="text-sm text-gray-700 block mb-1 font-medium"
                          >
                            Enter Customer Address
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="Enter Product Name"
                            value={customerAddress}
                            onChange={(event) => {
                                setError(false)
                                setCustomerAddress(event.target.value)
                                }
                            }
                          />
                          <p
                            className={`text-red-600	${
                                error
                                ? 'block'
                                : 'hidden'
                            }`}
                            >
                            Invalid Address
                            </p>
                        </div>
                      </div>

                      <div className="space-x-4 mt-8">
                        <button
                          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                          disabled={!customerAddress}
                          onClick={() => onSell(list[1])}
                        >
                          Sell
                        </button>
                        <button
                          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

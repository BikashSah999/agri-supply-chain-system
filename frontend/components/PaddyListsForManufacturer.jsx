import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import QRCode from 'react-qr-code'
import downloadjs from 'downloadjs'
import html2canvas from 'html2canvas'

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

export const PaddyListsForManufacturer = (props) => {
  const paddyToReceive = props.allPaddyOwned.filter(
    (paddy) => paddy[9] === 'ShippedToManufacturer' && paddy[3] === props.address,
  )
  const paddyToProcess = props.allPaddyOwned.filter(
    (paddy) => paddy[9] === 'ReceivedByManufacturer' && paddy[3] === props.address,
  )
  const paddyToPack = props.allPaddyOwned.filter(
    (paddy) => paddy[9] === 'Processed' && paddy[3] === props.address,
  )

  const [modalIsOpen, setIsOpen] = useState(false)
  const [productId, setProductId] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productWeight, setProductWeight] = useState(0)
  const [productName, setProductName] = useState('')
  const [showQr, setShowQr] = useState(false)

  const openModal = (_productId) => {
    setShowQr(false)
    setIsOpen(true)
    setProductId(_productId + '-' + props.name.substring(0, props.name.indexOf(' ')))
  }

  const closeModal = () => {
    setIsOpen(false)
    setProductId('')
  }

  const onSave = (_upc) => {
    setShowQr(true)
    props.packRice(
      _upc,
      productWeight,
      productName,
      productId,
      productPrice,
      props.address,
    )
  }

  const downloadQRCode = async () => {
    const qrCode = document.querySelector('.qrcode')
    if (!qrCode) return
    const canvas = await html2canvas(qrCode)
    const dataURL = canvas.toDataURL('image/png')
    downloadjs(dataURL, 'download.png', 'image/png')
  }

  return (
    <div class="flex pt-8 gap-16">
      {/* Paddy List to receive */}
      <div className="flow-root w-fit">
        <div className="text-center font-bold text-lg">
          Paddy Lists to receive
        </div>
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {paddyToReceive &&
            paddyToReceive.map((list) => (
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      UPC: {list[0]}
                    </p>
                    <p className="text-sm truncate">Type: {list[7]}</p>
                    <p className="text-sm truncate">
                      Weight: {list[8].toNumber()}
                    </p>
                    <p className="text-sm truncate">State: {list[9]}</p>
                  </div>

                  <div class="group inline-block relative">
                    <button
                      onClick={() =>
                        props.receiveByManufacturer(list[0], props.address)
                      }
                      class="bg-blue-500 text-white rounded font-semibold py-2 px-4 rounded inline-flex items-center"
                    >
                      <span class="mr-1">Receive</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {/* Paddy List to be process */}
      <div className="flow-root w-fit">
        <div className="text-center font-bold text-lg">
          Paddy Lists to Process
        </div>
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {paddyToProcess &&
            paddyToProcess.map((list) => (
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      UPC: {list[0]}
                    </p>
                    <p className="text-sm truncate">Type: {list[7]}</p>
                    <p className="text-sm truncate">
                      Weight: {list[8].toNumber()}
                    </p>
                    <p className="text-sm truncate">State: {list[9]}</p>
                  </div>

                  <div class="group inline-block relative">
                    <button
                      onClick={() => props.processByManufacturer(list[0])}
                      class="bg-blue-500 text-white rounded font-semibold py-2 px-4 rounded inline-flex items-center"
                    >
                      <span class="mr-1">Process</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Paddy List to Pack */}
      <div className="flow-root w-fit">
        <div className="text-center font-bold text-lg">Paddy Lists to Pack</div>
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {paddyToPack &&
            paddyToPack.map((list) => (
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      UPC: {list[0]}
                    </p>
                    <p className="text-sm truncate">Type: {list[7]}</p>
                    <p className="text-sm truncate">
                      Weight: {list[8].toNumber()}
                    </p>
                    <p className="text-sm truncate">State: {list[9]}</p>
                  </div>

                  <div class="group inline-block relative">
                    <button
                      onClick={() => openModal(list[0])}
                      class="bg-blue-500 text-white rounded font-semibold py-2 px-4 rounded inline-flex items-center"
                    >
                      <span class="mr-1">Pack</span>
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
                      <h1 className="font-medium text-3xl">Pack Rice</h1>
                      <div className="mt-8 grid lg:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="product_code"
                            className="text-sm text-gray-700 block mb-1 font-medium"
                          >
                            Product Code
                          </label>
                          <input
                            type="text"
                            name="product_code"
                            id="product_code"
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="Enter Product Code"
                            value={productId}
                            disabled={true}
                            onChange={(event) =>
                              setProductId(event.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="price"
                            className="text-sm text-gray-700 block mb-1 font-medium"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="Enter Farm Latitude"
                            value={productPrice}
                            onChange={(event) =>
                              setProductPrice(event.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="name"
                            className="text-sm text-gray-700 block mb-1 font-medium"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="Enter Product Name"
                            value={productName}
                            onChange={(event) =>
                              setProductName(event.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="weight"
                            className="text-sm text-gray-700 block mb-1 font-medium"
                          >
                            Weight
                          </label>
                          <input
                            type="number"
                            name="weight"
                            id="weight"
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="Enter Weight"
                            value={productWeight}
                            onChange={(event) =>
                              setProductWeight(event.target.value)
                            }
                          />
                        </div>
                        <p
                          className={`text-red-600	${
                            productWeight > list[8].toNumber()
                              ? 'block'
                              : 'hidden'
                          }`}
                        >
                          Weight can not be greater than paddy weight
                        </p>
                      </div>

                      <div className="space-x-4 mt-8">
                        <button
                          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                          disabled={
                            !productId ||
                            !productName ||
                            !productPrice ||
                            !productWeight ||
                            productWeight > list[8].toNumber()
                          }
                          onClick={() => onSave(list[0])}
                        >
                          Pack
                        </button>
                        <button
                          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                    {showQr && (
                      <>
                        <div className="qrcode">
                          <QRCode
                            size={128}
                            style={{
                              height: '100px',
                              maxWidth: '100%',
                              width: '100%',
                            }}
                            value={productId}
                            viewBox={`0 0 128 128`}
                          />
                        </div>
                        <button
                          onClick={() => downloadQRCode()}
                          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                        >
                          Download QR
                        </button>
                      </>
                    )}
                  </Modal>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

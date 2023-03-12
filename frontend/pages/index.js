import Head from 'next/head'
import { useWeb3 } from '@3rdweb/hooks'
import { Navbar } from '../components/Navbar'
import { AddRole } from '../components/AddRole'
import contractRole from '../../backend/artifacts/contracts/Role.sol/Role.json'
import contractProduct from '../../backend/artifacts/contracts/Product.sol/Product.json'
import { useEffect, useState } from 'react'
import {
  ADMIN_ADDRESS,
  ROLE_CONTRACT_ADDRESS,
  PRODUCT_CONTRACT_ADDRESS,
} from '@/constant'
import { Contract, ethers, providers } from 'ethers'
import React from 'react'
import { Farmer } from '@/components/Farmer'
import { List } from '@/components/List'
import { Manufacturer } from '@/components/Manufacturer'
import { QualityChecker } from '@/components/QualityChecker'
import { Error } from '@/components/Error'
import { Distributor } from '@/components/Distributor'
import { Retailer } from '@/components/Retailer'

export default function Home() {
  const { address, connectWallet } = useWeb3()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [hasAccess, setHasAccess] = useState(false)
  const [contract, setContract] = useState(null)
  const [productContract, setProductContract] = useState(null)

  // Get Contract
  useEffect(() => {
    // if (!window.ethereum) return
    // const provider = new providers.Web3Provider(window.ethereum)
    // const signer = provider.getSigner()
    // let contract = new Contract(ROLE_CONTRACT_ADDRESS, contractRole.abi, signer)
    // setContract(contract)
    // let productContract = new Contract(
    //   PRODUCT_CONTRACT_ADDRESS,
    //   contractProduct.abi,
    //   signer,
    // )
    // setProductContract(productContract)

    // if (!window.ethereum) return
    const provider = new providers.JsonRpcProvider('http://127.0.0.1:7545')
    const signer = provider.getSigner()
    let contract = new Contract(ROLE_CONTRACT_ADDRESS, contractRole.abi, signer)
    setContract(contract)
    let productContract = new Contract(
      PRODUCT_CONTRACT_ADDRESS,
      contractProduct.abi,
      signer,
    )
    setProductContract(productContract)
  }, [])

  // Get user from address and based on role give access to page
  useEffect(() => {
    if (address) {
      if (address === ADMIN_ADDRESS) {
        setRole('Admin')
        setName('Admin')
        setHasAccess(true)
      } else {
        contract.getUser(address).then((data) => {
          if (data.length) {
            setRole(data[0])
            setName(data[1])
            setHasAccess(data[2])
          }
        })
      }
    } else {
      setRole('')
      setName('')
    }
  }, [address])

  // Add user
  const addUser = (name, address, role) => {
    if (ethers.utils.isAddress(address)) {
      contract.setUser(address, role, name)
    } else {
      console.log('Addess not valid')
    }
  }

  // get all users
  const getAllUsers = () => {
    const users = contract.getAllUsers().then((data) => {
      return data
    })
    return users
  }

  // change user access
  const changeUserAccess = (address) => {
    contract.changeAccess(address)
  }

  // harvest paddy
  const harvestPaddy = (_upc, _latitude, _longitude, _weight, _variety) => {
    productContract.harvestPaddy(
      _upc,
      address,
      name,
      _latitude,
      _longitude,
      _variety,
      _weight,
    )
  }

  // get all paddy
  const getAllPaddy = () => {
    const paddy = productContract.getAllPaddy().then((data) => {
      return data
    })
    return paddy
  }

  // ship paddy to manufacturer
  const shipToManufacturer = (_upc, _addr) => {
    productContract.shipToManufacturer(_upc, _addr)
  }

  // receive paddy by manufacturer
  const receiveByManufacturer = (_upc, _addr) => {
    productContract.receivedByManufacturer(_addr, _upc)
  }

  // process paddy by manufacturer
  const processByManufacturer = (_upc, _addr) => {
    productContract.processPaddy(_upc)
  }

  // pack rice
  const packRice = (_upc, _weight, _name, _productId, _price, _addr) => {
    productContract.packRice(_upc, _weight, _name, _productId, _price, _addr)
  }

  // get all rice product
  const getAllRiceProduct = () => {
    const rice = productContract.getAllRice().then((data) => {
      return data
    })
    return rice
  }

  // quality verify
  const checkQualityRice = (_addr, _productId, _approved) => {
    productContract.checkQualityRice(_addr, _productId, _approved)
  }

  // ship rice to distributor
  const shipToDistributor = (_productId, _addr) => {
    productContract.shipToDistributor(_productId, _addr)
  }

  // receive paddy by distributor
  const receiveByDistributor = (_upc, _addr) => {
    productContract.receivedByDistributor(_upc, _addr)
  }

  // ship rice to retailer
  const shipToRetailer = (_productId, _addr) => {
    productContract.shipToRetailer(_productId, _addr)
  }

  // receive paddy by distributor
  const receivedByRetailer = (_upc, _addr) => {
    productContract.receivedByRetailer(_upc, _addr)
  }

  // sell rice to customer
  const sellToCustomer = (_upc, _addr) => {
    productContract.sellToCustomer(_upc, _addr)
  }

  const renderComponentBasedOnRole = () => {
    switch (role) {
      case 'Admin':
        return (
          <AddRole
            addUser={addUser}
            allUsers={getAllUsers}
            changeUserAccess={changeUserAccess}
          />
        )
      case 'Farmer':
        return (
          <Farmer
            harvestPaddy={harvestPaddy}
            getAllPaddy={getAllPaddy}
            address={address}
            allUsers={getAllUsers}
            shipToManufacturer={shipToManufacturer}
            name={name}
          />
        )
      case 'Manufacturer':
        return (
          <Manufacturer
            getAllPaddy={getAllPaddy}
            allUsers={getAllUsers}
            address={address}
            receiveByManufacturer={receiveByManufacturer}
            processByManufacturer={processByManufacturer}
            packRice={packRice}
            getAllRiceProduct={getAllRiceProduct}
            shipToDistributor={shipToDistributor}
            name={name}
          />
        )
      case 'Quality Checker':
        return (
          <QualityChecker
            getAllRiceProduct={getAllRiceProduct}
            checkQualityRice={checkQualityRice}
            address={address}
          />
        )
      case 'Wholeseller':
        return (
          <Distributor
            getAllRiceProduct={getAllRiceProduct}
            address={address}
            receiveByDistributor={receiveByDistributor}
            allUsers={getAllUsers}
            shipToRetailer={shipToRetailer}
          />
        )
      case 'Retailer':
        return (
          <Retailer
            getAllRiceProduct={getAllRiceProduct}
            address={address}
            receivedByRetailer={receivedByRetailer}
            allUsers={getAllUsers}
            sellToCustomer={sellToCustomer}
          />
        )
      default:
        return <div>Work on Progress</div>
    }
  }

  return (
    <>
      <Head>
        <title>Supply Chain Management</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen bg-sky-200">
        <Navbar name={name} address={address} />
        <div className="flex justify-center items-center h-5/6">
          {address ? (
            hasAccess ? (
              renderComponentBasedOnRole()
            ) : (
              <Error />
            )
          ) : (
            <button
              onClick={() => connectWallet('injected')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Connect to your account
            </button>
          )}
        </div>
      </div>
    </>
  )
}

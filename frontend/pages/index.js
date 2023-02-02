import Head from 'next/head'
import { useWeb3 } from '@3rdweb/hooks'
import { Navbar } from '../components/Navbar'
import { AddRole } from '../components/AddRole'
// import contract from "../../backend/artifacts/contracts/Role.sol/Role.json";
import { useEffect, useState } from 'react'
// import "@nomicfoundation/hardhat-toolbox";
// import { ethers } from "hardhat";
import React from 'react'

// const contractAddress = "0x8F042A99F4EbB24cD8405Ae02B8c073B5F375427";
// const addRoleContract = new ethers.Contract(contractAddress, contract.abi);

export default function Home() {
  const { address, connectWallet } = useWeb3()
  const [role, setRole] = useState('')
  // useEffect(() => {
  //   if (address === process.env.GOERLI_PRIVATE_KEY) {
  //     setRole("Admin");
  //   } else {
  //     const user = addRoleContract.getUser(address);
  //     console.log(user);
  //   }
  // }, [address]);

  return (
    <>
      <Head>
        <title>Supply Chain Management</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen bg-sky-200">
        <Navbar role={undefined} address={address} />
        <div className="flex justify-center items-center h-5/6">
          {address ? (
            <AddRole />
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

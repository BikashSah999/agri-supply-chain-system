import '../styles/globals.css'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import React from 'react'

export default function App({ Component, pageProps }) {
  const supportedChainIds = [1, 5, 4, 137, 1337]
  const connectors = {
    injected: {},
  }
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  )
}

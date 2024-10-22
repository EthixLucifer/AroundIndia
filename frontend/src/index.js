import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThirdwebProvider } from "@thirdweb-dev/react"
import { BaseSepoliaTestnet, Localhost } from "@thirdweb-dev/chains"
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = process.env.REACT_APP_CLIENT_ID;

root.render(
  <Router>
    <React.StrictMode>
      <ThirdwebProvider activeChain={{
        chainId: 1337, // Hardhat's default chainId
        rpc: ["http://127.0.0.1:8545"],
        nativeCurrency: {
          decimals: 18,
          name: "Ethereum",
          symbol: "ETH",
        },
        shortName: "localhost",
        slug: "localhost",
        testnet: true,
        chain: "Ethereum",
        name: "Localhost 8545",
      }} clientId={clientId}>
        <App />
      </ThirdwebProvider>
    </React.StrictMode>
  </Router>
);

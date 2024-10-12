import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThirdwebProvider } from "@thirdweb-dev/react"
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains"
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = process.env.REACT_APP_CLIENT_ID;

root.render(
  <Router>
    <React.StrictMode>
      <ThirdwebProvider activeChain={BaseSepoliaTestnet} clientId={clientId}>
        <App />
      </ThirdwebProvider>
    </React.StrictMode>
  </Router>
);

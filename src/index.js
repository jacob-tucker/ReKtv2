import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as fcl from "@onflow/fcl"
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use this for localnet
// Steps to authentication:
// Step 1) Run flow emulator start -v in a termiaml
// Step 2) Run fcl-wallet in a second terminal (we need the .put for this part)
fcl.config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate")

/* For testnet
fcl.config()
  .put("accessNode.api", "https://access-testnet.onflow.org") // connect to Flow testnet
  .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn") // use Blocto testnet wallet
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

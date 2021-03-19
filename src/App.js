import React from 'react';
import "./App.css"

import GetLatestBlock from './GetLatestBlock'
import Authenticate from './Authenticate'
import SendTransaction from './SendTransaction';
//Hi

function App() {
  return (
    <div class="Wrapper">
      <GetLatestBlock />
      <Authenticate />
      <SendTransaction />
    </div>
  );
}

export default App;

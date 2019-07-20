import React from 'react';
import './App.css';

import OwnGame from './components/OwnGame';
import Time from './components/Time';

function App() {
  return (
    <div>
      <div className="container">
        <Time />
        <OwnGame />
      </div>
    </div>
  );
}

export default App;

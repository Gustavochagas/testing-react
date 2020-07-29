import React from 'react';
import './App.sass';
import Users from './components/users/users';

function App() {
  return(
    <div className="App" data-testid="app">
      <Users />
    </div>
  )
}

export default App;

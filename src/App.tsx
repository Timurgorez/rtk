import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Todos } from './features/todo/Todos';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <Todos />
      </header>
    </div>
  );
}

export default App;

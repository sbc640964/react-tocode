import React from 'react';
import ReactDOM from 'react-dom';


import GuessTheNumber from './guessnumber';

const App = () => {

  return (
    <GuessTheNumber/>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);

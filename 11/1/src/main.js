import React from 'react';
import ReactDOM from 'react-dom';


import MultiInputs from './multiinputs';

const App = () => {

  return (
    <MultiInputs/>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);

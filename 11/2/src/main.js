import React from 'react';
import ReactDOM from 'react-dom';


import Converter from './converter';

const App = () => {

  return (
    <Converter/>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);

import React from 'react';
import ReactDOM from 'react-dom';


import ColorPicker from './colorpicker';

const App = () => {

  return (
    <ColorPicker defaultColor="001c8a"/>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);

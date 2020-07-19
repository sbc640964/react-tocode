import React from 'react';
import ReactDOM from 'react-dom';


import Records from './records';

const App = () => {

  return (
    <Records/>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);

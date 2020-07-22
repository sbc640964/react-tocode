import React from 'react';
import ReactDOM from 'react-dom';


import Container from './container';

const App = () => {

  return (
    <Container/>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);

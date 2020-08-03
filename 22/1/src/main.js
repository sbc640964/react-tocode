import React from 'react';
import ReactDOM from 'react-dom';


import TableActions from './table-actions';

const App = () => {

  return (
    <TableActions/>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);

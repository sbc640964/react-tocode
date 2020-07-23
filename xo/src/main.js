import React, {useState} from 'react';
import ReactDOM from 'react-dom';


import NaveBar from './navbar';
import ContainerGame from './container-game';


const App = () => {
  const [sound, setSound] = useState(null);
  return (
    <ContainerGame sound={sound}/>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);

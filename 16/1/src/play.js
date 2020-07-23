import React from 'react';

import '../css/main.css';


export default function game(props) {

    const {setPointsGame, placeRed} = props;

    return(
      <div className="game">
          {Array(10).fill(null).map( (item, index) => (
              <div style={{background: index+1 === placeRed ? 'red' : '#d5d5d5'}} key={index} onClick={ () => setPointsGame(index+1 === placeRed) }></div>
          ))}
      </div>
    )
}
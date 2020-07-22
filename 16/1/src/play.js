import React from 'react';

import '../css/main.css';


export default function play(props) {

    const {setPointsPlay, placeRed} = props;

    return(
      <div className="game">
          {Array(10).fill(null).map( (item, index) => (
              <div style={{background: index+1 === placeRed ? 'red' : '#d5d5d5'}} key={index} onClick={ () => setPointsPlay(index+1 === placeRed) }></div>
          ))}
      </div>
    )
}
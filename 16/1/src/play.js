import React from 'react';

import '../css/main.css';


export default function play(props) {

    const {setPointsPlay, placeRed} = props;

  // You're hiding a lot of logic inside the map,
  // and that makes the code hard to read
  // Better to refactor and extract most of the code to a sub-component
  // or to a helper function

    return(
      <div className="game">
          {Array(10).fill(null).map( (item, index) => (
              <div
                style={{background: index+1 === placeRed ? 'red' : '#d5d5d5'}}
                key={index}
                onClick={ () => setPointsPlay(index+1 === placeRed) }>
              </div>
          ))}
      </div>
    )

  // What I would write:
    return(
      <div className="game">
        {Array(10).fill(null).map((item, index) =>
          <Square
            key={index}
            placeRed={placeRed}
            item={item}
            index={index}
          />
      </div>
    )
}

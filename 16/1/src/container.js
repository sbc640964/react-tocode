import React, {useState} from 'react';

import Play from './play';
import PointsSection from './points';

export default function () {

    const [points, setPoints] = useState(0);
    const [placeRed, setPlaceRed] = useState(getRndInteger(1, 11));

    function setPointsPlay(check){

      // ternary is better used inside:
      // const newValue = points + (check ? 10 : -5)
      // (to save duplication)
        const newValue = check ? points+10 : points-5;

      // I thought you liked ternaries...
      // setPoints(newValue > 0 ? newValue : 0)
      // but my favorite is:
      // setPoints(Math.min(newValue, 0))
        if(newValue > 0) setPoints(newValue);
        else  setPoints(0);

        setPlaceRed(getRndInteger(1, 11));
    }

    function reset(){
        setPoints(0);
        setPlaceRed(getRndInteger(1, 11));
    }

    return(
        <div>
            <Play setPointsPlay={setPointsPlay} placeRed={placeRed}/>
            <PointsSection points={points} reset={reset}/>
        </div>
    )

}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

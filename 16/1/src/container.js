import React, {useState} from 'react';

import Play from './play';
import PointsSection from './points';

export default function () {

    const [points, setPoints] = useState(0);
    const [placeRed, setPlaceRed] = useState(() => getRndInteger(1, 11));

    function setPointsGame(check){

        const newValue = check ? points+10 : points-5;

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
            <Play setPointsGame={setPointsGame} placeRed={placeRed}/>
            <PointsSection points={points} reset={reset}/>
        </div>
    )

}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
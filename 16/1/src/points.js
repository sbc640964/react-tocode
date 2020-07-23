import React from 'react';


export default function ({ reset, points}) {

    return(
        <div>
            <h2>מס' הנקודות שלך: {points}</h2>
            <button onClick={() => reset()}>אפס</button>
        </div>
    )
}
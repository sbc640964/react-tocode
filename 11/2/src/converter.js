import React, {useEffect, useState} from 'react';

import '../css/main.css';

export default function () {

    //state
    const [seconds, setSeconds] = useState(0);

    function converter(s) {
        setSeconds(s);
    }

    return (
        <>
            <div>
                <label>
                    שעות
                    <input type="number" value={seconds/3600} onChange={(e) => converter(e.target.value*3600)}/>
                </label>
            </div>
            <div>
                <label>
                    דקות
                    <input type="number" value={seconds/60} onChange={(e) => converter(e.target.value*60)}/>
                </label>
            </div>
            <div>
                <label>
                    שניות
                    <input type="number" value={seconds} onChange={(e) => converter(e.target.value)}/>
                </label>
            </div>
        </>
    )
}

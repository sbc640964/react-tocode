import React, {useEffect, useState} from 'react';

import '../css/main.css';

export default function () {
    // Can you use only one state variable? Do you think you should?
    const [m, setM] = useState(0);
    const [s, setS] = useState(0);
    const [h, setH] = useState(0);

    function converter(secunds) {
        setH(secunds/3600);
        setM(secunds/60);
        setS(secunds);
    }
    // Please don't use id inside JSX
    // If anyone will create multiple instances of this component, they'll get multiple elements with the same id    
    return (
        <>
            <div>
                <label htmlFor="h">שעות</label>
                <input type="text" id="h" value={h} onChange={(e) => converter(e.target.value*3600)}/>
            </div>
            <div>
                <label htmlFor="m">דקות</label>
                <input type="text" id="m" value={m} onChange={(e) => converter(e.target.value*60)}/>
            </div>
            <div>
                <label htmlFor="s">שניות</label>
                <input type="text" id="s" value={s} onChange={(e) => converter(e.target.value)}/>
            </div>
        </>
    )
}

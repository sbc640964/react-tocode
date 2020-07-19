import React, {useEffect, useState} from 'react';


export default function () {
    const [m, setM] = useState(0);
    const [s, setS] = useState(0);
    const [h, setH] = useState(0);

    useEffect(()=>{
        setS(m*60);
    }, [m]);

    useEffect(()=>{
        setH(s/3600);
    }, [s]);

    useEffect(()=>{
        setM(h*60);
    }, [h]);

    return (
        <>
            <div>
                <label htmlFor="h">שעות</label>
                <input type="text" id="h" value={h} onChange={(e) => setH(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="m">דקות</label>
                <input type="text" id="m" value={m} onChange={(e) => setM(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="s">שניות</label>
                <input type="text" id="s" value={s} onChange={(e) => setS(e.target.value)}/>
            </div>
        </>
    )
}
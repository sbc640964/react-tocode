import React from 'react';

export default function ({setSound}) {

    return(
        <nav>
            <div>
                <icon onClick={() => setSound(v => !v)}></icon>
            </div>
            <div>
                <a>
                    <icon></icon>
                </a>
            </div>
        </nav>
    )
}
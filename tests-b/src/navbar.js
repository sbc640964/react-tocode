import React from 'react';

export default function NavBar({setSound, sound}) {

    return(
        <nav>
            <div>
                <i onClick={() => setSound(v => !v)}>{sound ? 'MIT' : 'SOUND'}</i>
            </div>
            <div>
                <a>LINK</a>
            </div>
        </nav>
    )
}
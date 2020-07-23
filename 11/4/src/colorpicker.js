import React, {useState} from 'react';
import tinycolor from 'tinycolor2';

import '../css/main.css';

export default function ({ color }) {
    const [currentColor, setCurrentColor] = useState(color);

    function style(){

        const _currentColor = tinycolor(currentColor);

        const style = {
            background:currentColor,
            color: _currentColor.isDark() ?
                _currentColor.lighten(20) :
                _currentColor.darken(20),
        }

        return style;
    }


    return(
        <div className="container">
           <input type="color" value={currentColor} onChange={(e) => setCurrentColor(e.target.value)}/>
           <div className="result" style={style()}>
               Result
           </div>
        </div>
    )
}
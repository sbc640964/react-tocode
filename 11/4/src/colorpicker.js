import React, {useState} from 'react';
import tinycolor from 'tinycolor2';

import '../css/main.css';


export default function (props) {
    const {defaultColor} = props;

    const [color, setColor] = useState(defaultColor ? defaultColor : '');


    function createDivs() {

        let currentColor = tinycolor(color).darken(5*4);

        const divs = [];
        for(let i = 0; i < 5; i++){
            console.log(i)
            divs.push(
                <div style={{background: currentColor.lighten(5).toString()}}></div>
            );
        }

        divs.push(
            <label>
                <input type="color" onChange={(e) => setColor(e.target.value)}/>
            </label>
        );

        currentColor = tinycolor(color).lighten(5);

        for(let i = 0; i < 5; i++){
            console.log(i)
            divs.push(
                <div style={{background: currentColor.darken(5).toString()}}></div>
            );
        }

        return divs;
    }

    return(
     <div>
        <div className="div-colors-result">
            {createDivs()}
        </div>
     </div>
    )
}
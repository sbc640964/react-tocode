import React, {useState} from 'react';
import tinycolor from 'tinycolor2';

import '../css/main.css';
import _ from 'lodash';

function LigherDivs({ color }) {
  return _.range(5).map((i) =>
    <div style={{background: color.lighten(5).toString()}}></div>
  );
}

function DarkerDivs({ color }) {
  return _.range(5).map((i) =>
    <div style={{background: color.darken(5).toString()}}></div>
  );
}

function ColorPicker({ setColor }) {
  return (
    <div>
      <label>
        <input type="color" onChange={(e) => setColor(e.target.value)}/>
      </label>
    </div>
  );
}

export default function (props) {
  const {defaultColor} = props;

  const [color, setColor] = useState(defaultColor ? defaultColor : '');

  return(
    <div className="div-colors-result">
      <LigherDivs color={tinycolor(color).darken(5*4)} />
      <ColorPicker setColor={setColor} />
      <DarkerDivs color={tinycolor(color).lighten(5)} />
    </div>
  )
}

import React, {useState} from 'react';
import {validation} from "../../../api-help";


export default function RangeInput(props){
    const {min, max, value, _onChange, step = 1, showNumberInput = true, label} = props;

    const [errors, setErrors] = useState([]);

    const fieldValidation = [
        `value|min:${min}|max:${max}`,
    ]

    function btnToRangePlus(){
        update(value + step);
    }

    function btnToRangeMinus(){
        update(value - step);
    }

    function onRange(e){
        update(e.target.value);
    }

    function update(v){
        if(!validation(fieldValidation, errors, setErrors, {value:v})) return
        _onChange(v);
    }

    return(
        <div className="item-range">
            <div className="d-flex">
                <span className="flex-1 font-weight-bold title">{label}</span>
                {showNumberInput &&
                    <div className="number-input d-flex">
                        <span className="btn" onClick={btnToRangePlus}>+</span>
                        <input type="number" value={value} onChange={onRange} min={min} max={max}/>
                        <span className="btn" onClick={btnToRangeMinus}>-</span>
                    </div>
                }
            </div>
            <div className="slide-container">
                <input type="range" className="slider" min={min} max={max} value={value} step={step} onChange={onRange} dir="ltr"/>
            </div>
            <div className="d-flex slide-min-max">
                <span className="sum max-slide">{max}</span>
                <span className="sum min-slide">{min}</span>
            </div>
        </div>
    )
}
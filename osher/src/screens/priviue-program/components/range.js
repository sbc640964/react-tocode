import React, {useEffect, useRef, useState} from 'react';
import {currencyFormat, validation} from "../../../api-help";
import Errors from "../../intro-form/components/error-form-field";


export default function RangeInput(props){
    const {min, max, value, _onChange, step = 1, showNumberInput = true, label, required} = props;

    const [errors, setErrors] = useState([]);
    const [valueB, setValueB] = useState('');

    const fieldValidation = [
        `value|min:${min}|max:${max}${required ? '|required' : ''}`,
    ]
    useEffect( ()=>{
        setValueB(value);
    }, [value])
    function btnToRangePlus(){
        update(value + step);
    }

    function btnToRangeMinus(){
        update(value - step);
    }

    function onRange(e){
        update(e.target.value);
    }

    function blurInput(e){
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
                    <div>
                        <div className="number-input d-flex">
                            <span className="btn" onClick={btnToRangePlus}>+</span>
                            <input type="number" value={valueB} onBlur={blurInput} onChange={e => setValueB(e.target.value)} min={min} max={max}/>
                            <span className="btn" onClick={btnToRangeMinus}>-</span>
                        </div>
                        <Errors errors={errors.value}/>
                    </div>
                }
            </div>
            <div className="slide-container">
                <input type="range" className="slider" min={min} max={max} value={value} step={step} onChange={onRange} dir="ltr"/>
            </div>
            <div className="d-flex slide-min-max">
                <span className="sum max-slide">{currencyFormat(max)}</span>
                <span className="sum min-slide">{currencyFormat(min)}</span>
            </div>
        </div>
    )
}
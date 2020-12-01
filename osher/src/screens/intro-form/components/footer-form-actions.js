import React from 'react';
import { validation } from "../../../api-help";


export default function Actions({next, prev, currentStep, validation}){

    function toNext(){
        if(validation()){
            next();
        }
    }

    return(
        <div className="footer-form">
            <div className="buttons-form">
                {currentStep > 0 &&
                    <a className="btn-sbc btn-light-blue" onClick={prev}>הקודם</a>
                }
                <a className="btn-sbc btn-gold" style={{marginRight: 'auto'}} onClick={toNext}>המשך</a>
            </div>
        </div>
    )
}
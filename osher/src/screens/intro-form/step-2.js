import React from 'react';


export default function FormStep2(){

    return(
        <div className="step step-content step-content-2">
            <div className="subject-form-step">
                <p>ניתן לכתוב כאן משפט הוראה כמו יש להזין את הפרטים הבאים:</p>
            </div>
            <div className="form-field-group">
                <label>
                    מס' ילדים
                    <input type="number"/>
                </label>
            </div>
        </div>
    )
}
import React, { useState, useRef, useEffect } from 'react';
import '../css/main.css';

export default function GuessTheNumber() {
    
    const [randomNumber] = useState(getRndInteger(0, 100));
    const [alert, setAlert] = useState(['נו... נחש כבר.', 'black']);
    const inputElement = useRef(null);

    useEffect(()=>{
        if(inputElement){
            const input = inputElement.current;
            input.focus();
        }
    }, [])
    function check(number){
        console.log('the select number is: ' + randomNumber);//for debaging

        if(!number){
            setAlert(['חבל, לא בא לך?', 'black'])
        }
        else if (parseInt(number) === randomNumber){
            setAlert(['יפה מאוד!!! איך ידעת?', 'green']);
        }
        else{
            setAlertWithTrick(number);
        }
    }

    function setAlertWithTrick(number) {

        const less = () => {
            setAlert(['הלכת על קטן...', 'orange'])
        };
        const more = () => {
            setAlert(['הגזמת...', 'red'])
        };
        
        const status = () => number < randomNumber;

        console.log('the status less is: ' + status());

        if(getRndInteger(0, 100) > 85){
            
            console.log('Trick');
            status() ? more() : less();
        }
        else{
            
            status() ? less() : more(); 
        }
    }

    return (
        <section>
            <h3>נחש מספר!</h3>
            <input type="number" onChange={(e)=>check(e.target.value)} max="100" ref={inputElement}/>
            <div class="alert" style={{color:alert[1]}}>{alert[0]}</div>
        </section>
    );
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
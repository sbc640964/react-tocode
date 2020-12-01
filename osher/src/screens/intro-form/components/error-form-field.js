import React from "react";

export default function Errors({errors}){

    if(typeof errors == 'string'){
        errors = [errors];
    }

    return(
        <>
            { errors && errors.map( (error, i) => (
                <small className="error-invalid-form" key={i}>{error}</small>
            ))}
        </>
    )
}
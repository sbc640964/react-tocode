import React, {useState} from 'react';
import styled from "styled-components";

export default function () {
    const [value, setValue] = useState('default value');

    function _setValue(e){
        setValue(e.target.value);
    }

    return(
        <InputDiv>
            {Array(10).fill(0).map( (item, index) => (
                <input key={index} type="text" value={value} onChange={_setValue}/>
            ))}
        </InputDiv>
    )
}

const InputDiv = styled.div`
    input{
        display: block;
        margin: 10px;
        padding: 3px;
        border: 1px solid #d5d5d5;
        border-radius: 4px;  
    }
`;
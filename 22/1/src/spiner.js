import React from 'react';
import styled from "styled-components";

export default function () {
    return(
        <SpinerStyle></SpinerStyle>
    )
}

const SpinerStyle = styled.span`
    width: 70px;
    height: 70px;
    border: 3px solid #000;
    border-bottom-color: #5d5d5d;
`;
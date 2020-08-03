import React from 'react';
import styled from "styled-components";

export default function RowTable(props) {
    return(
        <Row>
            {props.children}
        </Row>
    )
}

const Row = styled.div`
    border-bottom: 2px solid #c2c2c2;
    display: flex;
    flex-flow: row;
    align-items: center;
    cursor: pointer;
    
    &:hover{
      background: #EDEDED;
      box-shadow: 0px 0.5px 2px 0px rgba(0,0,0,0.5);
    }
`;
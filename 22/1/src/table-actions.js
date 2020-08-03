import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import produce from "immer";
import $ from 'jquery';

import RowTable from './row-table';
import Spiner from './spiner';

export default function TableActions(props) {
    const [rows, setRows] = useState([]);

    useEffect(()=> {
        $.getJSON('../json/data.json')
            .then((data)=>{
                setRows(data.rows);
            })
            .fail((jqxhr, textStatus, error)=>{
                const err = textStatus + ", " + error;
                console.log(error);
            });
    },[]);

    const icon = type => {
       //return 'url/to' + type + '.png';
        return 'https://image.flaticon.com/icons/svg/597/597177.svg';
    };

    function iconDirection(type, directionDebt){
        const imageName = directionDebt ? type+directionDebt : type;
        //return 'url/to/'+imageName+'.pmg';
        return 'https://image.flaticon.com/icons/svg/889/889578.svg';

    }

    function typeToHe(type, directionDebt){

    }

    const dateToString = (timestamp) => {
        if(Math.random() < 0.5){
            return 'לפני דקה';
        }
        return '01/02/20';
    }
    
    function rightOrDuty(type, debt) {

    }

    return(
        <>
            {rows ?
                <Table>
                    {rows.map((item, index) => (
                        <RowTable key={item.id}>
                            <Column>
                                <img width="15px" style={{padding:'15px'}} src={icon(item.category.type)} alt={item.category.type}/>
                            </Column>
                            <Column>
                                <p>{dateToString(item.date)}</p>
                            </Column>
                            <Column>
                                <img width="15px" src={iconDirection(item.category.type, item.debt)}/>
                            </Column>
                            <Column>
                                <p>{item.category.name}</p>
                            </Column>
                            <Column>
                                <p>{item.category.parent.name ? item.category.parent.name : ''}</p>
                            </Column>
                            <Column>
                                <p>{item.note}</p>
                            </Column>
                            <Column>
                                {item.payment_method &&
                                    <p>{item.payment_method.type_he}</p>
                                }
                            </Column>
                            <Column>
                                {item.direction === 'in' &&
                                    <p style={{color: 'green'}}>{item.amount}</p>
                                }
                            </Column>
                            <Column>
                                {item.direction === 'out' &&
                                <p style={{color: 'red'}}>{item.amount}</p>
                                }
                            </Column>
                            <Column>
                                {item.balance}.00
                            </Column>
                        </RowTable>
                    ))}
                </Table>
                //ספינר לגלגול בעת הקריאה של המידע מהשרת
                : <Spiner/>
            }
        </>
    )
}

function Table(props){
    return(
        <TableDiv>
            {props.children}
        </TableDiv>
    )
}


const TableDiv = styled.div`
 direction: rtl;
`;

const Column = styled.div`
  margin: 0px;
  width: 7%;
`;
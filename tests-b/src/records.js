import React from 'react';
import {useState, useEffect} from "react";
import $ from 'jquery';

import ItemRow from "./itemrow";

export default function (props) {

    const [records, setRecords] = useState([])

    useEffect(()=>{
        $.getJSON('./src/json/records.json', (data)=>{
            setRecords(data.rows);
        });
    },[]);


    return (
       <div>
           {records.map( item => (
               <ItemRow key={item.id} record={item}/>
           ))}
       </div>
    );
}
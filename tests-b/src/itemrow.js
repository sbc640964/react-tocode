import React from 'react';

export default function ItemRow(props) {
    const {record} = props;
    return(
        <div className="row">
            <div>{record.input_type}</div>
            <div>{record.date}</div>
            <div>{record.repeate_oparation  &&
                <img src="https://image.flaticon.com/icons/svg/2089/2089813.svg" alt="" width="15px"/>
            }</div>
            <div></div>
            <div></div>
            <hr/>
        </div>
    );
}

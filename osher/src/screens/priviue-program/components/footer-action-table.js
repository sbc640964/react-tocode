import React from 'react';
import Balance from "./balance";

export default function FooterActionsTable(props) {
    const {setNewChild} = props;

    function addChildMOde(){
        setNewChild(true);
    }

    return (
        <div className="table-footer-actions d-block">
             <div className="d-flex">
                 <span className=" flex-1"><a className="btn-sbc btn-blue" onClick={addChildMOde}>הוסף ילד</a></span>
                 <Balance/>
             </div>
         </div>
    )
}
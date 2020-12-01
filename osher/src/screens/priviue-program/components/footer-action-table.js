import React from 'react';

export default function FooterActionsTable(props) {
    const {setNewChild} = props;

    function addChildMOde(){
        setNewChild(true);
    }

    return (
        <div className="table-footer-actions d-block">
             <div className="d-flex">
                 <span className=" flex-1"><a className="btn-sbc btn-blue" onClick={addChildMOde}>הוסף ילד</a></span>
                 <span><a className="btn-sbc btn-light-blue">שמירה</a></span>
                 <span><a className="btn-sbc btn-gold">השוואה תוכניות שמורות (3)</a></span>
             </div>
         </div>
    )
}
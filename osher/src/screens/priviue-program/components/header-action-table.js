import React from 'react';

export default function HeaderActionsTable(props){

    const {modeMore, setModeMore} = props;

    function handleClickMoreInfo(){
        setModeMore( v => !v);
    }

    return(
        <div className="actions-top-table">
            <div className="d-flex">
                <div className="flex-1"><span><a className="btn-sbc font-weight-bold btn-with-icon btn-right"><img src="../../../../images/refresh.svg"/>איפוס</a></span></div>
                <div><span><a className="btn-sbc font-weight-bold btn-with-icon"><img src="../../../../images/printer.svg"/>הדפסה</a></span></div>
                <div>
                    <span><a className="btn-sbc btn-light-blue font-weight-bold" onClick={handleClickMoreInfo}>+ הצג {modeMore ? 'פחות' : 'יותר'}</a></span>
                </div>
            </div>
        </div>
    )
}
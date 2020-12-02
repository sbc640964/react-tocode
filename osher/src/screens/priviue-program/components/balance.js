import React from 'react';
import {connect} from "react-redux";
import {saveBalanceItem} from "../../../redux/actions";

function Balance(props){

    const {balance, dispatch} = props;

    function save(){
        dispatch(saveBalanceItem());
    }

    return(
        <>
            <span><a className="btn-sbc btn-light-blue" onClick={save} >שמירה</a></span>
            {balance.length > 1 &&
                <span><a className="btn-sbc btn-gold">השוואה תוכניות שמורות ({balance.length})</a></span>
            }
        </>
    )
}

function mapStateToProps(state) {
    return {
        balance: state.post.balance,
    };
}

export default connect(mapStateToProps)(Balance);



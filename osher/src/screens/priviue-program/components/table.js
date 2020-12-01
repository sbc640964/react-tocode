import React, {useState} from 'react';
import {connect} from "react-redux";

import RowTable from "./row-table";
import {getResultFromAmount} from "../../../api-help";
import NewChildRow from "./new-row-child";

function TableRegular(props){

    const {modeMore, children, programChildren, programsData, newChild, setNewChild} = props;

    return(
        <div className="table regular">
            <div className="header-table d-flex">
                <div>
                    <img src="../../../images/user.svg" className="icon" alt=""/>
                    <span>שם</span>
                </div>
                <div>
                    <img src="../../../images/clock.svg" className="icon" alt=""/>
                    <span>שנות המתנה</span>
                </div>
                <div>
                    <img src="../../../images/coins.svg" className="icon" alt=""/>
                    <span>סיכום הפקדה חודשי</span>
                </div>
                <div>
                    <img src="../../../images/money-13.svg" className="icon" alt=""/>
                    <span>סכום הלוואה לילד</span>
                </div>
                <div>
                    <img src="../../../images/cheque.svg" className="icon" alt=""/>
                    <span>סכום החזר חודשי</span>
                </div>
            </div>
            {programChildren.map( child => (
                <RowTable modeMore={modeMore} child={child} key={child.childId}/>
            ))}
            {newChild &&
                <NewChildRow close={setNewChild}/>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        children: state.post.children,
        programChildren: state.post.methods.regular,
        programsData: state.settings.dataSettings.programs.regular,
    };
}

export default connect(mapStateToProps)(TableRegular);
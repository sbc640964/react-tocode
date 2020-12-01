import React from 'react';
import _ from 'lodash';

import Range from "./range";
import {connect} from "react-redux";
import {currencyFormat, getResultFromAmount} from "../../../api-help";
import {updateChildToMethod} from "../../../redux/actions";

function Sidebar(props){

    const {children, childrenData, programsData, formSettings, dispatch} = props;

    let childrenFullData = [];

    childrenData.map( child => {
        if(child.disable) return;
        childrenFullData.push(getChildData(child));
    });

    function getChildData(child){
        let childDataKey = children.findIndex(v => v.id == child.childId);
        let childDataObject = getResultFromAmount(child.amount, children[childDataKey].age, children[childDataKey].marriageAge, programsData);
        return {
            ...children[childDataKey],
            ...childDataObject,
            childKey: childDataKey,
        }
    }

    function changeAllAmount(value){
        childrenFullData.map(child =>{
            dispatch(updateChildToMethod(false, child.id, value));
        });
    }

    function changeDeposit(value){

    }

    return(
        <div className="sidebar">
            <div className="rows-sum-program">
                <div className="row-sum-program d-flex">
                    <span className="title-sum w-45">הפקדה חודשית</span>
                    <span className="sum font-weight-bold">{currencyFormat(_.sumBy(childrenFullData, 'monthlyDeposit'))}</span>
                </div>
                <div className="row-sum-program d-flex">
                    <span className="title-sum w-45">סך הכל הפקדה</span>
                    <span className="sum font-weight-bold">{currencyFormat(_.sumBy(childrenFullData, 'depositAmount'))}</span>
                </div>
                <div className="row-sum-program d-flex">
                    <span className="title-sum w-45">מספר ילדים</span>
                    <span className="font-weight-bold">{childrenFullData.length}
                        {childrenFullData.length != children.length &&
                            ` מתוך ${children.length}`
                        }
                    </span>
                </div>
                <div className="row-sum-program d-flex">
                    <span className="title-sum w-45">סך הכל הלוואות</span>
                    <span className="sum font-weight-bold">{currencyFormat(_.sumBy(childrenFullData, 'amount'))}</span>
                </div>
                <div className="row-sum-program d-flex">
                    <span className="title-sum w-45">החזר הפקדה</span>
                    <span className="sum font-weight-bold">{currencyFormat(_.sumBy(childrenFullData, 'depositAmount')/2)}</span>
                </div>
            </div>
            {Object.keys(_.groupBy(childrenFullData, 'amount')).length == 1 &&
                <div className="ranges">
                    <Range min={formSettings.amountField.min} max={formSettings.amountField.max} value={Number(Object.keys(_.groupBy(childrenFullData, 'amount'))[0])} step={1} _onChange={changeAllAmount} label="גובה הלוואה לכל ילד"/>
                </div>
            }
            <div className="ranges">
                <Range min={formSettings.amountMonthlyField.min} max={formSettings.amountMonthlyField.max} value={Number(_.sumBy(childrenFullData, 'monthlyDeposit'))} step={1} _onChange={changeDeposit} showNumberInput={false} label="סך הפקדה חודשי"/>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        children: state.post.children,
        childrenData: state.post.methods[state.settings.currentScreen],
        formSettings: state.settings.dataSettings.formSettings,
        programsData: state.settings.dataSettings.programs[state.settings.currentScreen],
    };
}

export default connect(mapStateToProps)(Sidebar);
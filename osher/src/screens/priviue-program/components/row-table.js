import React, {useState} from 'react';
import NewChildRow from "./new-row-child";
import {currencyFormat, getResultFromAmount} from "../../../api-help";
import {connect} from "react-redux";
import DeleteReact from "./deleteChild";
import {setDisableField} from "../../../redux/actions";

function TableRow(props){
    const {modeMore, child, children, programsData, dispatch} = props;
    const [editMode, setEditMode] = useState(false);

    function handleClickChangeMode(){
        setEditMode(v => !v);
    }
    function getChildData(){
        let childDataKey = children.findIndex(v => v.id == child.childId);
        let childDataObject = getResultFromAmount(child.amount, children[childDataKey].age, children[childDataKey].marriageAge, programsData);
        return {
            ...children[childDataKey],
            ...childDataObject,
            childKey: childDataKey,
        }
    }

    const childData = getChildData();


    function removeDisableStatus() {
        dispatch(setDisableField(child.childId, false));
    }

    // console.log(childData);
    return(
        <>
            {editMode ?
                <NewChildRow child={childData} close={handleClickChangeMode}/> :
                <div className={child.disable ? 'row-table disable' : 'row-table'}>
                    <div className="general-info-table d-flex">
                        <div>{childData.name}</div>
                        <div>{childData.yearsOfWaiting}</div>
                        <div> <span className="sum"> {currencyFormat(child.disable ? 0 : childData.monthlyDeposit)}</span></div>
                        <div> <span className="sum"> {currencyFormat(child.disable ? 0 : childData.amount)}</span></div>
                        <div> <span className="sum"> {currencyFormat(child.disable ? 0 : childData.monthlyRepayment)}</span></div>
                        <div className="actions" style={{width: '25px'}}>
                            { child.disable ?
                                <a onClick={removeDisableStatus}><img src="../../../../images/restore.svg" width="24px"/> </a> :
                                <a onClick={handleClickChangeMode}><img src="../../../../images/edit-circle.svg" width="24px"/> </a>
                            }
                            <DeleteReact isDisable={child.disable} child={childData}/>
                        </div>
                    </div>
                    {modeMore && !child.disable &&
                    <div className="d-flex w-100 row-table-mor-info">
                        <div>
                            <span className="title-sum font-weight-bold">מספר חודשי הפקדה:</span>
                            <span >{childData.depositMonths}</span>
                        </div>
                        <div>
                            <span className="title-sum font-weight-bold">מספר חודשי החזר:</span>
                            <span >{childData.repaymentMonths}</span>
                        </div>
                        <div>
                            <span className="title-sum font-weight-bold">סה"כ הפקדה:</span>
                            <span className="sum">{currencyFormat(childData.depositAmount)}</span>
                        </div>
                        <div>
                            <span className="title-sum font-weight-bold">סה"כ החזר:</span>
                            <span className="sum">{currencyFormat(childData.amount)}</span>
                        </div>
                    </div>
                    }
                </div>
            }
        </>
    )
}


function mapStateToProps(state) {
    return {
        children: state.post.children,
        programsData: state.settings.dataSettings.programs.regular,
    };
}

export default connect(mapStateToProps)(TableRow);
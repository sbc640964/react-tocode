import React from 'react';

export default function InnerProgram(props){

    const {innerProgram, amount, functions, method, dataKeyProgram, dataKeyInnerProgram, countInnerPrograms} = props;

    function getDepositMonthly(){
        if(innerProgram.depositMonths && innerProgram.depositAmount){
            return innerProgram.depositAmount / innerProgram.depositMonths;
        }else{
            return 'הזן חודשי הפקדה וסכום הפקדה';
        }
    }

    function getRepaymentMonthly(){
        if(innerProgram.repaymentMonths){
            return amount / innerProgram.repaymentMonths;
        }else{
            return 'הזן כמות חודשי החזרה'
        }
    }

    function getDoublingRatio(){
        if(innerProgram.depositAmount){
            return amount / innerProgram.depositAmount;
        }else{
            return 'הזן סכום הפקדה כולל'
        }
    }

    function handleChange(e){
        functions.setLocalProgramInner(method, dataKeyProgram, dataKeyInnerProgram, e.target.name, e.target.value)
    }

    function tabClickLast(e){
        if(e.key != 'Tab' || dataKeyInnerProgram != countInnerPrograms - 1) return;
        functions.addInnerProgram(method, dataKeyProgram);
    }

    return(
        <div className="program-inner">
            <div className="inputs-group">
                <div className="form-field-group d-flex flex-warp">
                    <label>
                        שנות המתנה
                        <input type="number" name="yearsOfWaiting"  value={innerProgram.yearsOfWaiting || ''} onChange={handleChange}/>
                    </label>
                    <label>
                        חודשי הפקדה
                        <input type="number" name="depositMonths" value={innerProgram.depositMonths || ''} onChange={handleChange}/>
                    </label>
                    <label>
                        סכום הפקדה כולל
                        <input type="number" name="depositAmount" value={innerProgram.depositAmount || ''} onChange={handleChange}/>
                    </label>
                    <label>
                        חודשי החזר (לילד)
                        <input type="number" name="repaymentMonths" value={innerProgram.repaymentMonths || ''} onChange={handleChange}/>
                    </label>
                    <label>
                        אחוזי מענק (מההפקדה)
                        <input type="number" name="grantPercentages" onKeyDown={tabClickLast} value={innerProgram.grantPercentages || ''} onChange={handleChange}/>
                    </label>
                </div>
            </div>
            <div className="calculate">
                <div>
                    <span>סכום הפקדה חודשי</span>
                    <span className="sum calc-item">{getDepositMonthly()}</span>
                </div>
                <div>
                    <span>סכום החזר חודשי</span>
                    <span className="sum calc-item">{getRepaymentMonthly()}</span>
                </div>
                <div>
                    <span>יחס ההכפלה</span>
                    <span className="calc-item">{getDoublingRatio()}</span>
                </div>
            </div>
        </div>
    )
}
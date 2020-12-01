import React, {useState} from 'react';
import {connect} from 'react-redux';
import {setChildField, updateChildToMethod} from "../../redux/actions";

import Actions from "./components/footer-form-actions";
import Errors from "./components/error-form-field";
import {getAmountFromMonthlyDeposit, validation} from "../../api-help";


function FormStep4(props){

    const {children, dispatch, next, prev, settingsForm:settings, dataPrograms, currentProgram} = props

    const [isMonthly, SetIsMonthly] = useState(false);
    const [amount, setAmount] = useState(null);
    const [errors, setErrors] = useState([]);


    function fieldsValidation(){
        return [
            !isMonthly ?
                `amount|required|min:${settings.amountField.min}:${settings.amountField.minMassage.before}:${settings.amountField.minMassage.after}|max:${settings.amountField.max}:${settings.amountField.maxMassage.before}:${settings.amountField.maxMassage.after}` :
                `amount|required|min:${settings.amountMonthlyField.min}:${settings.amountMonthlyField.minMassage.before}:${settings.amountMonthlyField.minMassage.after}|max:${settings.amountMonthlyField.max}:${settings.amountMonthlyField.maxMassage.before}:${settings.amountMonthlyField.maxMassage.after}`

        ]
    }

    function handleChangeMD(e){
        console.log(getAmountFromMonthlyDeposit(1500, children, dataPrograms));
    }
    function handleChangeAmount(e){
        setAmount(e.target.value);
        let value = e.target.value;

        if(isMonthly){
            value = getAmountFromMonthlyDeposit(value, children, dataPrograms[currentProgram]);
        }

        children.map((child) => {
            dispatch(updateChildToMethod('regular' ,child.id, value));
        });
        
    }

    return(
        <div className="step step-content step-content-1">
            <div className="subject-form-step">
                <p>ניתן לכתוב כאן משפט הוראה כמו יש להזין את הפרטים הבאים:</p>
            </div>
            <div className="form-field-group form-radio-block">
                <label className="radio-label">
                    <input type="radio" name="id_type" value="child" checked={!isMonthly} onChange={() => SetIsMonthly(v => !v)}/>
                    סכום הלוואה לכל ילד
                </label>
                <label className="radio-label">
                    <input type="radio" name="id_type" value="month" checked={isMonthly} onChange={() => SetIsMonthly(v => !v)}/>
                    סכום הפקדה חודשית לכל המשפחה
                </label>
            </div>
            <div className="form-field-groups">
                <div className="form-field-group">
                    <input type="number"
                           style={{margin: "0px"}} className="w-100"
                           min={isMonthly ? 250 : 0}
                           max={isMonthly ? '' : 300000}
                           placeholder="הזן סכום"
                           onChange={handleChangeAmount}/>
                    { errors.amount &&
                        <Errors errors={errors.amount}/>
                    }
                </div>
            </div>
            <Actions {...props} next={next} prev={prev} validation={() => validation(fieldsValidation(), errors, setErrors, {amount: amount})}/>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        children: state.post.children,
        settingsForm: state.settings.dataSettings.formSettings,
        dataPrograms: state.settings.dataSettings.programs,
        currentProgram: state.settings.currentScreen,
    };
}
export default connect(mapStateToProps)(FormStep4);


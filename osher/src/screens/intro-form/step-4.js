import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {setChildField, updateChildToMethod} from "../../redux/actions";

import Actions from "./components/footer-form-actions";
import Errors from "./components/error-form-field";
import {getAmountFromMonthlyDeposit, getMinMaxToDepositMonthly, getResultFromAmount, validation} from "../../api-help";


function FormStep4(props){

    const {children, dispatch, next, prev, settingsForm:settings, dataPrograms, currentProgram, childrenProgram} = props

    const [isMonthly, SetIsMonthly] = useState(false);
    const [amount, setAmount] = useState('');
    const [depositMonthly, setDepositMonthly] = useState('');
    const [errors, setErrors] = useState([]);

    const minMax = isMonthly ?
        getMinMaxToDepositMonthly(settings.amountField.min, settings.amountField.max, children, dataPrograms.regular):
        {min: settings.amountField.min, max: settings.amountField.max} ;

    useEffect(()=> {
        validation(fieldsValidation(), errors, setErrors, {amount: isMonthly ? depositMonthly : amount});
    }, [amount, depositMonthly]);

    useEffect(() => {
        if(isMonthly) return setDepositMonthly(minMax.min);
        else setAmount(minMax.min);
    }, [isMonthly]);

    useEffect(() => {
        setAmount(minMax.min);
    }, []);

    function fieldsValidation(){
        return [
            !isMonthly ?
                `amount|required|min:${minMax.min}:${settings.amountField.minMassage.before}:${settings.amountField.minMassage.after}|max:${minMax.max}:${settings.amountField.maxMassage.before}:${settings.amountField.maxMassage.after}` :
                `amount|required|min:${minMax.min}:${settings.amountMonthlyField.minMassage.before}:${settings.amountMonthlyField.minMassage.after}|max:${minMax.max}:${settings.amountMonthlyField.maxMassage.before}:${settings.amountMonthlyField.maxMassage.after}`

        ]
    }

    function handleChangeAmount(e){

        let value = e.target.value;

        if(isMonthly){
            setDepositMonthly(value);
            value = getAmountFromMonthlyDeposit(value, children, dataPrograms[currentProgram]);
        }else{
            setAmount(value);
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
                           style={{margin: "0px"}}
                           className="w-100"
                           value={isMonthly ? depositMonthly : amount}
                           min={isMonthly ? 250 : 0}
                           max={isMonthly ? '' : 300000}
                           placeholder="הזן סכום"
                           onChange={handleChangeAmount}/>
                    { errors.amount &&
                        <Errors errors={errors.amount}/>
                    }
                </div>
            </div>
            <Actions {...props} next={next} prev={prev} validation={() => validation(fieldsValidation(), errors, setErrors, {amount: isMonthly ? depositMonthly : amount})}/>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        children: state.post.children,
        childrenProgram: state.post.methods.regular,
        settingsForm: state.settings.dataSettings.formSettings,
        dataPrograms: state.settings.dataSettings.programs,
        currentProgram: state.settings.currentScreen,
    };
}
export default connect(mapStateToProps)(FormStep4);


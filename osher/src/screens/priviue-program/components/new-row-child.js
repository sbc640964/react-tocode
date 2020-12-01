import React, {useState} from 'react';
import {connect} from "react-redux";
import Errors from "../../intro-form/components/error-form-field";
import {addChild, setChildField, updateChildToMethod} from "../../../redux/actions";
import {validation} from "../../../api-help";

function NewChildRow(props){

    const {ageOfChildrenStart, ageOfChildrenEnd, dispatch, child, close, settingsForm} = props;
    const [errors, setErrors] = useState([]);

    const [values, setValues] = useState({
        name: child ? child.name : '',
        age: child ? child.age : '',
        marriageAge: child ? child.marriageAge : '',
        amount: child ? child.amount : '',
    });


    function handleChange(e){
        values[e.target.name] = e.target.value;
        setValues({...values});
    }

    function cancelAddChild(){
        close(false);
    }

    function addOrUpdateChild(){

        const fieldValidate = [
            `amount|required|min:${settingsForm.amountField.min}:${settingsForm.amountField.minMassage.before}:${settingsForm.amountField.minMassage.after}|max:${settingsForm.amountField.max}:${settingsForm.amountField.maxMassage.before}:${settingsForm.amountField.maxMassage.after}`,
            'name|required',
            'age|required',
            'marriageAge|required',
        ];

        if(!validation(fieldValidate,errors,setErrors,values)) return;

        if(child){
            Object.keys(values).map(key => {
                if(key == 'amount') return;
                dispatch(setChildField(child.childKey, key, values[key]));
            });
            dispatch(updateChildToMethod(false, child.id, values.amount));
            close();
        }
        else{
            dispatch(addChild(values))
            close();
        }
    }

    return(
        <div className="row-table edit">
            <div className="general-info-table d-flex">
                <div className="w-100 d-block">
                    <div className="form-field-group row-form">
                        <label>
                            שם
                            <input type="text" className="w-100" name="name" value={values.name} onChange={handleChange}/>
                            <Errors errors={errors.name}/>
                        </label>
                        <label style={{width: '200px'}}>
                            <span>גיל</span>
                            <select className="w-100" value={values.age} onChange={handleChange} name="age">
                                <option value='' disabled={true}>בחר...</option>
                                {ageOfChildrenStart.map((age, i) => (
                                    <option value={age} key={i}>{age}</option>
                                ))}
                            </select>
                            <Errors errors={errors.age}/>
                        </label>
                        <label style={{width: '200px'}}>
                            <span>גיל חתונה משוער</span>
                            <select className="w-100" value={values.marriageAge} onChange={handleChange} name="marriageAge">
                                <option value='' disabled={true}>בחר...</option>
                                {ageOfChildrenEnd.map((age, i) => (
                                    <option value={age} key={i}>{age}</option>
                                ))}
                            </select>
                            <Errors errors={errors.marriageAge}/>
                        </label>
                        <label>
                            סכום הלוואה
                            <input type="number" className="w-100" value={values.amount} name="amount" onChange={handleChange}/>
                            <Errors errors={errors.amount}/>
                        </label>
                        <div className="actions">
                            <a onClick={addOrUpdateChild}><img src="../../../../images/check.svg" width="24px"/> </a>
                            <a onClick={cancelAddChild}><img src="../../../../images/close-cancel.svg" width="24px"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        children: state.post.children,
        ageOfChildrenStart: state.settings.dataSettings.ageOfChildrenStart,
        ageOfChildrenEnd: state.settings.dataSettings.ageOfChildrenEnd,
        settingsForm: state.settings.dataSettings.formSettings,
    };
}

export default connect(mapStateToProps)(NewChildRow);
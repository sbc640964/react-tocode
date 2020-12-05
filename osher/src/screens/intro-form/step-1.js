import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { setUserField } from '../../redux/actions';
import {validation} from "../../api-help";

import Actions from "./components/footer-form-actions";
import Errors from "./components/error-form-field";

function mapStateToProps(state) {
    return {
        account: state.account.userData,
    };
}

export default connect(mapStateToProps)(function FormStep1(props){

    const {account, dispatch} = props;
    const [errors, setErrors] = useState([]);

    const fieldsValidationOnRegularId = [
        'fullName|required',
        'email|email',
        'idNumber|required'
    ];

    const fieldsValidationOnPassport = [
        ...fieldsValidationOnRegularId,
        'idState|required',
        'idExp|required'
    ];

    function handleChange(e){
        let value = e.target.value
        if(e.target.name == "agreement"){
            value = e.target.value === 'true' ? true : false;
        }
        dispatch(setUserField(e.target.name, value ? value : e.target.value));
    }

    useEffect(()=> {
        if(!Array.isArray(errors)){
            validation(account.typeId == 'passport'? fieldsValidationOnPassport : fieldsValidationOnRegularId,
                errors,
                setErrors,
                account)
        }
    }, [account]);

    return(
        <>
        <div className="step step-content step-content-1">
            <div className="subject-form-step">
                <p>ניתן לכתוב כאן משפט הוראה כמו יש להזין את הפרטים הבאים:</p>
            </div>
            <div className="form-field-group">
                <label>
                    שם מלא
                    <input type="text"
                            className="w-100"
                            name="fullName" value={account.fullName || ''}
                            onChange={handleChange}/>
                    <Errors errors={errors.fullName}/>
                </label>
            </div>
            <div className="form-field-group">
                <label>
                    דוא"ל
                    <input type="email"
                            className="w-100"
                            name="email" value={account.email || ''}
                            onChange={handleChange}/>
                    <Errors errors={errors.email}/>
                </label>
            </div>
            <div className="form-field-group form-radio-block">
                <label className="radio-label font-weight-normal">
                    <input type="checkbox" name="agreement" value={account.agreement || ''} onChange={handleChange}/>
                    אני מאשר קבלת אישור רישום במיל
                </label>
            </div>
            <div className="form-field-group form-radio-block">
                <label className="radio-label">
                    <input type="radio"
                           name="typeId"
                           value="regularId"
                           checked={account.typeId == 'regularId' || account.typeId == undefined}
                           onChange={handleChange}
                    />
                    ת.ז.
                </label>
                <label className="radio-label">
                    <input type="radio"
                           name="typeId"
                           value="passport"
                           checked={account.typeId == 'passport'}
                           onChange={handleChange}
                    />
                    דרכון
                </label>
            </div>
            <div className="form-field-groups">
                <div className="form-field-group">
                    <input type="text"
                           style={{margin: "0px 0px 8px"}}
                           className="w-100"
                           placeholder={(account.typeId == 'regularId' || account.typeId == undefined) ? "מס' תעודת זהות" : "מס' דרכון"}
                           name="idNumber"
                           value={account.idNumber || ''}
                           onChange={handleChange}
                    />
                    <Errors errors={errors.idNumber}/>
                </div>
                { account.typeId == 'passport' &&
                    <div className="form-field-group row-form">
                        <label className="w-45">
                            מדינה
                            <input type="text"
                                   className="w-100"
                                   name="idState"
                                   value={account.idState || ''}
                                   onChange={handleChange}
                            />
                            <Errors errors={errors.idState}/>
                        </label>
                        <label className="w-45">
                            תוקף
                            <input type="text"
                                   className="w-100"
                                   name="idExp"
                                   value={account.idExp || ''}
                                   onChange={handleChange}
                            />
                            <Errors errors={errors.idExp}/>
                        </label>
                    </div>
                }

            </div>
        </div>
        <Actions
            {...props}
            validation={() => validation(account.typeId == 'passport'? fieldsValidationOnPassport : fieldsValidationOnRegularId,
                errors,
                setErrors,
                account)}
        />
        </>
    )
});
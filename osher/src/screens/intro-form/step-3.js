import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Actions from "./components/footer-form-actions";
import {setChildField, setUserField, addEmptyChild, removeChild} from "../../redux/actions";
import {validation} from "../../api-help";
import Errors from "./components/error-form-field";



function FormStep3(props){

    const {children, dispatch, ageOfChildrenEnd, ageOfChildrenStart} = props;
    const [errors, setErrors] = useState({});

    function handleClickAddChild(){
        dispatch(addEmptyChild());
    }

    function validation(){
        setErrors({});
        let validate = true;

        children.map((child) => {
            if(!child.name || !child.age || !child.marriageAge){
                errors[child.id] = 'חלק מהשדות לא מולאו!';
                validate = false;
            }
        });
        setErrors({...errors});
        return validate;
    }

    return(
        <>
            <div className="step step-content step-content-3">
                <div className="subject-form-step">
                    <p>ניתן לכתוב כאן משפט הוראה כמו יש להזין את הפרטים הבאים:</p>
                </div>
                { children.map((child, index) => (
                    <GroupInputs key={index}
                                 data-key={index}
                                 dispatch={dispatch}
                                 child={child}
                                 ageOfChildrenEnd={ageOfChildrenEnd}
                                 ageOfChildrenStart={ageOfChildrenStart}
                                 count={children.length}
                                 error={errors[child.id] ? errors[child.id] : false}
                    />
                ))
                }
                <div className="text-left row">
                    <span className="font-weight-bold btn-text" style={{paddingLeft: 0}} onClick={handleClickAddChild}>+ הוסף ילד</span>
                </div>
            </div>
            <Actions {...props} validation={() => validation()}/>
        </>

    )
}


function GroupInputs(props){

    const {child, dispatch, 'data-key' : key, ageOfChildrenStart, ageOfChildrenEnd, count, error} = props;
    const show = key ? 'd-none' : '';

    function handleChangeUpdateChildField(e){
        dispatch(setChildField(key, e.target.name, e.target.value));
    }
    function handleChangeRemoveChild(){
        dispatch(removeChild(child.id));
    }

    function getIsFull(){
        return child.name && child.age && child.marriageAge;
    }

    return(
        <div className="form-field-group row-form">
            <label className="w-45" style={{width: '205px'}}>
                <span className={show}>שם הילד</span>
                <input type="text" className="w-100" value={child.name || ''} name="name" onChange={handleChangeUpdateChildField}/>
                { !getIsFull() &&
                    <Errors errors={error}/>
                }
            </label>
            <label style={{width: '75px'}}>
                <span className={show}>גיל</span>
                <select className="w-100" onChange={handleChangeUpdateChildField} name="age" value={child.age || ''}>
                    <option value='' disabled={true}>בחר...</option>
                    {ageOfChildrenStart.map((age, i) => (
                        <option value={age} key={i}>{age}</option>
                    ))}
                </select>
            </label>
            <label style={{width: '190px'}}>
                <span className={show}>גיל חתונה משוער</span>
                <select className="w-100" onChange={handleChangeUpdateChildField} name="marriageAge" value={child.marriageAge || ''}>
                    <option value='' disabled={true}>בחר...</option>
                    {ageOfChildrenEnd.map((age, i) => (
                        <option value={age} key={i}>{age}</option>
                    ))}
                </select>
            </label>
            {count > 1 &&
                <span onClick={handleChangeRemoveChild} className="close">&#10006;</span>
            }
        </div>
    )
}


function mapStateToProps(state) {
    return {
        children: state.post.children,
        ageOfChildrenStart: state.settings.dataSettings.ageOfChildrenStart,
        ageOfChildrenEnd: state.settings.dataSettings.ageOfChildrenEnd,
    };
}

export default connect(mapStateToProps)(FormStep3);
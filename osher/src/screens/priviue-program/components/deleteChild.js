import React from 'react';
import {removeChild, setDisableField} from "../../../redux/actions";
import { useDispatch } from "react-redux";

function DeleteReact(props){

    const {isDisable, child} = props;

    const dispatch = useDispatch();

    function disableChildFromProgram() {
        if(isDisable) return;
        dispatch(setDisableField(child.id, true));
    }

    function deleteChild(){
        if(!isDisable) return;
        dispatch(removeChild(child.id))
    }

    return(
        <a onClick={disableChildFromProgram} onDoubleClick={deleteChild}><img src="../../../../images/close-cancel.svg" width="24px"/>
            <span className="tooltip">
                {!isDisable ?
                    'השבת בתוכנית זו או מחק את הילד מכל התוכניות' :
                    'לחץ לחיצה כפולה ע"מ למחוק את הילד מכל התוכניות'
                }
            </span>
        </a>

    )

}


export default DeleteReact;
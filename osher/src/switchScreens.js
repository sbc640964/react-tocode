import React from 'react';
import {connect} from "react-redux";

import WrapsForm from "./screens/intro-form/warp";
import FormStep1 from "./screens/intro-form/step-1";
import FormStep2 from "./screens/intro-form/step-2";
import FormStep3 from "./screens/intro-form/step-3";
import FormStep4 from "./screens/intro-form/step-4";
import RegularProgram from "./screens/priviue-program/regular-program";

function SwitchScreens(props){

    const {account} = props;

    return(
        <>
        {account.userData.completedForm
            ? <RegularProgram/>
            : <WrapsForm>
                 <FormStep1/>
                 <FormStep3/>
                 <FormStep4/>
              </WrapsForm>
        }
        </>
    )
}

function mapStateToProps(state) {
    return {
        account: state.account,
    };
}
export default connect(mapStateToProps)(SwitchScreens);
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {completedForm} from "../../redux/actions";

function WrapsForm(props){

    const {account, dispatch} = props;

    const [currentStep, setCurrentStep] = useState(0);
    const children = React.Children.toArray(props.children);
    const stepsCount = React.Children.count(props.children);
    const widthCircles = stepsCount * 29;

    const next = ()=>{
        console.log(currentStep)
        if(currentStep == stepsCount - 1){
            return dispatch(completedForm());
        }
        setCurrentStep(v => v+1);
    }

    const prev = ()=>{
        setCurrentStep(v => v-1);
    }

    const widthSpaceStyle = (index, space = false) => {
        let style = {};

        if (!space && index > currentStep) return {};

        else if(!space){
            style.background = '#D39D37';
        }
        else{
            style.width = 'calc((100% - ' + widthCircles.toString() + 'px) / ' + (stepsCount -1).toString() + ')';
            if(index + 1 <= currentStep){
                style.background = '#D39D37';
            }
        }
        return style;
    }

    return(
        <div className="container-form">
            <div className="heading heading-form">
                <h1>כניסה לאיזור האישי</h1>
            </div>
            <div className="steps step-form">
                {Array(stepsCount).fill(null).map((item, index) =>
                    <React.Fragment key={index}>
                        <span className="step-number" style={widthSpaceStyle(index)}>{index + 1}</span>
                        {index + 1 != stepsCount &&
                            <span className="step-space" style={widthSpaceStyle(index, true)}></span>
                        }
                    </React.Fragment>
                )}
            </div>
            <form action="">
                <div className="step-content">
                    {React.cloneElement(children[currentStep], {next,prev,currentStep})}
                </div>
            </form>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        account: state.account,
    };
}
export default connect(mapStateToProps)(WrapsForm);
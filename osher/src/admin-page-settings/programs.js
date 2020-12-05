import React from 'react';
import InnerProgram from "./innerPrograms";

export default function Program(props){

    const {program, method, dataKeyProgram, functions} = props;

    function changeField(e){
        functions.setLocalProgram(method, dataKeyProgram, e.target.name, e.target.value);
    }

    return(
        <div className="programs-in-amounts">
            <div className="input-group">
                <label>
                    סכום ההלוואה המינימלי
                    <input type="number" name="amount" value={program.amount || ''} onChange={changeField}/>
                </label>
            </div>
            <h3>טווחים</h3>
            <div className="inner-programs">
                {program.innerPrograms.length &&
                    program.innerPrograms.map((p, i) => (
                        <InnerProgram key={i}
                                      method={method}
                                      dataKeyProgram={dataKeyProgram}
                                      dataKeyInnerProgram={i}
                                      innerProgram={p}
                                      functions={functions}
                                      countInnerPrograms={program.innerPrograms.length}
                                      amount={program.amount}/>
                    ))
                }
                <div className="text-left pt-3">
                    <a className="btn-sbc btn btn-light-blue text-center" onClick={() => functions.addInnerProgram(method, dataKeyProgram)}>הוסף טווח חדש</a>
                </div>
            </div>
        </div>
    )
}
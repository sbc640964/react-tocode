import React, {useState} from 'react';
import Errors from "../screens/intro-form/components/error-form-field";
import Program from "./programs";

export default function SettingsPage(props){

    const {data, functions} = props;
    const [tab, setTab] = useState(0)

    function styleActive(n){
        if(tab == n){
            return {
                color: '#D39D37',
                borderBottom: '2px solid #D39D37',
                borderRadius: 0,
            }
        }
    }
    return(
        <div className="container-programs sbc-settings-page">
            <div className="tabs">
                <a className="btn btn-sbc" style={styleActive(0)} onClick={() => setTab(0)}>הגדרות כלליות</a>
                <a className="btn btn-sbc" style={styleActive(1)} onClick={() => setTab(1)}>תוכניות רגילות</a>
                <a className="btn btn-sbc" style={styleActive(2)} onClick={() => setTab(2)}>תוכניות משפחתיות</a>
                <span className="text-left flex-grow-1">
                    <a className="btn-sbc btn btn-blue text-center" onClick={() => functions.save()}>שמור שינויים</a>
                </span>
            </div>
            {tab == 1 &&
                <div className="basic-programs">
                    <h2>תוכניות רגילות</h2>
                    <div className="programs-amounts">
                        {data.programs.regular.map((p, i) => (
                            <Program functions={functions} key={i} method='regular' dataKeyProgram={i} program={p}/>
                        ))}
                    </div>
                    <div className="text-left pt-3 btns-row-left">
                        <a className="btn-sbc btn btn-gold text-center" onClick={() => functions.addProgram('regular')}>הוסף מסלול חדש</a>
                    </div>
                </div>
            }
            {tab == 2 &&
                <div className="basic-programs">
                    <h2>תוכניות משפחתי</h2>
                    <div className="programs-amounts">
                        {data.programs.family.map((p, i) => (
                            <Program functions={functions} key={i} method='family' dataKeyProgram={i} program={p}/>
                        ))}
                    </div>
                    <div className="text-left pt-3 btns-row-left">
                        <a className="btn-sbc btn btn-gold text-center" onClick={() => functions.addProgram('regular')}>הוסף מסלול חדש</a>
                    </div>
                </div>
            }

        </div>
    )
}
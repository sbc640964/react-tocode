import React, {useState} from 'react';
import {Provider} from "react-redux";

import store from "./redux/store";
import SwitchScreens from "./switchScreens";

export default function (){
    return(
        <Provider store={store}>
            <div className="container-sbc">
                <SwitchScreens/>
            </div>
        </Provider>
    )
}


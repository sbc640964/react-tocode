import React, {useState} from 'react';
import {Provider} from "react-redux";

// import store from "./redux/store";
// import SwitchScreens from "./switchScreens";
//
// export default function (){
//     return(
//         <div className="warp-sbc">
//             <Provider store={store}>
//                 <div className="container-sbc">
//                     <SwitchScreens/>
//                 </div>
//             </Provider>
//         </div>
//     )
// }


import AdminPage from "./admin-page-settings/AdminPage";
import store from "./admin-page-settings/redux/store";

export default function (){
    return(
        <div className="warp-sbc">
            <Provider store={store}>
               <AdminPage/>
            </Provider>
        </div>
    )
}


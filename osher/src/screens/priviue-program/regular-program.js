import React, {useState} from 'react';

import Sidebar from "./components/sidebar";
import HeaderActionsTable from "./components/header-action-table";
import TableRegular from "./components/table";
import FooterActionsTable from "./components/footer-action-table";


export default function RegularProgram(props){

    const [modeMore, setModeMore] = useState(false);
    const [newChild, setNewChild] = useState(false);

    return(
        <div className="preview-program">
            <div className="header-preview-program">
                <h2 className="heading heading-program">מבט כללי</h2>
            </div>
            <div className="content-program d-flex">
                <Sidebar/>
                <div className="table-program">
                    <HeaderActionsTable setModeMore={setModeMore} modeMore={modeMore}/>
                    <TableRegular modeMore={modeMore} newChild={newChild} setNewChild={setNewChild}/>
                    <FooterActionsTable setNewChild={setNewChild}/>
                </div>
            </div>
        </div>
    );
}
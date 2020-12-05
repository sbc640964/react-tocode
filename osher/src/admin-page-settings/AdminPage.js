import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import useSWR  from "swr/esm/use-swr";
import $ from 'jquery';
import _ from 'lodash';


import Loader from "./Loader";
import SettingsPage from "./SettingsPage";

function AdminPage(props){


    const {state, dispatch} = props;
    const fetcherGet = (...args) =>$.get(...args).then(res => res);
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const fetcherPost = (...args) =>$.post(...args).then(res => res);
    const {data:d, mutate} = useSWR('http://localhost:80/wp/wp-admin/admin-ajax.php?action=ob_admin_ajax', fetcher);

    const emptyData = {
        programs:{
            regular:[
                {
                    amount: '',
                    innerPrograms:[
                        {}
                    ]
                }
            ],
            family:[
                {
                    amount: '',
                    innerPrograms:[
                        {}
                    ]
                }
            ],
        }
    }

    const [dataLocal, setDataLocal] = useState(emptyData);

    useEffect(() => {
        if(!d || !d.data) return;
        let h = _.merge([emptyData], [d.data])[0];
        setDataLocal(h);
    }, [d]);


    function save(){
        return $.post('http://localhost:80/wp/wp-admin/admin-ajax.php?action=ob_admin_ajax', {data: dataLocal});
    }

    const functions = {

        setLocalProgram: function (method, index, field, value) {
            dataLocal.programs[method][index][field] = value;
            this.e();
        },
        setLocalProgramInner: function (method, index, indexInner, field, value){
            dataLocal.programs[method][index].innerPrograms[indexInner][field] = value;
            this.e();
        },
        removeProgram: function (method, index) {
            dataLocal.programs[method] = dataLocal[method].filter((v, i) => i != index);
            this.e();
        },
        removeInnerProgram: function (method, index, indexInner){
            dataLocal.programs[method][index].innerPrograms = dataLocal[method][index].innerPrograms.filter((v, i) => i != indexInner);
            this.e();
        },
        addProgram: function (method) {
            dataLocal.programs[method].push({...emptyData.programs.regular[0]});
            this.e();
        },
        addInnerProgram: function (method, index){
            dataLocal.programs[method][index].innerPrograms.push({});
            this.e();
        },
        e: () => {
            setDataLocal(_.cloneDeep(dataLocal));
            console.log(dataLocal)
        },
        save: async function(){
            await mutate(save);
        }
    }
    return(
        <>
        {d ? <SettingsPage functions={functions} data={dataLocal}/> : <Loader/>}
            {/*<SettingsPage functions={functions} data={dataLocal}/>*/}
        </>
    )

}

function map(state){
    return {state: state};
}

export default connect(map)(AdminPage);
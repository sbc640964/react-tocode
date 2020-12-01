import {createStore, applyMiddleware} from "redux";

import reducer from "./reducers";
import {action} from "mobx";
import {addEmptyChild} from "./actions";

const addChildInTable =  store => next => action => {

    if(action.type == 'ADD_CHILD'){
        store.dispatch(addEmptyChild());
    }
    return next(action);
}

const store = createStore(reducer, applyMiddleware(addChildInTable));

window.store = store;
export default store;
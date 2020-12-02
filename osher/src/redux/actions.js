
export function setUserField(field, newValue){
    return {type: 'SET_ACCOUNT_FIELD', payload: {field: field, newValue: newValue}}
}

export function setChildField(childId, field, newValue){
    return {type: 'UPDATE_CHILD', payload: {childId:childId ,field: field, newValue: newValue}}
}

export function addEmptyChild(){
    return {type: 'ADD_EMPTY_CHILD', payload: {}}
}

export function removeChild(id){
    return {type: 'REMOVE_CHILD', payload: {id: id}}
}

export function updateChildToMethod(method, childId, amount){
    return {type: 'UPDATE_CHILD_TO_METHODE', payload: {method: method, childId: childId, amount: amount}}
}

export function completedForm(){
    return {type: 'SET_COMPLETED_INTRO_FORM'}
}

export function addChild(values){
    return {type: 'ADD_CHILD', payload: values}
}

export function setDisableField(id, newStatus, method = false){
    return {type: 'SET_DISABLE_CHILD', payload: {id: id, newStatus:newStatus, method:method}}
}

export function reset(){
    return{type:'RESET'}
}

export function saveBalanceItem(){
    return{type: 'SAVE_BALANCE_ITEM'}
}
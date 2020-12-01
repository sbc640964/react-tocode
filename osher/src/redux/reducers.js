import { createStore } from "redux";
import produce from "immer";
import _ from 'lodash';

const initialState = {
    account: {
        isLogin: false,
        isService: false,
        userData: {
            agreement: true,
            completedForm: false,
        },
    },
    post: {
        children: [
            {id: 0, name:'חני', age: '4', marriageAge: '20'},
            {id: 1, name:'אליעזר שמחה', age: '16', marriageAge: '20'},
            {id: 2, name:'מושי', age: '12', marriageAge: '19'},
        ],
        methods: {
            regular: [
                {childId: 0, amount: 120000},
                {childId: 1, amount: 120000},
                {childId: 2, amount: 300000},
            ],
            family:[],
        },
    },
    copyPostReVersion: false,
    settings: {
        currentScreen: 'regular',
        emptyChild: {name:'', age: '', marriageAge: ''},
        dataSettings: {
            ageOfChildrenStart: [6,7,8,9,10,11,12,13,14],
            ageOfChildrenEnd: [18,19,20,21,22,23,24],
            formSettings: {
                amountField: {
                    min: 36000,
                    max: 300000,
                    minMassage: {
                        before: 'סכום הלוואה מינימלי',
                        after: 'ש"ח'
                    },
                    maxMassage: {
                        before: 'מוגבל עד',
                        after: 'ש"ח הלוואה לילד'
                    },
                },
                amountMonthlyField: {
                    min: 250,
                    max: 10000,
                    minMassage: {
                        before: 'סכום מינימלי',
                        after: 'ש"ח'
                    },
                    maxMassage: {
                        before: 'מוגבל עד',
                        after: 'ש"ח'
                    },
                }
            },
            programs:{
                regular :[
                    {
                        amount: 36000,
                        innerPrograms:[
                            {
                                yearsOfWaiting: 14,
                                monthsOfWaiting: 168,
                                depositAmount: 8960,
                                doublingRatio: 4.017857142857143,
                                depositMonths: 160,
                                monthlyRepayment: 145,
                                grantPercentages: 50,
                            },
                            {
                                yearsOfWaiting: 12,
                                monthsOfWaiting: 144,
                                depositAmount: 9520,
                                doublingRatio: 3.781512605042017,
                                depositMonths: 140,
                                monthlyRepayment: 131,
                                grantPercentages: 50,
                            },
                        ]
                    },
                    {
                        amount: 100000,
                        innerPrograms:[
                            {
                                yearsOfWaiting: 14,
                                monthsOfWaiting: 168,
                                depositAmount: 24000,
                                doublingRatio: 4.166666666666667,
                                depositMonths: 160,
                                monthlyRepayment: 147,
                                grantPercentages: 50,
                            },
                            {
                                yearsOfWaiting: 12,
                                monthsOfWaiting: 144,
                                depositAmount: 25200,
                                doublingRatio: 3.968253968253968,
                                depositMonths: 140,
                                monthlyRepayment: 133,
                                grantPercentages: 50,
                            },
                        ]
                    },
                    {
                        amount: 300000,
                        innerPrograms:[
                            {
                                yearsOfWaiting: 14,
                                monthsOfWaiting: 168,
                                depositAmount: 70400,
                                doublingRatio: 4.261363636363636,
                                depositMonths: 160,
                                monthlyRepayment: 152,
                                grantPercentages: 50,
                            },
                            {
                                yearsOfWaiting: 12,
                                monthsOfWaiting: 144,
                                depositAmount: 74200,
                                doublingRatio: 4.043126684636119,
                                depositMonths: 140,
                                monthlyRepayment: 136,
                                grantPercentages: 50,
                            },
                        ]
                    },

                ]
            }

        }
    }
}

export default produce((state, action) => {
    switch (action.type){
        case 'SET_ACCOUNT_FIELD':
            state.account.userData[action.payload.field] = action.payload.newValue;
            break;
        case 'ADD_EMPTY_CHILD' :
            state.post.children.push({id: state.post.children[state.post.children.length -1].id +1});
            break;
        case 'REMOVE_CHILD' :
            state.post.children = state.post.children.filter( i => i.id != action.payload.id);
            state.post.methods.regular = state.post.methods.regular.filter( i => i.childId != action.payload.id);
            state.post.methods.family = state.post.methods.family.filter( i => i.childId != action.payload.id);
            break;
        case 'UPDATE_CHILD' :
            state.post.children[action.payload.childId][action.payload.field] = action.payload.newValue;
            break;
        case 'SAVE_METHOD' :
            state.post.methods[action.payload.method] = action.payload.newValue;
            break;
        case 'SET_COMPLETED_INTRO_FORM' :
            state.account.userData.completedForm = true;
            break;
        case 'ADD_CHILD' :
            //have a add empty child before action - middleware addChildInTable
        {
            let method = state.settings.currentScreen;
            let key = state.post.children.length - 1;
            state.post.children[key].name = action.payload.name;
            state.post.children[key].age = action.payload.age;
            state.post.children[key].marriageAge = action.payload.marriageAge;
            state.post.methods[method].push({childId: state.post.children[key].id, amount: action.payload.amount});
        }
            break;
        case 'UPDATE_CHILD_TO_METHODE' :
            let method = action.payload.method ? action.payload.method : state.settings.currentScreen;
            let key;
            let is = state.post.methods[method].filter( (item, i) => {
                if(item.childId == action.payload.childId){
                    key = i;
                }
                return item.childId == action.payload.childId;
            });
            if(is.length){
                state.post.methods[method][key].amount = action.payload.amount;
            }else {
                state.post.methods[method].push({childId: action.payload.childId, amount: action.payload.amount});
            }
            break;
        case 'SET_DISABLE_CHILD' : {
            let key = state.post.methods[action.payload.method ? action.payload.method : state.settings.currentScreen].findIndex(v => v.childId == action.payload.id);
            state.post.methods[action.payload.method ? action.payload.method : state.settings.currentScreen][key].disable = action.payload.newStatus;
        }            break;
    }
}, initialState);


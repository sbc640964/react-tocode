import React from 'react';
import _ from 'lodash';

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export function validation(fields, errors, setErrors, state, textErrors = null) {

    const msgErrors = textErrors ? textErrors : errorsList();
    let validate = true;
    function errorsList(){
        return {
            requiredField: 'שדה זה נדרש',
            invalidEmail: 'כתובת האימייל אינה תקנית',
            minNumber: (num, beforeText, afterText) => {
                return(
                    (beforeText ? beforeText : 'שדה מוגבל למינימום:') +
                    ` ${num.toString()}` +
                    (afterText ? (' ' + afterText) : '')
                )
            },
            maxNumber: (num, beforeText, afterText) => {
                return(
                    (beforeText ? beforeText : 'שדה מוגבל למקסימום:') +
                    ` ${num.toString()}` +
                    (afterText ? (' ' + afterText) : '')
                )
            },

        }
    }

    function clearError(field) {
        errors[field] = [];
    }

    const validateFieldsFunction = {

        validateField_required: function (field) {
            if (!state[field]) {
                errors[field].push(msgErrors.requiredField);
                validate = false;
            }
        },
        validateField_email: function (field) {
            if (state[field] && !validateEmail(state[field])) {
                errors[field].push(msgErrors.invalidEmail);
                validate = false;
            }
        },
        validateField_min: function (field, fullValida) {
            let arr = fullValida.split(':');
            if ( state[field] &&  state[field] < Number(arr[1]) ){
                errors[field].push(msgErrors.minNumber(arr[1], arr[2] || false, arr[3] || false));
                validate = false;
            }
        },
        validateField_max: function (field, fullValida) {
            let arr = fullValida.split(':');
            if ( state[field] &&  state[field] > Number(arr[1]) ){
                errors[field].push(msgErrors.maxNumber(arr[1], arr[2] || false, arr[3] || false));
                validate = false;
            }
        },
    }
    function getValidate(fields) {
        fields.map((field) => {
            let arr = field.split('|');
            let name = arr.shift();
            clearError(name);
            arr.map(f => {
                let fa = f.split(':').shift();
                let functionName = 'validateField_' + fa;
                validateFieldsFunction[functionName](name, f);
            });
        });
        setErrors({...errors});
        return validate;
    }
    return getValidate(fields);
}

export function getAmountFromMonthlyDeposit(MonthlyDeposit, children, data, multi = true){


    if(!multi) children = [children];
    const groupByYears = _.groupBy(children, (i) => i.marriageAge - i.age);
    data = JSON.parse(JSON.stringify(_.sortBy(data, i => i.amount).reverse()));

    let _return = false;

    for(let a of data){

        if(_return) break;

        a.innerPrograms = _.sortBy(a.innerPrograms, i => i.yearsOfWaiting);

        for(let key in a.innerPrograms){
            let _amountMonthly = a.innerPrograms[key].depositAmount / a.innerPrograms[key].depositMonths;
            a.innerPrograms[key].points =  _amountMonthly / 10;
            a.innerPrograms[key]._amountMonthly = _amountMonthly;
        }

        let points = [];
        for(let key in groupByYears){
            let program = getNearestAmount(a.innerPrograms, Number(key), 'yearsOfWaiting');
            points.push({program: program, points: program.points * groupByYears[key].length, countChildren:groupByYears[key].length, children:groupByYears[key]});
        }

        let amountPerPoint = MonthlyDeposit / _.sumBy(points, 'points');
        for(let key in points){
            
            let totalPerChild =  (points[key].points / points[key].countChildren) * amountPerPoint;
           
            if( totalPerChild >= points[key].program._amountMonthly){
                _return = (totalPerChild * points[key].program.depositMonths) * points[key].program.doublingRatio;
                break;
            }
        }
    }
    return _return;
}

export function getResultFromAmount(amount, age, marriageAge, data){

    data = _.sortBy(data, i => i.amount);

    let program = getNearestAmount(data, amount, 'amount');

    const programAmount = program.amount;

    let innerProgram = _.sortBy(program.innerPrograms, i => i.yearsOfWaiting);

    program = getNearestAmount(innerProgram, marriageAge - age, 'yearsOfWaiting');

    let _return = {
        amount: Number(amount),
        programAmount: programAmount,
        yearsOfWaiting: program.yearsOfWaiting,
        monthsOfWaiting: program.monthsOfWaiting,
        depositMonths: program.depositMonths,
        repaymentMonths: program.monthlyRepayment,
        grantPercentages: program.grantPercentages,

    };

    //סכום ההפקדה הכללי
    //_return.depositAmount = Math.round(amount / program.doublingRatio);
    _return.depositAmount = amount / program.doublingRatio;

    //סכום הפקדה חודשי
    _return.monthlyDeposit = _return.depositAmount / program.depositMonths;

    ///חשב הפקדה לחודש אחרון
    _return.lastMonthDeposit = _return.monthlyDeposit;
    // if( _return.monthlyDeposit % 1 != 0 ){
    //     _return.monthlyDeposit = Math.ceil(_return.monthlyDeposit);
    //     _return.lastMonthDeposit = _return.depositAmount - (_return.monthlyDeposit * (program.depositMonths - 1) );
    // }

    //החזר חודשי
    _return.monthlyRepayment = amount / program.monthlyRepayment;

    //חשב החזר חודש אחרון
    _return.lastMonthRepayment = _return.monthlyDeposit;
    if( _return.monthlyRepayment % 1 != 0 ){
        _return.monthlyRepayment = Math.ceil(_return.monthlyRepayment);
        _return.lastMonthRepayment =  amount - (_return.monthlyRepayment * (program.monthlyRepayment - 1) );
    }

    return _return;

}

function getNearestAmount(sortedRegular, input, key) {
    //מחפש את אינדקס האיבר הראשון שגדול מהערך המבוקש
    let nextOfInput = sortedRegular.findIndex(x => x[key] > input);

    if(nextOfInput == -1) //אם הוא לא מצא - כולם קטנים,
        return sortedRegular[sortedRegular.length - 1];
    if(nextOfInput == 0)
        return sortedRegular[0];

    return sortedRegular[nextOfInput - 1];
}


export function currencyFormat(num) {
    if(Number.isInteger(num)){
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replace('.00', '')
}
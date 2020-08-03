import {decorate, observable} from "mobx";
import _ from 'lodash';

class FiltersProducts{

    constructor() {
        this.filters = {
            tags: [],
            categories: [],
            search: [],
        }
    }

    //value at object with id and name
    add(type, value){
        const index = this.getIndexByValue(type, value);
        if(index) return;
        this.filters[type].push(value);
    }

    remove(type, value){
        const index = this.getIndexByValue(type, value);
        if(!index) return;
        delete this.filters[type][index];
    }

    getCurrentFilters(){
        return this.filters;
    }

    //help function
    getIndexByValue(type, value){
        const index = _.findIndex(this[type], (o) => { return _.isMatch(o, value) });
        return index > -1 ? index : false;
    }

    prepareUrl(){
        return './jsons/products.json';
    }
}

decorate(FiltersProducts, {
    filters: observable,
});

export default new FiltersProducts();
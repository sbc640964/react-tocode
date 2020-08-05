import React, {useEffect, useState} from 'react';

import $ from 'jquery';

import SideBar from "./sidebar";
import styled from "styled-components";
import CurrentFilters from "./current-filters";
import Breadcrumbs from "./breadcrumbs";
import Products from "./products";
import FilterProducts from './classes/filters-products';
import useSWR, {mutate, SWRConfig} from "swr";

import {observer} from 'mobx-react'
import { autorun } from 'mobx'


export default observer(function ArchiveShop(props){

    const configFetcher = (...args) => fetch(...args).then(res => res.json());

    const filters = FilterProducts.filters;
    const [products, setProducts] = useState(null);
    const {data} = useSWR('src/jsons/products.json', configFetcher);

    useEffect(()=>{
        setProducts(data);
    },[data]);

    useEffect(function()  {

        const getProductByFilters = autorun(
            reaction => {
                mutate('src/jsons/products.json');
                JSON.stringify(filters);
            },
            {
                delay: 1000
            }
        );

        return function abort() {
            getProductByFilters();
        };

    }, []);

    return(
        <Container>
            {/*{JSON.stringify(filters)}*/}
            <Breadcrumbs/>
            <CurrentFilters/>
            {products &&
                <Products products={products.products}/>
            }
        </Container>
    )
});

const Container = styled.div`
  width: 77%;
  
  >div{
    margin-bottom: 12px;
  }
`;


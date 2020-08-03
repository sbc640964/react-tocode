import React, {useEffect} from 'react';

import SideBar from "./sidebar";
import styled from "styled-components";
import CurrentFilters from "./current-filters";
import Breadcrumbs from "./breadcrumbs";
import Products from "./products";
import FilterProducts from './classes/filters-products';

import {observer} from 'mobx-react'
import { autorun } from 'mobx'


export default observer(function ArchiveShop(props){
    const filters = FilterProducts.filters;

    React.useEffect(()=> autorun(() => {
        alert(123)
        console.log(filters)
    }),[]);

    return(
        <Container>
            {JSON.stringify(filters)}
            <Breadcrumbs/>
            <CurrentFilters/>
            <Products/>
        </Container>
    )
});

const Container = styled.div`
  width: 77%;
  
  >div{
    margin-bottom: 12px;
  }
`;


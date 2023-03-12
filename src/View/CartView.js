import React from "react";
import "../css/Home.css"
import { Input, } from 'antd';
import {CartTable} from "../components/book/CartTable";
const { Search } = Input;

const onSearch = (value) => console.log(value);

export const CartView = () => {
    return (
        <div className="allView">
            <h1>My Cart</h1>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
            <div style={{marginRight:"30px"}}>
                <CartTable/>
            </div>
        </div>
    );
}
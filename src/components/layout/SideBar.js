import { ReadOutlined, ShoppingCartOutlined,ShoppingOutlined,SolutionOutlined} from '@ant-design/icons';
import { Layout, Menu, } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";
import "../../css/index.css"
const { Sider: SideBar } = Layout;

const books = () => {
    // console.log("creat books")
    return{
        key: `subBooks`,
        icon: React.createElement(ReadOutlined),
        label: <Link to="/books">Books</Link>,
    }
}
const cart = () => {
    return{
        key: `subCart`,
        icon: React.createElement(ShoppingCartOutlined),
        label: <Link to="/cart">Cart</Link>,
    }
}
const order = () => {
    return{
        key: `subOrder`,
        icon: React.createElement(ShoppingOutlined),
        label: <Link to="/order">My Order</Link>,
    }
}
const profile = () => {
    return{
        key: `subProfile`,
        icon: React.createElement(SolutionOutlined),
        label: <Link to="/profile">My Profile</Link>,
    }
}

const items = [books(),  cart(),  order(), profile(),]

export const HomeSider = () => {
    return(
        <SideBar className="sider" style={{ background: '#fff'}}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={items}
            />
        </SideBar>
    );
}
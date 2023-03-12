import { Layout, theme } from 'antd';
import React from 'react';
import { Outlet} from "react-router-dom";
import "../css/Home.css"
import {HomeHeader} from "../components/layout/Header";
import {HomeSider} from "../components/layout/SideBar";

const { Content} = Layout;

const HomeView = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <HomeHeader/>
            <Layout className="basicContent">
                <HomeSider/>
                <Layout className="content-layout">
                    <Content className="content"
                        style={{
                            background: colorBgContainer,
                            width: "100%",
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default HomeView;

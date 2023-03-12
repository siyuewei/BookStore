import { Layout,Row, Col} from 'antd';
import logo from "../../assets/logo.png"
import logoFont from "../../assets/logo-name.svg"
import React from 'react';
import "../../css/index.css"
const { Header } = Layout;
export const HomeHeader = () => {
    return(
        <Header className="header">
            {/*<div className="logo">*/}
            {/*    <img src={require("../../assets/logo.png")} className="header-img"/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h3>BookStore</h3>*/}
            {/*</div>*/}
            {/*/!*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />*!/*/}
            <div id="header">
                <div id="header-content">
                    <Row>
                        <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={4}>
                            <a id="logo" href={"/"}>
                                <img alt="logo"  className="logo" src={logo} style={{ height:45 }}/>
                                <img alt="Book Store"  className="logo-font" src={logoFont} style={{ height:40 }}/>
                            </a>
                        </Col>
                        {/*<Col xs={0} sm={0} md={19} lg={19} xl={19} xxl={20}>*/}
                        {/*    /!*{user != null ? <UserAvatar user={user}/> : null}*!/*/}
                        {/*    HELLO*/}
                        {/*</Col>*/}
                    </Row>
                </div>
            </div>
        </Header>
    );
}
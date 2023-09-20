import { Col, Layout, Row } from "antd";
import logo from "../../assets/logo.png";
import logoFont from "../../assets/logo-name.svg";
import React from "react";
import "../../css/index.css";
import { UserAvatar } from "./Avatar";

const { Header } = Layout;
export const HomeHeader = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")!);

  return (
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
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col>
              <a id="logo" href={"/"}>
                <img
                  alt="logo"
                  className="logo"
                  src={logo}
                  style={{ height: 45 }}
                />
                <img
                  alt="BookCard Store"
                  className="logo-font"
                  src={logoFont}
                  style={{ height: 40 }}
                />
              </a>
            </Col>
            <Col offset={15}>{user != null ? <UserAvatar /> : null}</Col>
          </Row>
        </div>
      </div>
    </Header>
  );
};

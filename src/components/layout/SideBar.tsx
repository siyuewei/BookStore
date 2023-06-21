import {
  AreaChartOutlined,
  ReadOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../../css/index.css";
import { IRole } from "../../interface";

const { Sider: SideBar } = Layout;

const books = () => {
  // console.log("creat books")
  return {
    key: `subBooks`,
    icon: <ReadOutlined />,
    label: <Link to="/home/books">Books</Link>,
  };
};
const cart = () => {
  return {
    key: `subCart`,
    icon: <ShoppingCartOutlined />,
    label: <Link to="/home/cart">Cart</Link>,
  };
};
const order = () => {
  return {
    key: `subOrder`,
    icon: <ShoppingOutlined />,
    label: <Link to="/home/order">My Order</Link>,
  };
};
const profile = () => {
  return {
    key: `subProfile`,
    icon: <SolutionOutlined />,
    label: <Link to="/home/profile">My Profile</Link>,
  };
};

const users = () => {
  return {
    key: `subUsers`,
    icon: <SolutionOutlined />,
    label: <Link to="/home/users">Users</Link>,
  };
};

const statisticsCustomer = () => {
  return {
    key: `subStatisticsCustomer`,
    icon: <AreaChartOutlined />,
    label: <Link to="/home/statistics_customer">statistics</Link>,
  };
};

const statisticsAdmin = () => {
  return {
    key: `subStatisticsAdmin`,
    icon: <AreaChartOutlined />,
    label: <Link to="/home/statistics_admin">statistics</Link>,
  };
};

const itemsCustomer = [
  books(),
  cart(),
  order(),
  statisticsCustomer(),
  profile(),
];
const itemsAdmin = [books(), order(), users(), statisticsAdmin()];

interface IHomeSiderProps {
  role: IRole;
}

export function HomeSider({ role }: IHomeSiderProps) {
  // if (role.toString() === IRole.CUSTOMER.toString()) {
  //   console.log("customer");
  // }
  // if (role.toString() === IRole.ADMIN.toString()) {
  //   console.log("admin");
  // }
  //
  // console.log(role.toString());
  // console.log(IRole.CUSTOMER.toString());
  // if (role === IRole.CUSTOMER) {
  //   console.log("customer");
  // }
  // if (role === IRole.ADMIN) {
  //   console.log("admin");
  // }
  // console.log(typeof IRole.CUSTOMER);
  // console.log(typeof role);

  return (
    <>
      {role === IRole.CUSTOMER && (
        <SideBar className="sider" style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={itemsCustomer}
          />
        </SideBar>
      )}
      {role === IRole.ADMIN && (
        <SideBar className="sider" style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["2"]}
            defaultOpenKeys={["sub2"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={itemsAdmin}
          />
        </SideBar>
      )}
    </>
  );
}

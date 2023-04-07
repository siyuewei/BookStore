import React from "react";
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
  ProForm,
} from "@ant-design/pro-components";
import { message, Space, Tabs } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import logoPic from "../assets/logo.png";

const iconStyles = {
  marginInlineStart: "16px",
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};

export const LoginView = () => {
  // const [loginType, setLoginType] = useState('phone');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (values.username === "thunderboy" && values.password === "reins1409") {
      // console.log('success');
      navigate("/home");
    } else {
      // console.log("fail");
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: "white" }}>
        <LoginForm
          logo={logoPic}
          title="BookStore"
          subTitle="与书籍同行"
          onFinish={handleSubmit}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"用户名: admin or user"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码: ant.design"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
          <div style={{ marginBlockEnd: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a style={{ float: "right" }}>忘记密码</a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

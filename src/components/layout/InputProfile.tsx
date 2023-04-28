import { Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";
import "../../css/Home.css";

interface InputProfileProps {
  placeholder: string;
  defaultValue?: string;
  icon: { icon: any; className: string };
  style?: React.CSSProperties;
}

export const InputProfile = (props: InputProfileProps) => {
  const { placeholder, icon, style } = props;
  const { icon: Icon, className: iconClassName } = icon;
  return (
    <Input
      style={{ ...style }} // 将传入的 style 解构到 Input 组件中
      placeholder={placeholder}
      prefix={Icon && <Icon className={iconClassName} />} // 只有当 Icon 存在时才渲染
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined
            style={{
              color: "rgba(0,0,0,.45)",
            }}
          />
        </Tooltip>
      }
      defaultValue={props.defaultValue}
    />
  );
};

import {Input, Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import React from "react";
import "../../css/Home.css"

export const InputProfile = (props) => {
    const {placeholder,icon} = props;
    return(
        <Input
            style = {{width:300,}}
            placeholder={placeholder}
            prefix={<icon className="site-form-item-icon" />}
            suffix={
                <Tooltip title="Extra information">
                    <InfoCircleOutlined
                        style={{
                            color: 'rgba(0,0,0,.45)',
                        }}
                    />
                </Tooltip>
            }
        />
    );
}
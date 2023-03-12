import {AntDesignOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import React from "react";

export const UserAvatar = () =>{
    return(
        <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
            src={require("../../assets/avatar.png")}
            style={{width:"100px",height:"100px"}}
        />
    );
}
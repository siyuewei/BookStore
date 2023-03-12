import React from "react";
import "../css/Home.css"
import {Button, Input, Space, Tooltip} from "antd";
import {
    InfoCircleOutlined,
    TwitterOutlined,
    UserOutlined,
    DownloadOutlined,
} from "@ant-design/icons";
import {UserAvatar} from "../components/layout/Avatar";
import {InputProfile} from "../components/layout/InputProfile";
const { TextArea } = Input;
export const ProfileView = () => {
    return(
        <div style={{width:"100%"}}>
            <div>
                <h1>My Profile</h1>
                <h4>Name</h4>
                <InputProfile placeholder="Your First Name" icon={<UserOutlined/>}/>
                <InputProfile placeholder="Your Last Name" icon={<UserOutlined/>}/>

                <h4>Twitter</h4>
                {/*<Input*/}
                {/*    style = {{width:300,}}*/}
                {/*    placeholder="Enter your username"*/}
                {/*    prefix={<TwitterOutlined className="site-form-item-icon" />}*/}
                {/*    suffix={*/}
                {/*        <Tooltip title="Extra information">*/}
                {/*            <InfoCircleOutlined*/}
                {/*                style={{*/}
                {/*                    color: 'rgba(0,0,0,.45)',*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        </Tooltip>*/}
                {/*    }*/}
                {/*/>*/}
            </div>

            <Space style={{ display: "flex", width: "100%", alignItems: "flex-start"}}>
                <Space direction="vertical" style={{  width:"20%", marginRight: "30px" }}>
                    <h4>Avatar</h4>
                    <UserAvatar/>
                    <div style={{ marginTop: "20px" }}>
                        <Button icon={<DownloadOutlined />} >
                            Upload
                        </Button>
                    </div>
                </Space>
                <Space direction="vertical" style={{ display: "flex",  width:"350px" }}>
                    <h4>Notes</h4>
                    <TextArea rows={4} style={{width:"100%"}}/>
                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                        <div style={{ marginRight: "20px" }}>
                            <Button danger size={"large"}>
                                save
                            </Button>
                        </div>
                        <div>
                            <Button type="primary" danger size={"large"} >
                                cancel
                            </Button>
                        </div>
                    </div>
                </Space>
            </Space>
        </div>
    );
}
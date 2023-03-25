import React from "react";
import "../css/Home.css"
import {Button, Input, Space} from "antd";
import {
    TwitterOutlined,
    UserOutlined,
    UploadOutlined ,
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
                <div className="name">
                    {[
                        { placeholder: 'Your First Name', icon: { icon: UserOutlined, className: 'site-form-item-icon' } },
                        { placeholder: 'Your Last Name', icon: { icon: UserOutlined, className: 'site-form-item-icon' } },
                    ].map((inputProps, index) => (
                        <div style={{flex:1}}>
                            <InputProfile key={index} {...inputProps} style={{ width: '100%' }} />
                        </div>
                    ))}
                </div>

                <h4>Twitter</h4>
                <InputProfile
                    placeholder="Your Last Name"
                    icon={{ icon: TwitterOutlined, className: "site-form-item-icon" }}
                />
            </div>

            <div className="avatar-note">
                <Space direction="vertical" style={{  width:"20%", marginRight: "30px" }}>
                    <h4>Avatar</h4>
                    <UserAvatar/>
                    <div style={{ marginTop: "20px" }}>
                        <Button icon={<UploadOutlined  />} >
                            Upload
                        </Button>
                    </div>
                </Space>
                <Space direction="vertical" style={{ display: "flex",  width:"100%" }}>
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
            </div>
        </div>
    );
}
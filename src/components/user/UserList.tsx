import { IBook, IUser } from "../../interface";
import { List, Modal, Radio, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { updateStatus, updateUser } from "../../Service/UserService";

interface IUserListProps {
  users: IUser[];
}

export function UserList({ users }: IUserListProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToChange, setUserToChange] = useState<IUser>({} as IUser);
  const [statusThis, setStatusThis] = useState<number>(0); // 0: block, 1: unblock
  const handleClick = (user: IUser, statusThis: number) => {
    setIsModalVisible(true); // 显示弹出框
    setUserToChange(user);
    setStatusThis(statusThis);
  };
  const handleModalOk = () => {
    // 执行退出逻辑
    setIsModalVisible(false); // 隐藏弹出框
    handleStatusChange(userToChange, statusThis);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // 隐藏弹出框
    setRadioValueUser(
      radioValueUser.map((item) => {
        if (item.userId === userToChange.id) {
          item.radioValue = statusThis === 1 ? 0 : 1;
        }
        return item;
      })
    );
  };
  const handleStatusChange = (user: IUser, statusThis: number) => {
    console.log(user.username, statusThis === 1 ? true : false);

    updateStatus(user.username, statusThis === 1 ? true : false);
  };

  interface radioValueUser {
    radioValue: number;
    userId: number;
  }

  const [radioValueUser, setRadioValueUser] = useState<radioValueUser[]>([]);

  const columns: ColumnsType<IUser> = [
    { title: "username", dataIndex: "username", key: "username" },
    { title: "email", dataIndex: "email", key: "username" + "email" },
    {
      title: "status",
      key: "username" + "status",
      render: (user: IUser) => {
        radioValueUser.push({
          radioValue: user.status ? 1 : 0,
          userId: user.id,
        });
        return (
          <>
            <Radio.Group
              // defaultValue={user.status ? 1 : 0}
              onChange={(e) => {
                handleClick(user, e.target.value);
                setRadioValueUser(
                  radioValueUser.map((item) => {
                    if (item.userId === user.id) {
                      item.radioValue = e.target.value;
                    }
                    return item;
                  })
                );
              }}
              value={
                radioValueUser.find((item) => item.userId === user.id)
                  ?.radioValue
              }
            >
              <Radio value={1}>unblock</Radio>
              <Radio value={0}>block</Radio>
            </Radio.Group>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.notes}</p>
          ),
          rowExpandable: (record) => record.notes !== "",
        }}
        dataSource={users}
        rowKey="id"
        pagination={{
          pageSize: 8,
          hideOnSinglePage: true,
        }}
        style={{
          marginRight: "30px",
        }}
      />

      <Modal // 弹出框组件
        title="Are you sure do this?"
        visible={isModalVisible} // 显示控制
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Click "OK" to go on or "Cancel" to cancel.</p>
      </Modal>
    </>
  );
}

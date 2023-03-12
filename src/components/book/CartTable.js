import React from "react";
import "../../css/Home.css"
import { Space , Table, Tag,Button,InputNumber } from 'antd';
import {cartData as data} from "../../data";

const { Column, ColumnGroup } = Table;
const onChange = (value) => {
    console.log('changed', value);
};
export const CartTable = () => {
    return(
        <Table
            dataSource={data}
            pagination={{pageSize: 5}}
            // className="custom-table"
        >
            <ColumnGroup title="Book">
                <Column
                    title="Cover"
                    dataIndex="name"
                    key="name"
                    render={(_, record) => (
                        <img
                            src={require("../../assets/books/book1.jpg")}
                            style={{width:25 ,height:30}}
                        />
                    )}
                />
                <Column title="Title" dataIndex="name" key="name" />
            </ColumnGroup>
            <Column
                title="Amount"
                dataIndex="amount"
                key="amount"
                render={(_, record) => (
                    <Space size="middle">
                        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                    </Space>
                )}
            />
            <Column
                title="Price"
                dataIndex="price"
                key="price"
                render={(price) => (
                    <>
                        <Tag color="blue" key={price}>
                            ¥{price}
                        </Tag>
                    </>
                )}
            />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Space>
                )}
            />
        </Table>
    );
}
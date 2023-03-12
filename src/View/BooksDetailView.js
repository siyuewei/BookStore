import React from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Button } from 'antd';
import {ShoppingCartOutlined,MoneyCollectOutlined} from '@ant-design/icons';
import {data as booksData} from "../data";
import "../css/bookDetail.css"
export const BooksDetailView = (props) => {
    const book = useParams();
    const info = booksData.find((item) => item.id === book.id)
    console.log(book);

    return (
        <div className={"content"}>
            <div>
                <Button type="primary" danger>back</Button>
            </div>
            <div className={"book-detail"}>
                <h1>{info.name}</h1>
                <div>
                    <div className={"book-image"}><img alt="image" src={require(`../assets/books/${info.image}`)} className="detail-img"/></div>
                    <Descriptions bordered className="all-des">
                        <Descriptions.Item label={"Title"} span={3}>{info.name}</Descriptions.Item>
                        <Descriptions.Item label={"Author"} span={3}>{info.author}</Descriptions.Item>
                        <Descriptions.Item label={"Class"} span={3}>{info.type}</Descriptions.Item>
                        <Descriptions.Item label={"Price"} span={3}>{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                        <Descriptions.Item label={"State"} span={3}>{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
            <div className={"descriptions"}>
                <Descriptions bordered className="int-des">
                    <Descriptions.Item label={"Introduce"} span={3}>{info.description}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className={"button-groups"}>
                <Button type="danger" icon={<ShoppingCartOutlined/>} size={"large"}>
                    加入购物车
                </Button>
                <Button type="danger" icon={<MoneyCollectOutlined />} size={"large"} style={{marginLeft:"15%"}}ghost>
                    立即购买
                </Button>
            </div>
        </div>
    )
};

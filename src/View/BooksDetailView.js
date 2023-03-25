import React from "react";
import {Link, useParams} from "react-router-dom";
import { Descriptions, Button } from 'antd';
import {ShoppingCartOutlined,MoneyCollectOutlined} from '@ant-design/icons';
import {data as booksData} from "../data";
import "../css/bookDetail.css"
export const BooksDetailView = (props) => {
    const book = useParams();
    const info = booksData.find((item) => item.id === book.id)
    // console.log(book);

    return (
        <div className={"content"}>
            <div>
                <Link to={"/books"}>
                    <Button type="primary" danger>back</Button>
                </Link>
            </div>
            <br></br>
            <h1>{info.title}</h1>
            <div className={"book-detail"}>
                <div className={"book-image"}><img alt="image" src={require(`../assets/books/${info.image}`)}/></div>
                <div className="des-group">
                    <Descriptions  className="all-des">
                        <Descriptions.Item label={"Title"} span={3}  bordered >{info.title}</Descriptions.Item>
                        <Descriptions.Item label={"Author"} span={3}  bordered >{info.author}</Descriptions.Item>
                        <Descriptions.Item label={"Class"} span={3}  bordered >{info.type}</Descriptions.Item>
                        <Descriptions.Item label={"Price"} span={3}  bordered >{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                        <Descriptions.Item label={"State"} span={3}  bordered >{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
            <div className={"book-intro"}>
                <Descriptions  className="int-des">
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

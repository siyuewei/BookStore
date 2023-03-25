import React from "react";
import {Book} from "./Book";
import {List} from "antd";
import {data} from "../../data";
import "../../css/Book.css"
export const BookList = () => {
    return(
        <List
            pagination={{pageSize: 8}}
            grid={{
                gutter: 8,
                column: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Book
                        className = "book"
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        id={item.id}
                    >
                    </Book>
                </List.Item>
            )}
        />
        // <img src={[require("../../books/book1.jpg")]}/>
    );
}
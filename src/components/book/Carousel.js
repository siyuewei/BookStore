import React from "react";
import {Carousel} from "antd";
import "../../css/Book.css"
export const BookCarousel = () => {
    return (
        <Carousel autoplay className="carousel">
            <img className="carousel-image" src={require("../../assets/carousel/book1.jpg")}/>
            <img className="carousel-image" src={require("../../assets/carousel/book2.jpg")}/>
            <img className="carousel-image" src={require("../../assets/carousel/book3.jpg")}/>
            <img className="carousel-image" src={require("../../assets/carousel/book4.jpg")}/>
        </Carousel>
    );
}

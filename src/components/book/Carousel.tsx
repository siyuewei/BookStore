import React from "react";
import { Carousel, Image } from "antd";
import "../../css/Book.css";

export const BookCarousel = () => {
  return (
    <Carousel autoplay className="carousel">
      <Image
        className="carousel-image"
        src={require("../../assets/carousel/book1.jpg")}
      />
      <Image
        className="carousel-image"
        src={require("../../assets/carousel/book2.jpg")}
      />
      <Image
        className="carousel-image"
        src={require("../../assets/carousel/book3.jpg")}
      />
      <Image
        className="carousel-image"
        src={require("../../assets/carousel/book4.jpg")}
      />
    </Carousel>
  );
};

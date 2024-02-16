import React, { useContext, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCarouselData } from ".././movies";
import { useNavigate } from "react-router-dom";
export const MainCarousel = () => {
  const items = MainCarouselData.map((item) => (
    <img
      style={{marginLeft: "500px",marginRight:"500px"}}
      className="cursor-pointer"
      src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
      alt="Corousel"
    />
  ));

  return (
    <div
      style={{
        zIndex: "0"
      }}
    >
      {/* <AliceCarousel
        autoHeight
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
      /> */}
      <AliceCarousel
        autoHeight
        items={items}
        autoWidth
        disableDotsControls
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
      />
    </div>
  );
};

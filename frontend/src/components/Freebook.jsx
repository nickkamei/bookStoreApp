import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import list from "../data/list.json";
import Cards from "./cards";

const Freebook = () => {
  console.log("List data before filtering:", list);

  const filterData = list.filter((data) => data.category === "free");
  console.log("Filtered data:", filterData);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
    <div className="max-w-screen-2x1 container mx-auto md:px-20 px-4">
        <div>
        <h1 className="font-semibold text-xl pb-2">Free Book Offered</h1>
        <p>Grab the exclusive Free Books and experience the world you have always dreamed of </p>
        </div>
    <div>
    <Slider {...settings}>
      {filterData.map((item)=>(
        <Cards item={item} key={item.id}/>
      ))}
      </Slider>
    </div>
    </div>
    </>
  );
};

export default Freebook;

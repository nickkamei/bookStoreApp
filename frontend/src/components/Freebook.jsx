import React, {useState, useEffect} from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Cards from "./cards";

import axios from "axios"

const Freebook = () => {
  const [book,setBook]=useState([])
  useEffect(() => {
    const getBook = async() => {
        try {
            const res = await axios.get("http://localhost:4001/book");
            const data = res.data.filter((item) => item.category === "free");
            console.log("Filtered data:", data); // Log the filtered data
            setBook(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }
    getBook();
}, []);

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
      {book.map((item)=>(
        <Cards item={item} key={item.id}/>
      ))}
      </Slider>
    </div>
    </div>
    </>
  );
};

export default Freebook;

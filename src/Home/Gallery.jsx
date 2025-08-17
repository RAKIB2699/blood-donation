import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import img1 from "../../src/assets/g-1.jpg";
import img2 from "../../src/assets/g-2.jpg";
import img3 from "../../src/assets/g-3.avif";
import img4 from "../../src/assets/g-4.jpg";
import img6 from "../../src/assets/g-6.jpg";

const images = [img1, img2, img3, img4, img6];

const Gallery = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-red-600 text-center mb-8">
          Gallery
        </h2>
        <Slider {...settings} className="gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="px-2">
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="rounded-xl shadow-lg w-full object-cover h-64"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;

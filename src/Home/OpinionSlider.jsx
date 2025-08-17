import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../src/assets/premium_photo-1723187717117-93c7772572de.jpeg";

const opinions = [
  {
    type: "Donor Opinion",
    text: "I proudly donate blood on a regular basis because it gives others something they desperately need to survive. Just knowing I can make a difference in someone else’s life makes me feel great!",
    name: "Brandon Munson",
    role: "CTO, Fulcrum Design, USA",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    type: "Donor Opinion",
    text: "Donating blood is a simple act that can save lives. I feel proud knowing that my small contribution helps people in critical need.",
    name: "Sophia Johnson",
    role: "Software Engineer, UK",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    type: "Recipient Opinion",
    text: "I wouldn’t be alive today without the generosity of blood donors. Their kindness gave me a second chance at life, and I am forever grateful.",
    name: "Michael Lee",
    role: "Blood Recipient, USA",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

export default function OpinionSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  return (
    <div className="w-full bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-[1600px] w-11/12 mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left side - slider */}
        <div className="w-full md:w-1/2 min-h-[300px] flex items-center">
          <Slider {...settings} className="w-full">
            {opinions.map((opinion, idx) => (
              <div key={idx} className="px-2 md:px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4 uppercase">
                  {opinion.type}
                </h2>
                <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed">
                  {opinion.text}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={opinion.img}
                    alt={opinion.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl">{opinion.name}</h4>
                    <p className="text-sm md:text-base text-gray-500">{opinion.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Right side - image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={img1}
            alt="blood donation"
            className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

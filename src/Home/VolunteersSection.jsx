import React from "react";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import pro1 from "../../src/assets/pro-1.avif";
import pro2 from "../../src/assets/pro-2.avif";
import pro3 from "../../src/assets/pro-3.avif";

const volunteers = [
  {
    name: "Alexander Gary",
    role: "Volunteer",
    image: pro1,
  },
  {
    name: "Melissa Munoz",
    role: "Volunteer",
    image: pro2,
  },
  {
    name: "John Abraham",
    role: "Volunteer",
    image: pro3,
  },
];

const VolunteerCard = ({ volunteer }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden text-center">
      <img src={volunteer.image} alt={volunteer.name} className="w-full h-72 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{volunteer.name}</h3>
        <p className="text-gray-400">{volunteer.role}</p>
        <div className="flex justify-center space-x-3 mt-3 text-red-600">

          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="cursor-pointer hover:text-red-700" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="cursor-pointer hover:text-red-700" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="cursor-pointer hover:text-red-700" />
          </a>


        </div>
      </div>
    </div>
  );
};

const VolunteersSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="text-center w-11/12 mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-2">OUR VOLUNTEERS</h2>
        <div className="flex items-center justify-center mb-2">
          <div className="w-16 h-1 bg-red-600 mr-2"></div>
          <div className="text-red-600 text-xl">+</div>
          <div className="w-16 h-1 bg-red-600 ml-2"></div>
        </div>
        <p className="text-gray-500 max-w-xl mx-auto">
          The volunteers who give their time and talents help to fulfill our mission.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {volunteers.map((volunteer, index) => (
          <VolunteerCard key={index} volunteer={volunteer} />
        ))}
      </div>
    </section>
  );
};

export default VolunteersSection;

import React, { useState } from "react";
import aboutImg from "../../src/assets/volunteer.jpeg"; 

const AboutUs = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white max-w-[1600px] py-20">
      <div className=" w-11/12 mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 w-full">
          <img
            src={aboutImg}
            alt="About Us"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-red-600 mb-4">About Us</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We are committed to connecting donors and recipients through a
            reliable, transparent, and easy-to-use platform. Our mission is to
            ensure that everyone in need of support can get it promptly and
            safely.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            With years of experience and a dedicated team, we focus on creating
            awareness, providing assistance, and making the process of donating
            and receiving aid seamless. Together, we can build a stronger and
            more compassionate community.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors w-max"
          >
            Learn More
          </button>
        </div>
      </div>

     
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-11/12 p-8 relative">
            <h3 className="text-3xl font-bold text-red-600 mb-4">About Us</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We are committed to connecting donors and recipients through a
              reliable, transparent, and easy-to-use platform. Our mission is
              to ensure that everyone in need of support can get it promptly
              and safely. 
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              With years of experience and a dedicated team, we focus on
              creating awareness, providing assistance, and making the process
              of donating and receiving aid seamless. Together, we can build a
              stronger and more compassionate community. Our platform provides
              tools for tracking donations, connecting with volunteers, and
              ensuring that every contribution makes a real impact.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We also run educational campaigns to raise awareness about the
              importance of blood and organ donation, food sharing, and other
              charitable activities. Join us in making a difference in people's
              lives.
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;

import React from 'react';
import { useNavigate } from 'react-router';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-red-100 max-w-[1600px] w-11/12 mx-auto py-20 px-4 mt-4 text-center">
      <div className="">
        <h1 className="text-4xl font-bold text-red-700 mb-6">
          Donate Blood, Save Lives
        </h1>
        <p className="text-gray-700 mb-8">
          Become a hero in someone's life. Register now or find a donor near you.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => navigate('/register')}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Join as a Donor
          </button>
          <button
            onClick={() => navigate('/search')}
            className="bg-white border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-100 transition"
          >
            Search Donors
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React from "react";
import { FaSmile, FaUserFriends, FaHeart } from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: <FaSmile size={40} />,
    count: 2578,
    title: "Success Smile",
  },
  {
    id: 2,
    icon: <FaUserFriends size={40} />,
    count: 3235,
    title: "Happy Donors",
  },
  {
    id: 3,
    icon: <FaHeart size={40} />,
    count: 3568,
    title: "Happy Recipient",
  },
];

const StatsCards = () => {
  return (
    <div className="bg-gray-100 py-16 mb-4">
       
            <p className="text-3xl font-bold mb-4 text-red-500 text-center">Users</p>
      
      <div className="max-w-[1600px] w-11/12 mx-auto flex flex-wrap justify-center gap-8">
     
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center w-72 sm:w-64 md:w-80 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-gray-700 mb-4 hover:text-red-500 transition-colors duration-300">
              {stat.icon}
            </div>
            <div className="text-3xl sm:text-2xl font-bold text-red-600">{stat.count}</div>
            <div className="text-gray-600 mt-2 text-lg sm:text-base">{stat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;

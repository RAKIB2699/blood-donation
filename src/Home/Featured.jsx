import React from 'react';
import { FaHeartbeat, FaHandsHelping, FaTint } from 'react-icons/fa';

const Featured = () => {
  return (
    <section className="py-14 bg-white px-4">
      <div className="max-w-[1600px] w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-10">
          Why Donate Blood?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-red-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaHeartbeat className="text-4xl text-red-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Save Lives</h3>
            <p className="text-gray-600">
              Your blood can save up to 3 lives. Be a real-life superhero.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-red-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaHandsHelping className="text-4xl text-red-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Build Community</h3>
            <p className="text-gray-600">
              Join a growing community of donors helping each other in emergencies.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-red-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaTint className="text-4xl text-red-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Stay Healthy</h3>
            <p className="text-gray-600">
              Donating blood helps regulate iron levels and keeps you healthy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;

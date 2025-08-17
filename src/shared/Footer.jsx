import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-10">
      <div className="max-w-[1600px] w-11/12 mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* Site Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">BloodConnect</h2>
          <p className="text-sm text-gray-200">
            Saving lives through blood donation. Join us, make a difference.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/register" className="hover:underline">Join as Donor</Link></li>
            <li><Link to="/search" className="hover:underline">Search Donors</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact</h3>
          <p>Email: <a href="mailto:info@bloodconnect.com" className="hover:underline">info@bloodconnect.com</a></p>
          <p>Phone: <a href="tel:+8801234567890" className="hover:underline">+880 1234 567890</a></p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-300 border-t border-red-500 pt-4">
        &copy; {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

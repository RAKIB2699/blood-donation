import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center px-6"
      >
        {/* Animated Graphic */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center"
        >
          <AlertTriangle className="w-32 h-32 text-red-600" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-7xl font-extrabold text-gray-800 mt-6">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mt-3">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </section>
  );
};

export default ErrorPage;

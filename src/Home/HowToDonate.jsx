import React from "react";
import { FaUserPlus, FaHandHoldingHeart, FaDonate } from "react-icons/fa";
import { useNavigate } from "react-router";

const steps = [
    {
        id: 1,
        icon: <FaUserPlus size={40} />,
        title: "Registration",
        description:
            "Sign up as a donor on our platform by providing your basic information and blood group.",
    },
    {
        id: 2,
        icon: <FaHandHoldingHeart size={40} />,
        title: "Request Accepted",
        description:
            "Once a recipient requests blood, your availability will be matched and accepted.",
    },
    {
        id: 3,
        icon: <FaDonate size={40} />,
        title: "Donate",
        description:
            "Proceed to donate blood at the designated location and help save lives.",
    },
];

const HowToDonate = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-gray-100 py-20">
            <div className="max-w-[1600px] w-11/12 mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-red-600 mb-4">
                    How You Can Donate
                </h2>
                <p className="text-gray-700 text-lg">
                    Follow these simple steps to become a donor and save lives.
                </p>
            </div>

            <div className="max-w-[1600px] w-11/12 mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="text-red-600 mb-4">{step.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-700 mb-6">{step.description}</p>

                    </div>
                ))}

            </div>
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => navigate("/donor-registration")}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Register Now
                </button>
            </div>
        </section>
    );
};

export default HowToDonate;

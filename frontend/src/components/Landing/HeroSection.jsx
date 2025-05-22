import React from "react";
import CountUp from "react-countup";
import { FaCheckCircle, FaUsers, FaBuilding } from "react-icons/fa";

const stats = [
  { id: 1, icon: <FaCheckCircle className="text-blue-400 w-10 h-10 mx-auto" />, end: 500, label: "Complaints Resolved" },
  { id: 2, icon: <FaUsers className="text-green-400 w-10 h-10 mx-auto" />, end: 1000, label: "Users" },
  { id: 3, icon: <FaBuilding className="text-yellow-400 w-10 h-10 mx-auto" />, end: 150, label: "Government Bodies" },
];

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left content */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Welcome to the Smart Complaint System
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Empowering citizens and streamlining complaint management with ease and efficiency.
          </p>

          {/* Animated Counters with icons */}
          <div className="flex justify-center md:justify-start gap-12 mb-10">
            {stats.map(({ id, icon, end, label }) => (
              <div
                key={id}
                className="flex flex-col items-center bg-white bg-opacity-20 rounded-xl px-6 py-5 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-default"
              >
                {icon}
                <CountUp
                  end={end}
                  duration={3}
                  className="text-5xl font-bold mt-3 drop-shadow-md"
                />
                <p className="text-sm mt-2 font-semibold tracking-wide">{label}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
              Get Started
            </button>
            <button className="bg-transparent border border-white px-8 py-4 rounded-lg text-white hover:bg-white hover:text-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1">
              Learn More
            </button>
          </div>
        </div>

        {/* Right image or illustration */}
        <div className="w-full md:w-1/2">
          <img
            src="/assets/hero-illustration.svg"
            alt="Hero Illustration"
            className="w-full h-auto drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;



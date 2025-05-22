import React from "react";

const steps = [
  {
    title: "Create an Account",
    desc: "Sign up with your email and basic information to get started.",
  },
  {
    title: "Submit Your Complaint",
    desc: "Fill out the complaint form with all relevant details.",
  },
  {
    title: "Track Resolution",
    desc: "Follow the progress as administrators work on your case.",
  },
];

const HowItWorksSection = () => (
  <section className="py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-white">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">How It Works</h2>
      <p className="text-lg text-gray-600 mb-14 max-w-2xl mx-auto">
        Our simple 3-step process helps you raise and track complaints efficiently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center text-white text-xl font-bold rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              {idx + 1}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;


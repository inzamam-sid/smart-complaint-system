import { FaBug, FaTachometerAlt, FaLock } from "react-icons/fa";

const features = [
  {
    icon: <FaBug className="text-4xl text-blue-700" />,
    title: "Easy Complaint Submission",
    description:
      "Submit your issues effortlessly with our intuitive and user-friendly platform.",
  },
  {
    icon: <FaTachometerAlt className="text-4xl text-green-600" />,
    title: "Real-Time Tracking",
    description:
      "Stay informed with live updates on the status of your complaints anytime.",
  },
  {
    icon: <FaLock className="text-4xl text-purple-600" />,
    title: "Secure & Private",
    description:
      "Your data and complaints are protected with top-tier security and privacy protocols.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          🚀 Key Features
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-16 h-16 flex items-center justify-center mx-auto bg-blue-100 rounded-full mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;


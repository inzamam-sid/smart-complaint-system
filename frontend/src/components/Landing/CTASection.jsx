import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-10">
          Join a growing community of students and administrators improving campus life together.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/login">
            <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-blue-100 transition duration-300">
              🚪 Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition duration-300">
              ✍️ Sign Up
            </button>
          </Link>
        </div>

        {/* Decorative glow */}
        <div className="mt-16 h-2 w-2/3 mx-auto bg-white/20 blur-lg rounded-full"></div>
      </div>
    </section>
  );
};

export default CTASection;

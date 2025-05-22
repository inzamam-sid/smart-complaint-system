 const TestimonialSection = () => (
  <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14">
        🌟 What Students Say
      </h2>

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 relative overflow-hidden">
        {/* Decorative Quote */}
        <div className="absolute text-[8rem] text-blue-100 top-[-40px] left-[-10px] pointer-events-none select-none leading-none">
          “
        </div>

        <p className="text-lg text-gray-700 italic z-10 relative">
          "The complaint system made it so easy to report issues in my dormitory. 
          Within a week, the maintenance team fixed everything. I'm impressed with 
          how efficiently the whole process worked!"
        </p>

        <div className="flex items-center mt-8 z-10 relative">
          <div className="w-14 h-14 bg-blue-600 text-white text-lg font-bold rounded-full flex items-center justify-center mr-4 shadow-md">
            JD
          </div>
          <div>
            <p className="font-semibold text-gray-800">Jane Doe</p>
            <p className="text-gray-500 text-sm">Computer Science Student</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialSection;

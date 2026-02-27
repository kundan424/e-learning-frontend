import React from 'react';

// Replace this with your actual image path
import StudentImage from "../../assets/testimonials/student-bg.png";

const Testimonials = () => {
  return (
    <section className=" text-white py-20 px-6 md:px-16 lg:px-40 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

        {/* Left Column: Text Content */}
        <div className="w-full lg:w-5/12 space-y-8">
          {/* Subheading */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-[1px] bg-gray-600"></div>
            <span className="uppercase tracking-[0.2em] text-sm text-gray-400 font-medium">
              Testimonial
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl lg:text-4xl font-semibold  text-[#3E3C7A] tracking-wide">
            What They Say?
          </h2>

          {/* Paragraphs */}
          <div className="space-y-3 text-gray-400 leading-relaxed max-w-md">
            <p>
              TOTC has got more than 100k positive ratings from our users around the world.
            </p>
            <p>
              Some of the students and teachers were greatly helped by the Skilline.
            </p>
            <p>
              Are you too? Please give your assessment
            </p>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button className="group flex items-center justify-between border border-[#4BBDA4] rounded-full pl-6 pr-2 py-2 w-72 hover:bg-[#4BBDA4]/10 transition-all duration-300 cursor-pointer">
              <span className="text-[#49BBBD] font-medium">Write your assessment</span>
              <div className="border border-[#4BBDA4] rounded-full p-3 flex items-center justify-center group-hover:bg-[#4BBDA4] group-hover:text-black transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4BBDA4] group-hover:text-black">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Visuals & Card */}
        <div className="w-full lg:w-7/12 relative mt-12 lg:mt-0 flex justify-end">

          {/* Main Image Container */}
          <div className="relative w-full max-w-[400px] mr-0 lg:mr-12">
            <img
              src={StudentImage}
              alt="Smiling student holding books"
              className="w-full h-auto object-cover rounded-[40px]"
            />

            {/* Next Button / Carousel Control */}
            <button className="absolute right-[-28px] top-1/2 -translate-y-1/2 bg-white rounded-full p-5 shadow-xl hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4BBDA4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>

            {/* Overlapping Testimonial Card */}
            <div className="absolute -bottom-16 lg:-right-40 bg-white text-gray-600 rounded-2xl shadow-2xl w-[100%] md:w-[500px] flex overflow-hidden">
              {/* Left Accent Border */}
              <div className="w-3 bg-[#F27A62] flex-shrink-0"></div>

              {/* Card Content */}
              <div className="p-8 md:p-6 w-full">
                {/* Quote Text with left border line */}
                <div className="border-l border-gray-300 pl-6 mb-2">
                  <p className="text-gray-500 leading-loose text-sm">
                    "Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. TOTC is exactly what our business has been lacking."
                  </p>
                </div>

                {/* Card Footer (Name and Rating) */}
                <div className="flex justify-between items-end pl-6">
                  <h4 className="font-semibold text-gray-700 text-sm">Basanti Devi</h4>

                  <div className="flex flex-col items-end gap-2">
                    {/* Stars */}
                    <div className="flex gap-1 text-[#F6B846]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                    </div>
                    {/* Reviews subtext */}
                    <span className="text-xs text-gray-400 font-medium">12 reviews at Yelp</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
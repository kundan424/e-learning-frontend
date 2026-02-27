import React from "react";

import ClassroomImg from "../../assets/physical/classroom.png";
import PlayIcon from "../../assets/physical/play-icon.svg";

function PhysicalClassroom() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          {/* Decorative Circle */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#33EFA0] rounded-full z-0"></div>

          <h2 className="relative z-10 text-3xl lg:text-4xl font-semibold text-AllInOneCloud-Blue leading-snug ">
            Everything you can do in a physical
            classroom, <span className="text-[#49BBBD]">you can do with TOTC</span>
          </h2>

          <p className="mt-6 text-gray-500 leading-relaxed">
            TOTC’s school management software helps traditional and online
            schools manage scheduling, attendance, payments and virtual
            classrooms all in one secure cloud-based system.
          </p>

          <a
            href="#"
            className="mt-6 inline-block text-totc-navy underline font-medium hover:text-[#49BBBD] transition"
          >
            Learn more
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">

          {/* Decorative Top Shape */}
          <div className="absolute -top-6 -left-6 w-28 h-28 bg-[#49BBBD] rounded-2xl "></div>

          {/* Decorative Bottom Shape */}
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#33EFA0] rounded-2xl "></div>

          <img
            src={ClassroomImg}
            alt="Physical Classroom"
            className="rounded-3xl shadow-lg relative z-10"
          />

          {/* PLAY BUTTON */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition">
              <img src={PlayIcon} alt="Play" className="w-6 h-6" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PhysicalClassroom;
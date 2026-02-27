import React from "react";

import InstructorImg from "../../assets/whatIs/instructor.png";
import StudentsImg from "../../assets/whatIs/students.png";

function WhatIsSection() {
    return (
        <section className="bg-white py-16 md:py-20 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-semibold text-AllInOneCloud-Blue">
                    What is <span className="text-AllInOneCloud-teal">CTOC?</span>
                </h2>

                <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-4 mb-12 leading-relaxed">
                    TOTC is a platform that allows educators to create online classes whereby
                    they can store the course materials online; manage assignments, quizzes
                    and exams; monitor due dates; grade results and provide students with
                    feedback all in one place.
                </p>

                {/* Cards */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">

                    {/* FOR INSTRUCTORS */}
                    <div className="relative w-full md:w-[400px] h-72 rounded-3xl overflow-hidden group shadow-lg">

                        <img
                            src={InstructorImg}
                            alt="Instructor"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                            <h3 className="text-xl font-semibold tracking-wide">
                                FOR INSTRUCTORS
                            </h3>

                            <button className="mt-4 px-6 py-2 rounded-full border border-white/70 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition">
                                Start a class today
                            </button>
                        </div>
                    </div>

                    {/* FOR STUDENTS */}
                    <div className="relative w-full md:w-[400px] h-72 rounded-3xl overflow-hidden group shadow-lg">

                        <img
                            src={StudentsImg}
                            alt="Students"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                            <h3 className="text-xl font-semibold tracking-wide">
                                FOR STUDENTS
                            </h3>

                            <button className="mt-4 px-6 py-2 rounded-full bg-[#49BBBD] text-white font-medium shadow-lg hover:scale-105 transition">
                                Enter access code
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default WhatIsSection;
import React from 'react';

// Required Imports provided
import UiMain from "../../assets/features/UiCard.png";
import ToolsGirl from "../../assets/features/tools-girl.png";
import Grid from "../../assets/features/grid.svg";
import Users from "../../assets/features/users.svg";
import toolUsers from "../../assets/features/toolUsers.svg";

import QuizCard from "../../assets/features/Quiz.png";
import Gradebook from "../../assets/features/GradeBook.png";
import Discussion from "../../assets/features/Discussion.png";

const OurFeatures = () => {
    return (
        <section className="text-white py-20 px-6 md:px-16 lg:px-32 font-sans overflow-hidden">

            {/* Header */}
            <div className="text-center mb-24">
                <h2 className="text-4xl font-bold mb-4 tracking-wide">
                    <span className="text-AllInOneCloud-Blue">Our</span> <span className="text-AllInOneCloud-teal">Features</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                    This very extraordinary feature, can make learning activities more efficient
                </p>
            </div>

            <div className="max-w-7xl mx-auto space-y-16 md:space-y-8">

                {/* Feature 1: User Interface */}
                {/* Added relative, z-20 to sit above feature 2, and fixed desktop height */}
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:h-[350px]  z-20">
                    <div className="w-full md:w-1/2 h-full relative">
                        {/* Made image absolute on desktop, scaled it up, and forced it to overflow downward */}
                        <img
                            src={UiMain}
                            alt="Classroom User Interface"
                            className="w-full h-auto object-contain md:absolute md:top-4 md:left-0 md:w-[115%] md:max-w-none origin-top z-30 drop-shadow-2xl"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-8 pl-0 md:pl-12">
                        <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                            A <span className="text-AllInOneCloud-teal">user interface</span> <span className="text-AllInOneCloud-Blue">designed<br />for the classroom</span>
                        </h3>
                        <ul className="space-y-6 relative z-10">
                            <li className="flex items-start gap-5">
                                <div className="bg-white p-3 rounded-full flex-shrink-0 mt-1">
                                    <img src={Grid} alt="Grid Icon" className="w-5 h-5" />
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Teachers don't get lost in the grid view and have a dedicated Podium space.
                                </p>
                            </li>
                            <li className="flex items-start gap-5">
                                <div className="bg-white p-3 rounded-full flex-shrink-0 mt-1">
                                    <img src={toolUsers} alt="Tools Users Icon" className="w-5 h-5" />
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    TA's and presenters can be moved to the front of the class.
                                </p>
                            </li>
                            <li className="flex items-start gap-5">
                                <div className="bg-white p-3 rounded-full flex-shrink-0 mt-1">
                                    <img src={Users} alt="Users Icon" className="w-5 h-5" />
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Teachers can easily see all students and class data at one time.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Feature 2: Tools For Teachers */}
                {/* Added fixed desktop height to match Feature 3, and z-10 so it sits under Feature 1's overflow */}
                <div className="relative flex flex-col md:flex-row-reverse items-center justify-between gap-12 md:h-[350px] z-10">
                    <div className="w-full md:w-1/2 h-full relative flex justify-center items-center">
                        <img src={ToolsGirl} alt="Tools for teachers and learners" className="w-[80%] h-auto object-contain" />
                    </div>
                    {/* Add padding/margin if needed to text so it isn't completely hidden by the overlap */}
                    <div className="w-full md:w-1/2 space-y-6 pr-0 md:pr-12 md:pt-24 relative z-0 top-0">
                        <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                            <span className="text-AllInOneCloud-teal">Tools</span> <span className="text-AllInOneCloud-teal">For Teachers<br />And Learners</span>
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-loose max-w-lg">
                            Class has a dynamic set of teaching tools built to be deployed and used during class. Teachers can handout assignments in real-time for students to complete and submit.
                        </p>
                    </div>
                </div>

                {/* Feature 3: Assessments */}
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:h-[450px] ">
                    <div className="w-full md:w-1/2 h-full relative flex items-center">
                        <img src={QuizCard} alt="Assessments and Quizzes" className="w-[85%] h-auto object-contain mx-auto md:mx-0" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6 pl-0 md:pl-12">
                        <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                            <span className="text-AllInOneCloud-Blue">Assessments,</span><br />
                            <span className="text-AllInOneCloud-teal">Quizzes</span>, <span className="text-gray-300">Tests</span>
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-loose max-w-lg">
                            Easily launch live assignments, quizzes, and tests. Student results are automatically entered in the online gradebook.
                        </p>
                    </div>
                </div>

                {/* Feature 4: Class Management */}
                <div className="relative flex flex-col md:flex-row-reverse items-center justify-between gap-12 md:h-[300px]">
                    <div className="w-full md:w-1/2 h-full relative flex items-center">
                        <img src={Gradebook} alt="Gradebook and Class Management" className="w-[90%] h-auto object-contain mx-auto" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6 pr-0 md:pr-12">
                        <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                            <span className="text-AllInOneCloud-teal">Class Management</span><br />
                            <span className="text-AllInOneCloud-Blue">Tools for Educators</span>
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-loose max-w-lg">
                            Class provides tools to help run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.
                        </p>
                    </div>
                </div>

                {/* Feature 5: One-on-One Discussions */}
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:h-[300px]">
                    <div className="w-full md:w-1/2 h-full relative flex items-center">
                        <img src={Discussion} alt="Private Discussion UI" className="w-[85%] h-auto object-contain mx-auto md:mx-0" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6 pl-0 md:pl-12">
                        <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                            <span className="text-AllInOneCloud-Blue">One-on-One</span><br />
                            <span className="text-AllInOneCloud-teal">Discussions</span>
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-loose max-w-lg">
                            Teachers and teacher assistants can talk with students privately without leaving the Zoom environment.
                        </p>
                    </div>
                </div>

            </div>

            {/* Footer Button */}
            <div className="flex justify-center mt- 6mb-8 relative z-10">
                <button className="border border-gray-600 text-black rounded-full px-8 py-3 text-sm hover:bg-white/10 hover:text-gray-300 transition-colors duration-300">
                    See more features
                </button>
            </div>

        </section>
    );
};

export default OurFeatures;
import React from "react";

import { useNavigate } from "react-router-dom";
import HeroGirl from "../../assets/hero/hero-girl.png";
import CalendarIcon from "../../assets/hero/icon-calendar.svg";
import MailIcon from "../../assets/hero/icon-mail.svg";
import ChartIcon from "../../assets/hero/icon-chart.svg";
import PlayIcon from "../../assets/hero/play-icon.svg";
import Ellipse from "../../assets/hero/Ellipse.png";


function Hero() {

    const navigate = useNavigate();

    return (

        <section className="relative overflow-hidden bg-Aqua pt-10 pb-40">

            {/* MAIN CONTAINER */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex">

                {/* LEFT CONTENT */}
                <div className="flex-1 text-white mt-24">
                    <h1 className="text-5xl lg:text-5xl font-bold leading-tight">
                        <span className="text-orange-400">Studying</span> Online is now
                        <br />
                        much easier
                    </h1>

                    <p className="mt-6 text-lg text-white/80 max-w-lg">
                        TOTC is an interesting platform that will teach you
                        in more an interactive way
                    </p>

                    {/* BUTTON ROW */}
                    <div className="mt-10 flex items-center gap-8">

                        {/* JOIN BUTTON */}
                        <button
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 rounded-full bg-white/20 backdrop-blur text-white font-semibold text-lg hover:bg-white/30 transition">
                            Join for free
                        </button>

                        {/* WATCH BUTTON */}
                        <div className="flex items-center gap-4 cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                                <img src={PlayIcon} alt="play" className="w-6 h-6 ml-1" />
                            </div>
                            <span className="text-lg font-medium text-white">
                                Watch how it works
                            </span>
                        </div>

                    </div>
                </div>

                {/* RIGHT IMAGE SECTION */}
                <div className="flex-1 relative">

                    <img
                        src={HeroGirl}
                        alt="student"
                        className="relative z-0 w-[480px] ml-auto"
                    />

                    {/* FLOATING CARD 1 */}
                    <div className="absolute top-40 left-5 bg-white/70 backdrop-blur rounded-2xl shadow-xl px-5 py-3 flex items-center gap-4">
                        <div className="bg-sky-blue p-3 rounded-lg">
                            <img src={CalendarIcon} alt="" className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-700">250k</p>
                            <p className="text-xs text-gray-500">Assisted Student</p>
                        </div>
                    </div>

                    {/* FLOATING CARD 2 */}
                    <div className="absolute bottom-20 left-0 bg-white/65 backdrop-blur rounded-2xl shadow-xl px-6 py-5 w-80">
                        <div className="flex items-center gap-4">
                            <img
                                src={Ellipse}
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-semibold text-gray-700 text-sm">
                                    User Experience Class
                                </p>
                                <p className="text-xs text-gray-500">
                                    Today at 12.00 PM
                                </p>
                            </div>
                        </div>

                        <button className="mt-5 w-full bg-pink-500 text-white py-3 rounded-full font-semibold">
                            Join Now
                        </button>
                    </div>

                    {/* FLOATING CARD 3 */}
                    <div className="absolute top-1/2 right-0 bg-white/70 backdrop-blur rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
                        <div className="bg-orange-400 p-3 rounded-lg">
                            <img src={MailIcon} alt="" className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-700">Congratulations</p>
                            <p className="text-xs text-gray-500">
                                Your admission completed
                            </p>
                        </div>
                    </div>

                    {/* SMALL CHART ICON */}
                    <div className="absolute top-28 right-16 bg-pink-500 p-3 rounded-xl shadow-lg">
                        <div className="bg-white p-1">
                            <img src={ChartIcon} alt="" className="w-5 h-5" />
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM CURVE */}

        </section>
    );
}

export default Hero;
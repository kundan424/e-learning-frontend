import React from "react";

import BillingIcon from "../../assets/AllInOneCloud/billing.svg";
import CalendarIcon from "../../assets/AllInOneCloud/calendar.svg";
import UsersIcon from "../../assets/AllInOneCloud/users.svg";

function AllInOneCloud() {
    return (
        <section className="bg-white py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* HEADING */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl lg:text-4xl font-semibold text-AllInOneCloud-Blue ">
                        All-In-One <span className="text-AllInOneCloud-teal">Cloud Software.</span>
                    </h2>

                    <p className="mt-6 text-lg text-gray-500 leading-relaxed">
                        TOTC is one powerful online software suite that combines all the tools
                        needed to run a successful school or office.
                    </p>
                </div>

                {/* CARDS */}
                <div className="mt-20 grid md:grid-cols-3 gap-12">

                    {/* CARD 1 */}
                    <div className="relative text-center bg-[#F7F8FC] rounded-3xl px-10 pt-16 pb-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">

                        {/* ICON */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#5B6BE1] shadow-lg">
                                <img src={BillingIcon} alt="" className="w-8 h-8" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-AllInOneCloud-Blue">
                            Online Billing,
                            <br /> Invoicing, & Contracts
                        </h3>

                        <p className="mt-5 text-gray-500 leading-relaxed">
                            Simple and secure control of your organization's financial and legal
                            transactions. Send customized invoices and contracts
                        </p>
                    </div>

                    {/* CARD 2 */}
                    <div className="relative text-center bg-[#F7F8FC] rounded-3xl px-10 pt-16 pb-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">

                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#13B6A7] shadow-lg">
                                <img src={CalendarIcon} alt="" className="w-8 h-8" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-AllInOneCloud-Blue">
                            Easy Scheduling &
                            <br /> Attendance Tracking
                        </h3>

                        <p className="mt-5 text-gray-500 leading-relaxed">
                            Schedule and reserve classrooms at one campus or multiple campuses.
                            Keep detailed records of student attendance
                        </p>
                    </div>

                    {/* CARD 3 */}
                    <div className="relative text-center bg-[#F7F8FC] rounded-3xl px-10 pt-16 pb-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">

                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#2FA7C8] shadow-lg">
                                <img src={UsersIcon} alt="" className="w-8 h-8" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-AllInOneCloud-Blue">
                            Customer Tracking
                        </h3>

                        <p className="mt-5 text-gray-500 leading-relaxed">
                            Automate and track emails to individuals or groups.
                            Skilline’s built-in system helps organize your organization
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AllInOneCloud;
import React from 'react';

const stats = [
    { number: '15K+', label: 'Students', highlight: true },
    { number: '75%', label: 'Total success', highlight: true },
    { number: '35', label: 'Main questions', highlight: false },
    { number: '26', label: 'Chief experts', highlight: false },
    { number: '16', label: 'Years of experience', highlight: false },
];

function OurSuccess() {
    return (
        <section className="py-16 md:py-24 px-6 lg:px-12 bg-white color">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-totc-navy mb-3">Our Success</h2>
                <p className="text-totc-gray text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-14">
                    Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
                </p>
                <div className="flex flex-wrap justify-center gap-14 md:gap-24">
                    {stats.map((s, i) => (
                        <div key={i} className="text-center">
                            <p className="text-5xl md:text-7xl  bg-gradient-to-r from-Aqua to-Air-Force-Blue bg-clip-text text-transparent">
                                {s.number}
                            </p>
                            <p className="text-totc-gray text-sm mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurSuccess;
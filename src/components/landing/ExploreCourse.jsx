import React from 'react';

const tagData = [
    { name: 'Ut Sed Eros', color: 'bg-orange-400' },
    { name: 'Curabitur Egestas', color: 'bg-pink-400' },
    { name: 'Quisque Consequat', color: 'bg-yellow-700' },
    { name: 'Cras Convallis', color: 'bg-yellow-500' },
    { name: 'Vestibulum faucibu', color: 'bg-green-400' },
    { name: 'Ut Sed Eros', color: 'bg-purple-500' },
    { name: 'Vestibulum faucibu', color: 'bg-cyan-500' },
];

const categories = [
    { icon: '🌐', name: 'Lorem Ipsum', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop', border: 'border-totc-teal' },
    { icon: '🌍', name: 'Quisque a Consequat', image: 'https://images.unsplash.com/photo-1532693322450-2f6e8348f635?w=300&h=200&fit=crop', border: 'border-totc-coral' },
    { icon: '🎓', name: 'Aenean Facilisis', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop', border: 'border-totc-teal' },
];

function ExploreCourse() {
    return (
        <section className="py-16 md:py-24 px-6 lg:px-12 bg-blue-50/50" id="courses-explore">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-totc-navy mb-2">Explore Course</h2>
                <p className="text-totc-gray text-sm mb-10">Ut sed eros finibus, placerat orci id, dapibus.</p>

                {categories.map((cat, ci) => (
                    <div key={ci} className="mb-10">
                        {/* Category header */}
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-totc-navy flex items-center gap-2">
                                <span>{cat.icon}</span> {cat.name}
                            </h3>
                            <span className="text-totc-teal text-sm font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                                SEE ALL →
                            </span>
                        </div>

                        {/* Tags + Card row */}
                        <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-hide">
                            {tagData.map((tag, ti) => (
                                <div
                                    key={ti}
                                    className={`${tag.color} min-w-[50px] h-36 rounded-3xl flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0 cursor-pointer hover:scale-105 transition-transform`}
                                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', padding: '12px 8px' }}
                                >
                                    <div className="border-2 border-white/30 rounded-[22px] w-full h-full flex items-center justify-center px-1 py-2">
                                        {tag.name}
                                    </div>
                                </div>
                            ))}

                            {/* Course detail card */}
                            <div className={`min-w-[260px] bg-white rounded-2xl p-4 shadow-md border-2 ${cat.border} flex-shrink-0`}>
                                <img src={cat.image} alt="Course" className="w-full h-36 object-cover rounded-xl mb-3" />
                                <h4 className="text-base font-bold text-totc-navy mb-2">Integer id Orc Sed Ante Tincidunt</h4>
                                <p className="text-totc-gray text-xs leading-relaxed mb-3">Cras convallis lacus orci, tristique tincidunt magna fringilla at faucibus vel.</p>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-yellow-500 text-sm">★★★★★</span>
                                    <span className="text-lg font-bold text-totc-navy">$ 450</span>
                                </div>
                                <button className="w-full py-2.5 border-2 border-totc-teal text-totc-teal rounded-full text-sm font-semibold hover:bg-totc-teal hover:text-white transition">
                                    EXPLORE
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ExploreCourse;
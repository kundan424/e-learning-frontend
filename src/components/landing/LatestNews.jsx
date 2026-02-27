import React from 'react';

const sidebarNews = [
    {
        tag: 'PRESS RELEASE',
        tagColor: 'bg-totc-coral',
        title: 'Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand',
        desc: 'Class Technologies Inc., the company that created Class,...',
        image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&h=150&fit=crop',
    },
    {
        tag: 'NEWS',
        tagColor: 'bg-totc-teal',
        title: "Zoom's earliest investors are betting millions on a better Zoom for schools",
        desc: 'Zoom was never created to be a consumer product. Nonetheless, the...',
        image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=200&h=150&fit=crop',
    },
    {
        tag: 'NEWS',
        tagColor: 'bg-totc-teal',
        title: 'Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms',
        desc: 'This year, investors have reaped big financial returns from betting on Zoom...',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=150&fit=crop',
    },
];

function LatestNews() {
    return (
        <section className="py-16 md:py-24 px-6 lg:px-12" id="blog">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-totc-navy mb-2">
                    Lastest News and <span className="text-totc-teal">Resources</span>
                </h2>
                <p className="text-totc-gray text-sm md:text-base max-w-lg mx-auto mb-12">
                    See the developments that have occurred to TOTC in the world
                </p>

                <div className="flex flex-col lg:flex-row gap-8 text-left">
                    {/* Main news */}
                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop"
                            alt="News"
                            className="w-full h-60 object-cover rounded-2xl mb-4"
                        />
                        <span className="inline-block px-4 py-1 bg-totc-teal text-white rounded-full text-xs font-semibold mb-3">NEWS</span>
                        <h3 className="text-lg font-bold text-totc-navy mb-2 leading-snug">
                            Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution
                        </h3>
                        <p className="text-totc-gray text-sm leading-relaxed mb-3">
                            Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
                        </p>
                        <a href="#" className="text-totc-navy text-sm font-semibold underline hover:text-totc-teal transition">Read more</a>
                    </div>

                    {/* Sidebar */}
                    <div className="flex-1 space-y-5">
                        {sidebarNews.map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="relative flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-36 h-24 object-cover rounded-xl" />
                                    <span className={`absolute bottom-2 left-2 px-2 py-0.5 ${item.tagColor} text-white rounded-full text-[10px] font-semibold`}>
                                        {item.tag}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-totc-navy leading-snug mb-1">{item.title}</h4>
                                    <p className="text-totc-gray text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LatestNews;
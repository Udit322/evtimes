"use client";
import Link from "next/link";


const startupNews = [
  {
    id: 1,
    title: "EV Startup Funding 🚀",
    desc: "EV startup funding is experiencing massive growth, driven by sustainability targets, high-growth VC interest, and government incentives like FAME-II. Key investments focus on battery tech, charging infrastructure, and e-mobility (last-mile delivery/ride-hailing), with India seeing hundreds of companies raise billions. Funding sources include VCs, corporate investors, and grants. ",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000",
    slug: "startup-funding",
  },
  {
    id: 2,
    title: "New EV Startup Launch",
    desc: "The Indian EV market is preparing for a significant wave of new launches between late 2025 and 2026, with over 25+ new electric cars, primarily SUVs, expected in the 2026–2028 period. Major manufacturers like Tata, Maruti Suzuki, Hyundai, and Mahindra are focusing on launching EVs in the Rs 10 lakh to Rs 60 lakh range. ",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000",
    slug: "startup-launch",
  },
];

export default function StartupsPage() {
  return (
    <div className="p-10 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Startups 🚀
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {startupNews.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow overflow-hidden">
            <img src={item.image} className="w-full h-40 object-cover" />

            <div className="p-4">
              <h2 className="text-green-600 font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>

              <Link href={`/startup/${item.slug}`}>
                <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

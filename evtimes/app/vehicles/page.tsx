"use client";

import Link from "next/link";

const vehiclesNews = [
  {
    id: 1,
    title: "Tata launches new EV 🚗",
    desc: "Tata Motors introduced a new affordable electric car with advanced features.",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1000",
    slug: "tata-ev-news",
  },
  {
    id: 2,
    title: "Tesla expands in India ⚡",
    desc: "Tesla is planning to expand its EV operations in India.",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000",
    slug: "tesla-india-expansion",
  },
  {
    id: 3,
    title: "EV sales increasing 📈",
    desc: "Electric vehicle adoption is increasing rapidly across the world.",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1000",
    slug: "ev-sales-growth",
  },
];

export default function VehiclesPage() {
  return (
    <div className="p-10 bg-green-50 min-h-screen">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Vehicles News 🚗
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-6">
        {vehiclesNews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow overflow-hidden hover:scale-105 transition"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-green-600 font-semibold">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {item.desc}
              </p>

              {/* Read More */}
              <Link href={`/vehicles/${item.slug}`}>
                <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
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
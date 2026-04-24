"use client";
import Link from "next/link";
const policyNews = [
  {
    id: 1,
    title: "FAME III Subsidy 🏛️",
    desc: "The FAME-III subsidy, expected to be launched as the PM E-Drive scheme with a ~₹10,900 crore outlay, replaces FAME-II to boost EV adoption. It focuses on electrifying public transport and 2W/3W vehicles, with lower incentives than before—typically ₹5,000/kWh for 2Ws (capped at ₹10,000)",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000",
    slug: "fame-iii-subsidy",
  },
  {
    id: 2,
    title: "EV Policy Update 📜",
    desc: "Recent updates to Electric Vehicle (EV) policies in India, particularly as of April 2026, focus on transitioning from direct purchase subsidies to a scrappage-led incentive model, fostering domestic manufacturing, and strengthening charging infrastructure. Key updates include the national PM e-DRIVE scheme (2024–2026) and the Delhi Draft EV Policy 2026-2030",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000",
    slug: "ev-policy-update",
  },
];

export default function PolicyPage() {
  return (
    <div className="p-10 bg-green-50 min-h-screen">
      
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Policy News 🏛️
      </h1>

      {/* ✅ CONDITION */}
      {policyNews.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {policyNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow overflow-hidden"
            >
              <img
                src={item.image}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h2 className="text-green-600 font-semibold">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {item.desc}
                </p>

                <Link href={`/policy/${item.slug}`}>
                  <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
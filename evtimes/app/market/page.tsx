"use client";
import Link from "next/link";

const marketNews = [
  {
    id: 1,
    title: "EV Market Growth 📈",
    desc: "EV market is growing rapidly worldwide, driven by government incentives, consumer demand, and expanding charging infrastructure. The global EV market is expected to continue its strong growth trajectory in the coming years.",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1000",
    slug: "ev-market-growth",
  },
  {
    id: 2,
    title: "Sales Increase 40%",
    desc: "EV stocks are rising, driving investor interest,he Indian EV market is experiencing strong growth in early 2026, with registrations rising 17% YoY in FY25 and 2-3 wheeler segments leading adoption. Government incentives and expanding charging infrastructure are key drivers, while challenges include high costs and limited model availability. The market is expected to continue growing as consumer awareness increases and more affordable options become available.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000",
    slug: "ev-sales-increase",
  },
];

export default function MarketPage() {
  return (
    <div className="p-10 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Market 📈
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {marketNews.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow overflow-hidden">
            <img src={item.image} className="w-full h-40 object-cover" />

            <div className="p-4">
              <h2 className="text-green-600 font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>

              <Link href={`/market/${item.slug}`}>
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
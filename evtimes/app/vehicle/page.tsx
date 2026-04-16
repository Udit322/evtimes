"use client";

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#1e293b]">

      {/* 🔥 HERO SECTION */}
      <section className="relative px-10 py-16 bg-gradient-to-r from-green-50 to-white border-b overflow-hidden">
        
        <div className="max-w-5xl">
          <h1 className="text-5xl font-bold leading-tight">
            Electric Vehicles ⚡
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl">
            Explore the latest EV launches, innovations, and future mobility trends
            shaping India’s transportation revolution.
          </p>

          <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            Explore Vehicles →
          </button>
        </div>

        {/* background effect */}
        <div className="absolute right-10 top-10 text-[120px] font-bold text-green-100 select-none">
          EV
        </div>
      </section>

      {/* 🔥 FEATURED SECTION */}
      <section className="px-10 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Story</h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* card */}
          <div className="bg-white p-7 rounded-2xl shadow hover:shadow-lg transition">
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              NEW LAUNCH
            </span>

            <h2 className="text-2xl font-bold mt-3">
              Tata Curvv EV launched in India ⚡
            </h2>

            <p className="text-gray-500 mt-3 leading-6">
              Tata Motors expands its EV lineup with futuristic SUV coupe design,
              offering better range, premium interiors, and advanced features.
            </p>

            <button className="mt-4 text-green-600 font-medium hover:underline">
              Read full story →
            </button>
          </div>

          {/* visual card */}
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center text-7xl font-bold text-green-700 shadow-inner">
            EV
          </div>

        </div>
      </section>

      {/* 🔥 NEWS GRID */}
      <section className="px-10 pb-12">
        <h2 className="text-2xl font-semibold mb-6">Latest Updates</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer group"
            >
              <h3 className="font-semibold text-lg group-hover:text-green-600">
                EV Market Growth in 2025 📈
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Demand for electric vehicles is rising rapidly across India.
              </p>

              <div className="mt-4 text-xs text-gray-400">
                5 min read • Today
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}
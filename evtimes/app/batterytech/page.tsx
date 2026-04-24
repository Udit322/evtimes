"use client";
import Link from "next/link";
const batteryNews = [
  {
    id: 1,
    title: "Solid State Battery 🔋",
    desc: "A solid-state battery (SSB) is an advanced energy storage device that replaces the flammable liquid electrolyte found in traditional lithium-ion batteries with a solid material, such as ceramics, glass, or polymers. This design allows for significantly higher energy density, faster charging, and enhanced safety by eliminating fire risks and leakage.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    slug: "solid-state-battery",
  },
  {
    id: 2,
    title: "Battery Efficiency Improved ⚡",
    desc: "Improved battery efficiency means that a higher percentage of the energy put into a battery during charging is available to be used during discharging, with less energy lost to heat and chemical degradation. Enhanced battery technologies, such as lithium-ion, now often achieve energy efficiencies of 90% or higher, whereas older technologies like lead-acid are closer to 80%-90%.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    slug: "battery-efficiency",
  },
];


export default function BatteryPage() {
  return (
    <div className="p-10 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Battery Tech 🔋
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {batteryNews.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow overflow-hidden">
            <img src={item.image} className="w-full h-40 object-cover" />

            <div className="p-4">
              <h2 className="text-green-600 font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>

              <Link href={`/batterytech/${item.slug}`}>
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
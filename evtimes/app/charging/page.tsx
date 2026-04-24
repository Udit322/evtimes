"use client";

import Image from "next/image";
import Link from "next/link";

const chargingNews = [
  {
    id: 1,
    title: "Fast Charging ⚡",
    desc: "New charging tech, Fast charging increases the wattage (power) delivered to a battery, significantly reducing charging times compared to standard USB charging. It typically uses high voltage or current to fill a battery to 50-70% in 15-30 minutes, tapering speed as the battery fills to prevent overheating, commonly using standards like USB-PD or Qualcomm Quick Charge. ",
    image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?q=80&w=1200&auto=format&fit=crop",
    slug: "fast-charging-network",
  },
  {
    id: 2,
    title: "Charging Stations 🚗",
    desc: "More stations installed. A charging station, also known as Electric Vehicle Supply Equipment (EVSE) or a charge point, is a device that supplies electrical power to recharge plug-in electric vehicles, including cars, trucks, and buses. It acts as a bridge between the electrical grid and the vehicle's battery, providing AC or DC power to refill the energy stored on board. ",
    image: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=1200&auto=format&fit=crop",
    slug: "charging-time-reduced",
  },
];

export default function ChargingPage() {
  return (
    <div className="min-h-screen bg-green-50 p-10">
      <h1 className="mb-6 text-3xl font-bold text-green-700">
        Charging News⚡
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {chargingNews.map((item, index) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl bg-white shadow"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={1200}
              height={800}
              className="h-40 w-full object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index === 0}
            />

            <div className="p-4">
              <h2 className="font-semibold text-green-600">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-500">{item.desc}</p>

              <Link href={`/charging/${item.slug}`}>
                <button className="mt-3 rounded bg-green-500 px-3 py-1 text-white">
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

import Image from "next/image";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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

export default async function DetailPage({ params }: Props) {
  // ✅ FIX (IMPORTANT)
  const { slug } = await params;

  const item = chargingNews.find(
    (news) => news.slug === slug
  );

  if (!item) {
    notFound();
  }

 return (
  <div className="article-container p-10 bg-green-50 min-h-screen flex flex-col md:flex-row gap-10">

    {/* LEFT SIDE IMAGE */}
    <div className="article-image md:w-1/2">
      <Image
        src={item.image}
        width={600}
        height={400}
        className="w-full h-80 object-cover rounded-lg"
        alt={item.title}
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>

    {/* RIGHT SIDE CONTENT */}
    <div className="article-content md:w-1/2 flex flex-col">

      <h1 className="article-title text-3xl font-bold text-green-700 mb-4">
        {item.title}
      </h1>

      <p className="text-gray-600 leading-relaxed">
        {item.desc}
      </p>

    </div>

  </div>
);
}

import '@/app/globals.css';
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// ✅ SAME DATA as batterytech/page.tsx
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

export default async function BatteryDetail({ params }: Props) {
  // ✅ Next.js 16 fix
  const { slug } = await params;

  console.log("slug:", slug);

  // ✅ Find correct item
  const item = batteryNews.find(
    (news) =>
      news.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );

  // ❌ If not found
  if (!item) {
    return (
      <div className="p-10 text-red-500 text-xl">
        No Data Found (slug mismatch)
      </div>
    );
  }

   return (
  <div className="article-container p-10 bg-green-50 min-h-screen flex flex-col md:flex-row gap-10">

    {/* LEFT SIDE IMAGE */}
    <div className="article-image md:w-1/2">
      <img
        src={item.image}
        className="w-full h-80 object-cover rounded-lg"
        alt={item.title}
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
import '@/app/globals.css';
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// ✅ SAME DATA as startup/page.tsx
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

export default async function StartupDetail({ params }: Props) {
  // ✅ Next.js 16 fix
  const { slug } = await params;

  console.log("Startup slug:", slug);

  // ✅ Find matching item
  const item = startupNews.find(
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
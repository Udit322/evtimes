type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const marketNews = [
  {
    id: 1,
    title: "EV Market Growth 📈",
    desc: "EV market is growing rapidly worldwide, driven by government incentives, consumer demand, and expanding charging infrastructure. The global EV market is expected to continue its strong growth trajectory in the coming years.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    slug: "ev-market-growth",
  },
  {
    id: 2,
    title: "Stock Market Update 💹",
    desc: "EV stocks are rising, driving investor interest,he Indian EV market is experiencing strong growth in early 2026, with registrations rising 17% YoY in FY25 and 2-3 wheeler segments leading adoption. Government incentives and expanding charging infrastructure are key drivers, while challenges include high costs and limited model availability. The market is expected to continue growing as consumer awareness increases and more affordable options become available.",
    image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1000",
    slug: "ev-sales-increase",
  },
];

export default async function DetailPage({ params }: Props) {
  // ✅ FIX (IMPORTANT)
  const { slug } = await params;

  console.log("Market slug:", slug);

  const item = marketNews.find(
    (news) =>
      news.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );

  if (!item) {
    return (
      <div className="p-10 text-red-500">
        No Data Found
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
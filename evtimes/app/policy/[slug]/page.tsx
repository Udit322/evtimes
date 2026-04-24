
import '@/app/globals.css';
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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

export default async function PolicyDetail({ params }: Props) {
  // ✅ FIX (IMPORTANT)
  const { slug } = await params;

  console.log("Policy slug:", slug);

  const item = policyNews.find(
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
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const vehiclesNews = [
    {
        id: 1,
        title: "tata motors 🚗",
        desc: "Tata Motors introduced a new affordable electric car with advanced features.Tata Motors, part of the $150+ billion Tata Group, is a leading global automobile manufacturer established in 1945. Headquartered in Mumbai, it is a top-three passenger vehicle player in India, a market leader in electric vehicles (EVs), and a dominant commercial vehicle manufacturer, offering cars, SUVs, buses, trucks, and defense vehicles. ",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1000",
        slug: "tata-ev-news",
    },
    {
        id: 2,
        title: "Tesla News ⚡",
        desc: "Tesla is that company that makes electric cars. This news is about Tesla. Tesla is expanding in India.Tesla, Inc. (formerly Tesla Motors) is an American electric vehicle (EV) and clean energy company founded in 2003 and led by CEO Elon Musk. Headquartered in Austin, Texas, Tesla designs, manufactures, and sells high-performance EVs, solar energy systems, and battery storage products (Powerwall/Megapack). Tesla is accelerating the world's transition to sustainable energy. ",
        image: "https://images.unsplash.com/photo-1593941707882-a56bbc8dfd3c?q=80&w=1000",
        slug: "tesla-india-expansion",
    },
    {
    id: 3,
    title: "EV sales increasing 📈",
    desc: "Electric vehicle adoption is increasing rapidly across the world. More and more people are buying electric cars, and it's great for the environment. The demand for electric vehicles is growing as people become more aware of climate change and want to reduce their carbon footprint. Governments around the world are also offering incentives to encourage people to switch to electric cars, which is helping to boost sales. As technology improves and prices come down, we can expect even more people to make the switch to electric vehicles in the coming years.",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1000",
    slug: "ev-sales-growth",
  },
];

export default async function VehicleDetail({ params }: Props) {
  const { slug } = await params;

  const item = vehiclesNews.find(
    (news) => news.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );

  if (!item) {
    notFound();
  }

  return (
    <div className="article-container min-h-screen flex flex-col gap-10 bg-green-50 p-10 md:flex-row">
      <div className="article-image md:w-1/2">
        <Image
          src={item.image}
          alt={item.title}
          width={1000}
          height={640}
          className="h-80 w-full rounded-lg object-cover"
        />
      </div>

      <div className="article-content flex flex-col md:w-1/2">
        <h1 className="article-title mb-4 text-3xl font-bold text-green-700">
          {item.title}
        </h1>

        <p className="leading-relaxed text-gray-600">{item.desc}</p>
      </div>
    </div>
  );
}

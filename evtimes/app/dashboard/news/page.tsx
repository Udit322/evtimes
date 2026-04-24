"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const news = [
    {
      id: 1,
      title: "EV Growth",
      desc: "Electric vehicles are growing rapidly worldwide.",
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1000",
    },
    {
      id: 2,
      title: "Battery Tech",
      desc: "New battery technology is improving efficiency.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    },
    {
      id: 3,
      title: "Green Energy",
      desc: "Renewable energy sources are increasing globally.",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1000",
    },
  ];

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {news.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow overflow-hidden"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover"
          />

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h2 className="text-green-300 font-semibold">
              {item.title}
            </h2>

            {/* Description (toggle) */}
            {openId === item.id && (
              <p className="text-sm text-gray-500 mt-2">
                {item.desc}
              </p>
            )}

            {/* Button */}
            <button
              onClick={() => toggle(item.id)}
              className="mt-3 bg-green-300 text-white px-3 py-1 rounded hover:bg-green-300"
            >
              {openId === item.id ? "Show Less" : "Read More"}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
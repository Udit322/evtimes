"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const pieData = [
  { name: "Users", value: 400 },
  { name: "Admins", value: 200 },
  { name: "Guests", value: 100 },
];

const barData = [
  { name: "Mon", users: 30 },
  { name: "Tue", users: 50 },
  { name: "Wed", users: 40 },
  { name: "Thu", users: 70 },
  { name: "Fri", users: 60 },
];

const COLORS = ["#22c55e", "#4ade80", "#16a34a"];

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center mt-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-10">
        Dashboard Overview
      </h1>

      {/* CHARTS */}
      <div className="flex flex-wrap justify-center gap-12">

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-center mb-4 font-semibold">
            Pie Chart
          </h2>

          <PieChart width={300} height={250}>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-center mb-4 font-semibold">
            Bar Chart
          </h2>

          <BarChart width={350} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#16a34a" />
          </BarChart>
        </div>

      </div>
    </div>
  );
}

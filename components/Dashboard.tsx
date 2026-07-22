"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/model-metrics");
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };

    fetchMetrics();
  }, []);

  // Mock data for the chart until we plug in the database
  const chartData = [
    { name: "Low", tickets: 450 },
    { name: "Medium", tickets: 320 },
    { name: "High", tickets: 210 },
    { name: "Critical", tickets: 95 },
  ];

  return (
    <section className="relative w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center py-20 px-4">
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Live Model Performance</h2>
          <p className="text-slate-400">Real-time metrics from the PyTorch inference engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Metric Cards */}
          {[
            { label: "Accuracy", value: metrics ? `${(metrics.accuracy * 100).toFixed(1)}%` : "Loading..." },
            { label: "F1 Score", value: metrics ? metrics.f1_score : "Loading..." },
            { label: "Total Processed", value: metrics ? metrics.total_processed : "Loading..." }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl"
            >
              <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">{stat.label}</h3>
              <p className="text-4xl font-extrabold text-blue-400">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recharts Container */}
        <motion.div 
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl w-full h-[400px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-6">Support Ticket Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="tickets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </section>
  );
}
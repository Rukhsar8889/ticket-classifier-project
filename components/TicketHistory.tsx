"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TicketHistory() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/tickets");
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error("Error fetching ticket history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    // Poll the backend every 5 seconds for live updates
    const interval = setInterval(fetchTickets, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-5xl mx-auto mt-8 mb-16"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-xl font-semibold">Live Database Ticket History</h3>
          <p className="text-slate-400 text-sm">Real-time log of all processed support tickets stored in SQLite.</p>
        </div>
        <button 
          onClick={fetchTickets}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg transition"
        >
          Refresh Log
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm text-center py-6">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-6">No tickets logged yet. Try submitting one above!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Ticket Message</th>
                <th className="py-3 px-4">Prediction</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 font-mono text-slate-500">#{ticket.id}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{ticket.text}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      ticket.prediction === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      ticket.prediction === 'High' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      ticket.prediction === 'Medium' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {ticket.prediction}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-400">
                    {(ticket.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {new Date(ticket.created_at).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
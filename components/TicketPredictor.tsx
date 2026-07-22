"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TicketPredictor() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`Prediction failed with status ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error predicting ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-5xl mx-auto mt-8"
    >
      <h3 className="text-white text-xl font-semibold mb-4">Test Live AI Prediction</h3>
      <p className="text-slate-400 text-sm mb-6">
        Type a custom support message to see how your fine-tuned DistilBERT model classifies its urgency in real time.
      </p>

      <form onSubmit={handlePredict} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Critical database connectivity timeout on the main cluster..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 h-32 resize-none placeholder:text-slate-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition duration-200 self-end disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Analyzing..." : "Classify Ticket"}
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Predicted Urgency Level</p>
            <p className="text-2xl font-extrabold text-blue-400">{result.prediction}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Model Confidence</p>
            <p className="text-xl font-bold text-emerald-400">
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
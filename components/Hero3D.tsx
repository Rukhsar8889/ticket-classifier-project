"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

export default function Hero3D() {
  return (
    <div className="relative h-screen w-full bg-slate-950 flex items-center 
    justify-center overflow-hidden">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars 
            radius={100} 
            depth={50} 
            count={4000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1.5} 
          />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 text-center px-4 max-w-4xl"
      >
        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-950/60 border border-blue-800/50 rounded-full inline-block mb-4">
          MLOps Powered Classification
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          AI Ticket <span className="text-blue-500">Triage Engine</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Intelligent, real-time ticket classification driven by fine-tuned open-source models with live performance metrics.
        </p>
        <div className="flex justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            Launch Live Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
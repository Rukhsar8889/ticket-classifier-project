import Dashboard from "@/components/Dashboard";
import Hero3D from "@/components/Hero3D";
import TicketHistory from "@/components/TicketHistory";
import TicketPredictor from "@/components/TicketPredictor";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-blue-500/30">
      <Hero3D />
      <Dashboard />
      <TicketPredictor />
      <TicketHistory />
    </main>
  );
}
"use client";

import { useState } from "react";

const domainRoots = [
  "Kunundrum", "Integrixa", "Dnalith", "IntegriTyx", "HouseOfDNAI",
  "DNAIHouse", "Veritasia", "IntegrityHouse", "GarageKU", "KuIntegrity",
  "EthicsDNAI-AI", "EmergentDNAI-AI", "EmpathyDNAI-AI", 
  "1stVirtualAISystem", "VirtualBreal", "TrueNorthDNAI", "DNAIntegrityHouse"
];

export default function SovereignBuilder() {
  const [selectedRoot, setSelectedRoot] = useState("Kunundrum");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function stabilizeDomain() {
    setLoading(true);
    const payload = {
      identity: "ryan-daniel-cole-sr",
      intent: "domain-stabilize",
      root: selectedRoot,
      layer: "HouseOfIntegrity",
      signature: "(ØdDF€||Å)"
    };

    try {
      const res = await fetch("/api/engine/stabilize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: "Stabilization failed - Garage 1.0 Integrity Check" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 font-mono border-4 border-emerald-900/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">KUNUNDRUM INTEGRITY</h1>
          <p className="text-emerald-400">House of Integrity • Kunundrum Garage • KU</p>
          <p className="text-zinc-600 text-xs">9-Facet Law [3-3-2 Signature] • Ω-1 Genesis</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-emerald-500/5">
          <label className="block text-zinc-400 mb-4">Select Domain Root to Stabilize</label>
          <select 
            value={selectedRoot} 
            onChange={(e) => setSelectedRoot(e.target.value)}
            className="w-full bg-black border border-zinc-700 p-5 rounded-xl text-xl mb-8 focus:border-emerald-500 outline-none"
          >
            {domainRoots.map(root => <option key={root} value={root}>{root}</option>)}
          </select>

          <button
            onClick={stabilizeDomain}
            disabled={loading}
            className="w-full py-6 bg-gradient-to-r from-emerald-600 to-white text-black font-bold rounded-xl hover:scale-[1.01] transition-all disabled:opacity-50 text-xl"
          >
            {loading ? "APPLYING DNAI_SEAL..." : "STABILIZE DOMAIN → MIRROR GLASS"}
          </button>
        </div>

        {result && (
          <div className="bg-zinc-900 border-l-4 border-emerald-500 p-6 rounded-r-xl">
            <h2 className="text-emerald-400 font-bold mb-4">✅ DNAI_SEAL APPLIED • KUNUNDRUM GARAGE</h2>
            <pre className="text-xs text-emerald-200 overflow-auto whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
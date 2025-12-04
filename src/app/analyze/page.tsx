"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError("Erreur lors de l'analyse.");
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Analyse de niche KDP</h1>

      <div className="mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Mot-clé (ex : cahier de gratitude enfant)"
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading || !keyword}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Analyse en cours..." : "Analyser"}
      </button>

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Résultat :</h2>
          <p><strong>Score concurrence :</strong> {result.competition_score}</p>
          <p><strong>Score opportunité :</strong> {result.opportunity_score}</p>
          <p><strong>Verdict :</strong> {result.verdict}</p>
        </div>
      )}
    </div>
  );
}

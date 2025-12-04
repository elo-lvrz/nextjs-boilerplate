// src/app/api/analyze/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { keyword } = await request.json();

    if (!keyword || keyword.trim().length < 2) {
      return NextResponse.json(
        { error: "Mot-clé invalide." },
        { status: 400 }
      );
    }

    // --- MVP : Génère des scores simulés (comme si on avait scrappé Amazon) ---
    const competition_score = Math.floor(Math.random() * 60) + 20; // 20–80
    const opportunity_score = Math.floor(Math.random() * 60) + 20;

    let verdict = "Analyse disponible.";

    if (competition_score > 70 && opportunity_score < 40)
      verdict = "❌ Niche saturée. Peu recommandée.";
    else if (competition_score < 40 && opportunity_score > 60)
      verdict = "🟢 Excellente opportunité.";
    else
      verdict = "🟡 Niche exploitable avec un bon angle.";

    return NextResponse.json({
      keyword,
      competition_score,
      opportunity_score,
      verdict,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json(
      { error: "Erreur interne lors de l'analyse." },
      { status: 500 }
    );
  }
}

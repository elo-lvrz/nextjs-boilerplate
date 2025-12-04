"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    // Appelle l'API logout (endpoint route.ts)
    await fetch("/logout", {
      method: "POST",
    });

    // Redirection client
    router.push("/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        Bonjour, vous êtes connecté
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Se déconnecter
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-medium">Votre tableau de bord sera affiché ici :</h2>
        <ul className="list-disc ml-6 mt-2">
          <li>Historique des analyses</li>
          <li>Bouton « Nouvelle analyse »</li>
          <li>Scores IA</li>
          <li>Conseils KDP personnalisés</li>
        </ul>
      </div>
    </div>
  );
}

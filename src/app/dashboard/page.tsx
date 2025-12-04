import { createSupabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createSupabaseServer();

  // Récupère la session côté serveur
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si pas connecté → redirection vers /login
  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Bonjour, {user.email}</h1>

      <div className="space-y-4">
        <a
          href="/api/logout"
          className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </a>

        <div className="p-4 bg-gray-100 rounded">
          <p className="text-gray-700">
            Votre tableau de bord sera affiché ici :
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Historique des analyses</li>
            <li>Bouton "Nouvelle analyse"</li>
            <li>Scores IA</li>
            <li>Conseils KDP personnalisés</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

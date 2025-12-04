import { cookies } from "next/headers";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();

  return createPagesServerClient(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  );
};

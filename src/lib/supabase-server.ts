import { cookies } from "next/headers";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export const createServerSupabaseClient = () =>
  createPagesServerClient();
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
      },
    }
  );

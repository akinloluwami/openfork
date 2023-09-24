declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_GITHUB_CLIENT_SECRET: string;
    NEXT_PUBLIC_GITHUB_TOKEN: string;
  }
}

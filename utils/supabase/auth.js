import { supabase } from "../supabaseClient";

const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
};

export { signInWithGithub };

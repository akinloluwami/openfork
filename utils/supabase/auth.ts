import { supabase } from "../supabaseClient";

const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
};

const signout = async () => {
  await supabase.auth.signOut();
};

export { signInWithGithub, signout };

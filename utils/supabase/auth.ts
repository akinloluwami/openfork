import { supabase } from "../supabaseClient";

const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  console.log(data, error);
};

const signout = async () => {
  localStorage.removeItem("sb-tebioleiibrvzamyqsia-auth-token");
};

export { signInWithGithub, signout };

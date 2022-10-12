import { supabase } from "./supabaseClient";

const userInfo = () => {
  const user = supabase.auth.getUser();
  user.then((data) => {
    return data.data.user?.user_metadata;
  });
};

export default userInfo;

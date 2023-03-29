import { UserMetadata } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";

interface CurrentUserType {
  user?: UserMetadata;
}

export const currentUser = async (): Promise<CurrentUserType> => {
  const { data: user } = await supabase.auth.getUser();

  return { user: user.user?.user_metadata };
};

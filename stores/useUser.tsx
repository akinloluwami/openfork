import { axios } from "@/lib/axios";
import { create } from "zustand";

interface IStore {
  id: string;
  name: string;
  username: string;
  image: string;
}

export const useUser = create<IStore>((set) => {
  const initialState: IStore = {
    id: "",
    name: "",
    username: "",
    image: "",
  };

  axios("/auth")
    .then((response) => {
      const data = response.data;
      set(data);
    })
    .catch((error) => {
      console.error("Error fetching data from /auth:", error);
    });

  return initialState;
});

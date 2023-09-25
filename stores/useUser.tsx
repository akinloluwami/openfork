import { create } from "zustand";
import axios from "axios";
import { useEffect } from "react";

interface IStore {
  id: string;
  name: string;
  username: string;
  image: string;
  setStore: (store: IStore) => void;
}

export const useUser = create<IStore>((set) => {
  const storedData =
    typeof window !== "undefined"
      ? localStorage.getItem("openfork_user")
      : null;
  const initialData = storedData ? JSON.parse(storedData) : {};

  const initialState: IStore = {
    id: initialData.id || "",
    name: initialData.name || "",
    username: initialData.username || "",
    image: initialData.image || "",
    setStore: (store: IStore) => {
      set(store);
      if (typeof window !== "undefined") {
        localStorage.setItem("openfork_user", JSON.stringify(store));
      }
    },
  };

  useEffect(() => {
    if (!initialData.name || !initialData.username || !initialData.image) {
      axios("/auth")
        .then((response) => {
          const data = response.data;

          initialState.setStore(data);

          if (typeof window !== "undefined") {
            localStorage.setItem("openfork_user", JSON.stringify(data));
          }
        })
        .catch((error) => {
          console.error("Error fetching data from /auth:", error);
        });
    }
  }, []);

  return initialState;
});

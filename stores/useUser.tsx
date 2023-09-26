import { cookies } from "next/headers";

const useUser = () => {
  const userCookie = cookies().get("openfork_user")?.value;

  const user = userCookie ? JSON.parse(userCookie) : null;

  return {
    id: user?.id,
    name: user?.name,
    image: user?.image,
    username: user?.username,
  };
};

export { useUser };

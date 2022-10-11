const userInfo = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("sb-tebioleiibrvzamyqsia-auth-token") &&
      JSON.parse(
        localStorage.getItem("sb-tebioleiibrvzamyqsia-auth-token") || ""
      ).user.user_metadata
    );
  }
};

export default userInfo;

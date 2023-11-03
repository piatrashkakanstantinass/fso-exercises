import { useEffect, useState } from "react";
import blogService from "../services/blogs";

const useUser = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token);
    }
  }, [user]);

  useEffect(() => {
    if (user === null) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return [user, setUser];
};

export default useUser;

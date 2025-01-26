import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
const useRole = () => {
  const { user } = useContext(AuthContext);

  const { data: userData={}, isLoading: userLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`http://localhost:5000/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return [userData, userLoading];
};
export default useRole;

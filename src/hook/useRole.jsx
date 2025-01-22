import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";
const useRole = () => {
  const { user } = useAuth();

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`http://localhost:5000/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return [userData, userLoading];
};
export default useRole;

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSession = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: session = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await axiosPublic.get("/session");
      return res.data;
    },
  });
  return [session, loading, refetch];
};

export default useSession;

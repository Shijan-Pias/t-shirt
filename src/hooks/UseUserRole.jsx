import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure =UseAxiosSecure();

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/role/${user.email}`
      );
      return res.data;
    }
  });

  const role = data?.role || "user";

  return {
    role,
    isRoleLoading: loading || isLoading,
    isError,
    refetchRole: refetch
  };
};

export default useUserRole;

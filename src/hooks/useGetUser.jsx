import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useGetUser = () => {
  const {
    user: { email },
  } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosPublic.get(`/users/${email}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };
    fetchUser();
  }, [axiosPublic, email]);

  return { user, loading, error };
};

export default useGetUser;

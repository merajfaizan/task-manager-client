import axios from "axios";

const axiosPublic = axios.create({
  // use this link in development mode: http://localhost:5000
  baseURL: "https://task-manager-server-one.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

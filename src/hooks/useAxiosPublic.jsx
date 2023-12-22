import axios from "axios";

const axiosPublic = axios.create({
  // use this link in production: https://task-manager-server-one.vercel.app
  baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

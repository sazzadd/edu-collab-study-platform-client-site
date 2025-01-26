import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate()
  // request interceptor to add authorization header every secure call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      console.log("request stopped by interceptor", token);
      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }  
  );
  axiosSecure.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // console.log("status rrror in the interceptor", status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/auth/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;

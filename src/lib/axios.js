import axios from "axios";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "/backend",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
      if (error.response && error.response.status === 401) {
        // Remove auth cookies
        Cookies.remove("auth");
        Cookies.remove("id");
        
        // Redirect to login page
        return redirect("/"); 
      }
      return Promise.reject(error); // Reject the error to handle it further if needed
    }
  );

export default axiosInstance;

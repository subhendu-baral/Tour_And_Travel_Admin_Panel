import axios from "axios";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { RedirectType } from "next/dist/client/components/redirect";

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
        // Cookies.remove("auth");
        // Cookies.remove("id");
        
        // Redirect to login page
        return redirect("/", RedirectType.push); // This works for the app directory
        // For pages directory, use: window.location.href = "/";
      }
      return Promise.reject(error); // Reject the error to handle it further if needed
    }
  );

export default axiosInstance;

import axiosInstance from "./axios";

const csrf = async () => {
    try{
        axiosInstance.get("/sanctum/csrf-cookie");
    }
    catch(error){
        console.log('X-CSRF Fetch Error',error);
    }
}

export default csrf;
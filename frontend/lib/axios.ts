import axios from "axios";
import ENV_SECRETS from "./ENV";

const AxiosInstance = axios.create({
    baseURL:ENV_SECRETS.BACKEND_BASE_URL,
    withCredentials:true,
});

export default AxiosInstance ;